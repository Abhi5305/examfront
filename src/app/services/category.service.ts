import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  public getCategoryById(id:number){
    return this.http.get(`${baseUrl}/categories/${id}`);
  }
  public getCategories(){
    return this.http.get(`${baseUrl}/categories`);
  }
  public addCategories(category:any){
    return this.http.post(`${baseUrl}/categories`,category);
  }
  public updateCategory(id:number,category:any){
    return this.http.put(`${baseUrl}/categories/${id}`,category);
  }
  public deleteCategory(id:number){
    return this.http.delete(`${baseUrl}/categories/${id}`);
  }
}
