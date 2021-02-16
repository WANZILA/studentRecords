import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { debounceTime} from 'rxjs/operators';
import { FormSample} from  './form-sample';
// import { SharedModule } from './../../shared/shared/shared.module';

function emailMatcher(c: AbstractControl):{ [key:string]: boolean | null}{
  //getting access to email and confirmEmail formControls
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  //only returns validation until when touched
  if(emailControl.pristine || confirmControl.pristine){
    return null;
  }
  // comparisions
  if(emailControl.value === confirmControl.value){
    return null;
  }
  //not the same
  return{ 'match': true };
}

@Component({
  selector: 'app-form-sample',
  templateUrl: './form-sample.component.html',
  styleUrls: ['./form-sample.component.css']
})
export class FormSampleComponent implements OnInit {
  //reference to FormGroup Model
  formsForm: FormGroup;
  //data model for managing customer data
  forms: FormSample = new FormSample();

  
  // property for containing the validation message
  emailMessage: string;
  //data structure to store the valdiation messages
  private validationMessages ={
    required: 'Please Enter you email address.',
    email: 'Please enter a valid email address'
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formsForm = this.fb.group({
      fname: ['',[ Validators.required, Validators.minLength(2)]],
      lname: ['',[ Validators.required, Validators.minLength(2)]],
      emailGroup: this.fb.group({
        email: ['',[ Validators.required, Validators.email]],
        confirmEmail: ['',[Validators.required]]
      }, { validator: emailMatcher}),  
      phone:[''],
      notification: 'email'
    })

    this.formsForm.get('notification').valueChanges.subscribe(
      values => this.setNotification(values)
    );

    const emailControl = this.formsForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );
  }


  save(){
    console.log('Yeah');
  }

  setMessage(c: AbstractControl): void{
    //clear any current messages
    this.emailMessage ='';
    //determines whether to display validation message
    if((c.touched || c.dirty) && c.errors){
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }

  }

  setNotification(notifyVia: string):void {
    //refrence variable to the phoneControl in the FormGroup
    const phoneControl = this.formsForm.get('phone');

    //checks for the notification whether text or not
    if(notifyVia==="text"){
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    //reevaluates the phoneControl
    phoneControl.updateValueAndValidity();
  }



}
