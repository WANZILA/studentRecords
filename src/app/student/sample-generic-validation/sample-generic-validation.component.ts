import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../service/validation.service';

@Component({
  selector: 'app-sample-generic-validation',
  templateUrl: './sample-generic-validation.component.html',
  styleUrls: ['./sample-generic-validation.component.css']
})
export class SampleGenericValidationComponent implements OnInit {
  
  constructor(private fb: FormBuilder, private _validation: ValidationService) {
  }

  signUpForm: FormGroup;

  validationMessages = {
    'Name': {
      'required': 'Name is required.',
    },
    'Email': {
      'required': 'Email is required.',
      'pattern': 'Please provide valid Email ID'
    },
    'Password': {
      'required': 'Password is required.'
    },
    'ConfirmPassword': {
      'required': 'Confirm Password is required.',
      'mismatch': 'Password and Confirm Password do not match'
    }
  };

  formErrors = {};

  ngOnInit() {
    this.signUpForm = this.fb.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.pattern(this._validation.regex.email)]],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    },
      {
        validator: this._validation.matchConfirmItems('Password', 'ConfirmPassword'),
      });

    this.signUpForm.valueChanges.subscribe(
      value => {
        this.logValidationErrors()
      }
    );
  }


  logValidationErrors() {
    this.formErrors = this._validation.getValidationErrors(this.signUpForm, this.validationMessages);
  }

  onSubmit() {
    console.log(this.signUpForm.value);
  }

}
