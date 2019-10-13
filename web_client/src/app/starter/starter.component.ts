import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MapsService } from '../websocket/maps.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment, topicReceive } from '../../environments/environment';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {
  arrMarker = [];
  texto: string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;
  webSocketEndPoint: string = environment.endPointSocket;
  topic: string = "/topic/greetings";
  stompClient: any;

  constructor() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude ;
      });
    }
  }

  _connect() {
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe(topicReceive.endPointMaps, function (sdkEvent) {
        _this.handleItemInMaps(sdkEvent);
      });
      _this.stompClient.subscribe(topicReceive.endPointAllMaps, function (sdkEvent) {
        _this.handleMaps(sdkEvent);
      })
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  };

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  ngOnInit() {
    this._connect();
    setTimeout(() => {
      this.joinMaps();
      this.onGetAllMaps();
    }, 5000);
  }

  joinMaps() {
    var random = Math.random() * (1 - 0);
    var x = Math.floor((Math.random() * 4) + 1);
    let item = { userName: 'hieutv' + x, lng: this.lng  + random, lat: this.lat + random };
    this.onJoinMaps(item);
  }

  //emit
  onJoinMaps(item) {
    this.stompClient.send('/app/maps.join', {}, JSON.stringify(item));
  }

  onGetAllMaps() {
    if (this.stompClient) {
      this.stompClient.send('/app/maps.getall', {}, JSON.stringify("getall"));
    } else {
      this._connect();
      this.stompClient.send('/app/maps.getall', {}, JSON.stringify("getall"));
    }
  }

  //end emit

  handleItemInMaps(item) {
    let data = JSON.parse(item.body);
    var index = this.arrMarker.findIndex(x=> x.userName == data.userName);
    if(index<0){
      console.log('item exist:', data);
      this.arrMarker.push(data);
    }else{
      this.arrMarker.splice(index, 1);
      this.arrMarker.push(data);
    }
  }

  handleMaps(lstItem) {
    let data = JSON.parse(lstItem.body);
    let that = this;
    data.forEach(element => {
      that.arrMarker.push(element);
    });
  }
}
