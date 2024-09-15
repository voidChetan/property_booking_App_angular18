import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IAPIResponseModel, IPropertyType, Site } from '../model/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  getAllPropertyType():Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyType')
  }
 
  savePropertyType(obj: IPropertyType):Observable<IAPIResponseModel> {
    const newObh = [obj]
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddPropertyType',newObh)
  }
 
  updatePropertyType(obj: IPropertyType):Observable<IAPIResponseModel> { 
    return this.http.put<IAPIResponseModel>(environment.API_URL + 'UpdatePropertyType',obj)
  }

  deletePropertyTypeById(id: number):Observable<IAPIResponseModel> {
    return this.http.delete<IAPIResponseModel>(environment.API_URL + 'DeletePropertyTypeById?id='+id)
  }
 
  saveSite(obj: Site):Observable<IAPIResponseModel> { 
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddSites',obj)
  }
 
  getAllSites():Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllSites')
  }
   
  updateSites(obj: Site):Observable<IAPIResponseModel> { 
    return this.http.put<IAPIResponseModel>(environment.API_URL + 'UpdateSites',obj)
  }
  
  deleteSitesTypeById(id: number):Observable<IAPIResponseModel> {
    return this.http.delete<IAPIResponseModel>(environment.API_URL + 'DeleteSitesById?id='+id)
  }

  saveProperty(obj: Site):Observable<IAPIResponseModel> { 
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddPropertyMasters',obj)
  } 
  getAllPropertyMasters():Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyMasters')
  }
 
  getAllPropertyBySiteId(siteid: number):Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyBySiteId?siteid='+siteid)
  }
 
  onSaveBooking(obj: Site):Observable<IAPIResponseModel> { 
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddPropertyBooking',obj)
  } 


  getAllPropertyBookingBySiteId(siteid: number):Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyBookingBySiteId?siteid='+siteid)
  }
 
  

  
}
