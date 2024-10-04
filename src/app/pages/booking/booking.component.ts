import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAPIResponseModel, IProperty, Site } from '../../model/master';
import { MasterService } from '../../service/master.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [AsyncPipe, FormsModule,ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  sites$: Observable<Site[]> = new Observable<Site[]>;

  masterSrv = inject(MasterService);
  siteId: number = 0;
  propertyList: IProperty[] = [];
  bookingList: any[] = [];
  bookingForm: FormGroup = new FormGroup({});
  currentPropertyId: number = 0;

  constructor() {
    this.initiaLizeFporm();
    this.sites$ = this.masterSrv.getAllSites().pipe(
      map((res: IAPIResponseModel) => {
        return res.data;
      })
    );
  }
  initiaLizeFporm(){
    this.bookingForm =  new FormGroup({
      bookingId:new FormControl(0),
      propertyId:new FormControl(this.currentPropertyId),
      bookindDate:new FormControl(''),
      bookingRate:new FormControl(0),
      totalAmont:new FormControl(0),
      custId:new FormControl(0),
      name:new FormControl(''),
      mobile:new FormControl(''),
      emailid:new FormControl(''),
      address:new FormControl('')
    })
  }

  checkIfPropertyAvailable(propertyId: number) {
    const record=   this.bookingList.find(m=>m.propertyId == propertyId);
    if(record != undefined) {
      return record;
    } else {
      return null;
    }
  }

  openModal(data: IProperty) {
    this.currentPropertyId =  data.propertyId;
    this.initiaLizeFporm();
    const modal = document.getElementById('modal')
    if (modal) {
      modal.style.display = 'block'
    }
  }
  closeModal() {
    const modal = document.getElementById('modal')
    if (modal) {
      modal.style.display = 'none'
    }
  }
  getProperties(event: Event) {
    debugger; 
    this.getBookignBYSiteId()
    this.masterSrv.getAllPropertyBySiteId(this.siteId).subscribe((res: IAPIResponseModel) => {
      this.propertyList = res.data;
    })
  }
  getBookignBYSiteId() {
    debugger; 
    this.masterSrv. getAllPropertyBookingBySiteId(this.siteId).subscribe((res: IAPIResponseModel) => {
      this.bookingList = res.data;
    })
  }
  doBooking() {
    this.masterSrv.onSaveBooking(this.bookingForm.value).subscribe((res: IAPIResponseModel)=>{
      if(res.result) {
        alert("Record Saved");
        this.getBookignBYSiteId()
      } else {
        alert(res.message)
      }
    })
  }

}
