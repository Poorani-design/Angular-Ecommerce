import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public productList:any;
  constructor(private auth:AuthService) { }

  user={displayName:"Your name",localID:"xxxx"};
  ngOnInit(): void {
 // get product list from fakeapi store
 this.auth.getProductDetails().subscribe(res=>{
  this.productList=res;
})
// get product list from fakeapi store
    // user function start
    this.auth.canAccess();
    if(this.auth.isAuth()){
        //get user detail from firebase using rest api
        this.auth.getUserDetails().subscribe({
          next:data=>{
            this.user.localID=data.users[0].localId;
            this.user.displayName=data.users[0].displayName;
          }
        })
    }
    // user function end

   
  }


}
