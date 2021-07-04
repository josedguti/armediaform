import { Component, OnInit } from '@angular/core';
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
  form: FormGroup = new FormGroup({});
  
  formModelObj : FormModel = new FormModel();
  


  constructor(private fb: FormBuilder,
    private api : ApiService) {
  
    this.form = fb.group({
      email: new FormControl(''),
      subscription: new FormControl(''),
      date: new FormControl(''),
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    },  { 
      validator: ConfirmedValidator('password', 'confirm_password')
    }, )
  }
    
  get f(){
    return this.form.controls;
  }
   
  onSubmit(){
    this.formModelObj.email = this.form.value.email;
    this.formModelObj.subscription = this.form.value.subscription;
    this.formModelObj.password = this.form.value.password;
    this.formModelObj.date = this.form.value.date;

    this.api.postData(this.formModelObj)
    .subscribe((res: any)=>{
      console.log(res);
      alert('data added successfully')
      this.form.reset();
    })
    console.log(this.form.value);
  }
  
}