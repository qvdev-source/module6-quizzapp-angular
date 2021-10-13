import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category";
import {Observable} from "rxjs";

const API_URL = `${environment.BASE_URL}/api/category`
@Injectable({
  providedIn: 'root'
})
export class CategoryService  extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  saveCategory(category: Category): Observable<any> {
    return this.http.post(API_URL, category, {headers: this.getHeaders});
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.put(API_URL, category, {headers: this.getHeaders});
  }

  deleteCategory(cid: number){
    return this.http.delete( `${API_URL}/${cid}`,{headers:this.getHeaders});
  }

  getCategory(category: Category): Observable<any> {
    return this.http.delete( `${API_URL}/${category.cid}`, {headers: this.getHeaders});
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL);
  }


}
