import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment, topicReceive } from '../../environments/environment';
import { StarterComponent } from '../starter/starter.component';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  webSocketEndPoint: string = environment.endPointSocket;
  topic: string = "/topic/greetings";
  stompClient: any;
  appComponent: StarterComponent;
  constructor(appComponent: StarterComponent){
      this.appComponent = appComponent;
  }

  _connect() {
      console.log("Initialize WebSocket Connection");
      let ws = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(ws);
      const _this = this;
      _this.stompClient.connect({}, function (frame) {
          _this.stompClient.subscribe(topicReceive.endPointMaps, function (sdkEvent) {
              _this.onPublicMapsReceived(sdkEvent);
          });
          _this.stompClient.subscribe(topicReceive.endPointAllMaps, function(sdkEvent){
              _this.onPublicAllMapsReceived(sdkEvent);
          })
          //_this.stompClient.reconnect_delay = 2000;
      }, this.errorCallBack);
  };

  _disconnect() {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
      }
      console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
      console.log("errorCallBack -> " + error)
      setTimeout(() => {
          this._connect();
      }, 5000);
  }

  //emit
  onJoinMaps(item){
      this.stompClient.send('/app/maps.join', {}, JSON.stringify(item));
  }

  onGetAllMaps(){
      if(this.stompClient){
          this.stompClient.send('/app/maps.getall', {}, JSON.stringify("getall"));
      }else{
          this._connect();
          this.stompClient.send('/app/maps.getall', {}, JSON.stringify("getall"));
      }
  }

  //end emit

  //Subcribe
  onPublicMapsReceived(message) {
      this.appComponent.handleItemInMaps(JSON.parse(message.body));
  }

  onPublicAllMapsReceived(message){
      this.appComponent.handleMaps(JSON.parse(message.body));
  }
  //End Subcribe
}
