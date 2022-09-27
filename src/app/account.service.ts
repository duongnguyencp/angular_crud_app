import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Account } from './models/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseURL="https://localhost:7029/api/Accounts";
  constructor(private http:HttpClient) { }
  getAllAccount():Observable<Account[]>{
    return this.http.get<Account[]>(`${this.baseURL}`);
  }
  // addAccount(data:any):Observable<Account>{
  //   return this.http.post<Account>(`${this.baseURL}`,data);
  // }
  editAccount(data:any):Observable<Account>{
    return this.http.put<Account>(`${this.baseURL}`,data);
  }
  removeAccount(id:Number):Observable<Account>{
    return this.http.delete<Account>(`${this.baseURL}/${id}`);
  }
  getAccountByName(name:string ):Observable<Account[]>{
    return this.http.get<Account[]>(`${this.baseURL}/${name}`,);
  }
  loginByAccount(data:any):Observable<Boolean>{
    return this.http.post<Boolean>(`${this.baseURL}/login`,data);
  }
  registerAccount(data:any):Observable<Boolean>{
    return this.http.post<Boolean>(`${this.baseURL}/register`,data);
  }
}
