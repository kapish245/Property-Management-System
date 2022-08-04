import { environment } from './../../environments/environment';
import { Property } from './../interfaces/property';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PropertyApiService {
  baseUrl:String=environment.backendBaseUrl+"/api"
  constructor(private http:HttpClient) { }

  createProperty(propertyFormData:Property){
    console.log(propertyFormData);
    return this.http.post<Property>(this.baseUrl+"/createProperty",propertyFormData);
  }

  getAllProperty(){
    return this.http.get<any>(this.baseUrl+"/getProperty");
  }
  deleteProperty(id:String){
    return this.http.delete<any>(`${this.baseUrl}/deleteProperty/${id}`)
  }
  updateProperty(propertyFormData:Property,id:String){
    return this.http.put<any>(`${this.baseUrl}/updateProperty/${id}`,propertyFormData)
  }
}
