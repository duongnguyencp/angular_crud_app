import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Product } from './models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseURL="https://localhost:7029/api/Products";
  constructor(private http:HttpClient) { }
  getAllProduct():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseURL}`);
  }
  addProduct(data:any):Observable<Product>{
    return this.http.post<Product>(`${this.baseURL}`,data);
  }
  editProduct(data:any):Observable<Product>{
    return this.http.put<Product>(`${this.baseURL}`,data);
  }
  removeProduct(id:Number):Observable<Product>{
    return this.http.delete<Product>(`${this.baseURL}/${id}`);
  }
  
}
