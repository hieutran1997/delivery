import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { UserDto } from '../../model';
import { ResponseUtil } from '../../model/ResponseUtil';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lstUser: Array<UserDto>;

  constructor(
    private _service: HomeService
  ) { }

  ngOnInit() {
    this._service.getAllUser<Array<UserDto>>().subscribe(res=>{
      if(res && res.length>0){
        this.lstUser = res;
      }
    })
  }

  delete(item){
    this._service.deleteUser<ResponseUtil<UserDto>>(item).subscribe(res=>{
      if(res.error){
        alert(res.message);
      }
      else{
        alert("Xóa thành công!");
      }
    })
  }
}
