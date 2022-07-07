import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private http:HttpClient) { }
  isAuth():boolean{
    if(sessionStorage.getItem('token')!==null){
      return true;
    }
    return false;
  }
  canAccess(){
    if(!this.isAuth()){
      this.router.navigate(['/login']);
    }
  }
  canAuthenticate()
  {
    if(this.isAuth()){
      this.router.navigate(['/dashboard']);
    }
  }
  register(name:string,email:string,password:string){
    //send register data to backend
   return  this.http.
    post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUjAhaDGNPQw9AhVhTvBB7tSKDBiafx-Q',{displayName:name,email,password});
  }
  storeToken(token:string){
    sessionStorage.setItem('token',token);
  }
  login(email:string,password:string)
  {
    return this.http.post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUjAhaDGNPQw9AhVhTvBB7tSKDBiafx-Q',{email,password});
  }
  getUserDetails(){
    //get user detail using token
    let token= sessionStorage.getItem('token');
    return this.http.post<{users:Array<{localId:string,displayName:string}>}>('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBUjAhaDGNPQw9AhVhTvBB7tSKDBiafx-Q',{idToken:token})
  }
  removeUserDetails(){
    sessionStorage.removeItem('token');
  }

  // product api service start
    getProductDetails()
    {
      return this.http.get<any>("https://fakestoreapi.com/products")
        .pipe(map((res:any)=>{
          return res;
        }))
    }
  // product service end
}
