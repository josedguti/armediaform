import { Component, Inject, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from './shared/api.service';
import { ConfirmedValidator } from './confirmed.validator';
import { FormModel } from './formdata.model';
    
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  armediaform: FormGroup;
  
  formModelObj : FormModel = new FormModel();
  
  listData: any;

 

  constructor(private fb: FormBuilder,
    private api : ApiService) {
  
      this.listData = [];

    this.armediaform = this.fb.group({
      email: ['', Validators.required],
      subscription: ['Advanced', Validators.required],
      date: [(new Date()).toISOString().substring(0,10)],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    },  { 
      validator: ConfirmedValidator('password', 'confirm_password')
    }, )
  }
    
  get f(){
    return this.armediaform.controls;
  }


  addForm(){

    this.formModelObj.email = this.armediaform.value.email;
    this.formModelObj.subscription = this.armediaform.value.subscription;
    this.formModelObj.password = this.armediaform.value.password;
    this.formModelObj.date = this.armediaform.value.date;

    this.api.postData(this.formModelObj)
    .subscribe((res: any)=>{
      console.log(res);
      alert('data added successfully')
    })
    console.log(this.armediaform.value);

    this.listData.push(this.armediaform.value);

    this.armediaform.controls['email'].reset();
    this.armediaform.controls['password'].reset();
    this.armediaform.controls['confirm_password'].reset();
    this.armediaform.patchValue({
      subscription: 'Advanced'
    });
   
  }

  reset(){
    if (confirm('Are you sure you want to discard the changes?')) {
      this.armediaform.controls['email'].reset();
      this.armediaform.controls['password'].reset();
      this.armediaform.controls['confirm_password'].reset();
      this.armediaform.patchValue({
        subscription: 'Advanced'
      });
      console.log('form was reset')
    } else {
      console.log('form was not reset')
    }
    
  }
  

  
}