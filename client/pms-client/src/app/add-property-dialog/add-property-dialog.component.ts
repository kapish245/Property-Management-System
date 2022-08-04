import { Property } from './../interfaces/property';
import { PropertyApiService } from './../services/property-api.service';
import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: 'app-add-property-dialog',
  templateUrl: './add-property-dialog.component.html',
  styleUrls: ['./add-property-dialog.component.css']
})
export class AddPropertyDialogComponent implements OnInit {
  propertyForm!:FormGroup;
  buttonOperationName:String="Add Property";
  constructor(private FormBuilder:FormBuilder,private dialogRef:MatDialogRef<AddPropertyDialogComponent>,private propertyApiService:PropertyApiService,@Inject(MAT_DIALOG_DATA) private editdata:any,private toast:NgToastService) {

  }

  ngOnInit(): void {
    this.propertyForm = this.FormBuilder.group({
      name:['',Validators.required],
      description:['',Validators.required],
      size:['',[Validators.required,Validators.pattern(new RegExp(/^\d+\,\d+$/))]],

    })
    if(this.editdata){
      this.buttonOperationName="Update Property"
      this.propertyForm.controls['name'].setValue(this.editdata.name);
      this.propertyForm.controls['description'].setValue(this.editdata.description);
      this.propertyForm.controls['size'].setValue(this.editdata.size);

    }
  }

  addPropertyInstance(){
    if(!this.editdata){
      this.propertyApiService.createProperty(this.propertyForm.value)
      .subscribe({
        next:(data)=>{
          this.toast.success({detail:"Created",summary:"Property created successfully"});
          this.propertyForm.reset();
          this.dialogRef.close("AddedProperty");

        },
        error:(error)=>{
          this.toast.error({detail:"Error",summary:"Error in adding property"})
        }
      })
    }else{
      this.updatePropertyInstance(this.propertyForm.value,this.editdata._id)
    }
  }

  updatePropertyInstance(propertyFormData:Property,id:String){
    console.log(propertyFormData)
    this.propertyApiService.updateProperty(propertyFormData,id)
    .subscribe({
      next:(value)=>{
        this.toast.success({detail:"updated",summary:"Property updated successfully"});
        this.propertyForm.reset();
        this.dialogRef.close("updatedProperty");
      },error:(error)=>{
        this.toast.error({detail:"Error",summary:"Error in updating property"})
      },
    })
  }


}
