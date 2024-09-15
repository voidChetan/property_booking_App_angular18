import { Component, ElementRef, inject, OnInit, signal , ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAPIResponseModel, IProperty, IPropertyType, Site } from '../../model/master';
import { map, Observable, pipe } from 'rxjs';
import { MasterService } from '../../service/master.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [FormsModule,AsyncPipe,CommonModule,ReactiveFormsModule],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent implements OnInit {

  isFormView = signal<boolean>(false);
  formObj: Site = new Site();
  masterSrv = inject(MasterService)
  gridData: Site[] = [];
  propertyList: IProperty[] = [];
  @ViewChild('propertyModel') modal: ElementRef | undefined;
  currentSiteId: number = 0;

  propertyType$: Observable<IPropertyType[]> = new Observable<IPropertyType[]>
  propertyForm: FormGroup = new FormGroup({});
  constructor() {
    this.propertyType$ = this.masterSrv.getAllPropertyType().pipe(
      map((item:IAPIResponseModel)=>{
        return item.data
      })
    );
    this.initializeForm();
  }
  ngOnInit(): void {
    this.getGridDatab()
  }

  initializeForm() {
    this.propertyForm =  new FormGroup({ 
        propertyId:new FormControl(0),
        propertyNo:new FormControl(''),
        facing:new FormControl(''),
        totalArea:new FormControl(''),
        rate:new FormControl(''),
        siteId:new FormControl(this.currentSiteId)
    })
  }
  getGridDatab() {
    this.masterSrv.getAllSites().subscribe((res: IAPIResponseModel)=>{
       this.gridData =  res.data;
    })
  }
  getProperties() {
    this.masterSrv.getAllPropertyMasters().subscribe((res: IAPIResponseModel)=>{
       this.propertyList =  res.data.filter((m:any)=>m.siteId ==  this.currentSiteId);
    })
  }
  openModal(data: Site) {
   
    this.currentSiteId = data.siteId;
    this.initializeForm();
    this.getProperties();
    if(this.modal) {
      this.modal.nativeElement.style.display ='block'
    } 
  }
 closeModal() {
    if(this.modal) {
      this.modal.nativeElement.style.display ='none'
    } 
  }

  toggleView() {
    this.isFormView.set(!this.isFormView())
  }
  onSaveProperty() {
    this.masterSrv.saveProperty(this.propertyForm.value).subscribe((res: IAPIResponseModel)=>{
      if(res.result) {
        alert("Record Saved");
        this.getProperties() 
      } else {
        alert(res.message)
      }
    })
  }
  onSave() {
    this.masterSrv.saveSite(this.formObj).subscribe((res: IAPIResponseModel)=>{
      if(res.result) {
        alert("Record Saved");
        this.getGridDatab()
        this.toggleView();
      } else {
        alert(res.message)
      }
    })
  }
  onEdit(data: Site) {
    this.formObj =  data;
    this.toggleView();
  }

  onUpdate() {
    this.masterSrv.updateSites(this.formObj).subscribe((res: IAPIResponseModel)=>{
      if(res.result) {
        alert("Record Updated");
        this.getGridDatab()
        this.toggleView();
      } else {
        alert(res.message)
      }
    })
  }

  onDelete(data: Site) {
    const isDelete=  confirm('Are you Sure Want To Delete');
    if(isDelete) {
      this.masterSrv.deleteSitesTypeById(data.siteId).subscribe((res: IAPIResponseModel)=>{
        if(res.result) {
          alert("Record Delete");
          this.getGridDatab() 
        } else {
          alert(res.message)
        }
      })
    }
  
  }

}
