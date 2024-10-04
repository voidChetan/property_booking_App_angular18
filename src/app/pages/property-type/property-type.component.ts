import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { IAPIResponseModel, IPropertyType } from '../../model/master';

@Component({
  selector: 'app-property-type',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.css'
})
export class PropertyTypeComponent implements OnInit{

  form: FormGroup =  new FormGroup({

  })
  gridData: IPropertyType [] = []
  masterSrv = inject(MasterService)

  constructor() {
    this.initializeForm()
  }

  ngOnInit(): void {
    this.getGridData();
  }

  getGridData() {
    this.masterSrv.getAllPropertyType().subscribe((res:IAPIResponseModel)=>{
      this.gridData = res.data;
    })
  }
  onSave() {
    this.masterSrv.savePropertyType(this.form.value).subscribe((res:IAPIResponseModel)=> {
      if(res.result) {
        alert('Record Saved');
        this.getGridData();
      } else {
        alert(res.message)
      }
    })
  }

  onUpdate() {
    this.masterSrv.updatePropertyType(this.form.value).subscribe((res:IAPIResponseModel)=> {
      if(res.result) {
        alert('Record Updated');
        this.getGridData();
      } else {
        alert(res.message)
      }
    })
  }

  onDelete(id: number) {
    const isDelet = confirm('Are you Sure want to Delete')
    if(isDelet) {
      this.masterSrv.deletePropertyTypeById(id).subscribe((res:IAPIResponseModel)=> {
        if(res.result) {
          alert('Record Deleted');
          this.getGridData();
        } else {
          alert(res.message)
        }
      })
    }
  }

  initializeForm(item?:IPropertyType) {
    this.form = new FormGroup({
      propertTypeId: new FormControl<number>(item ? item.propertTypeId: 0),
      propertyType: new FormControl<string>(item ? item.propertyType :'',[Validators.required,Validators.minLength(3)])
    })
  }

  onEdit(item: IPropertyType) {
    this.initializeForm(item)
  }

}
