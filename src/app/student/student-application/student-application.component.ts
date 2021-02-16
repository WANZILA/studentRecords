import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { StudentDetails } from '../student';

@Component({
  selector: 'app-student-application',
  templateUrl: './student-application.component.html',
  styleUrls: ['./student-application.component.css']
})
export class StudentApplicationComponent implements OnInit {
  //reference to FormGroup Model
  //studentForm: FormGroup;
  generalForm: FormGroup;

  //data modelt for managing student data
  students: StudentDetails = new StudentDetails();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    // nb add religion 
    this.generalForm = this.fb.group({
    studentId:['',[Validators.required, Validators.minLength(2)]] ,
    fname:['',[Validators.required, Validators.minLength(2)]] ,
    mName:['',[Validators.required, Validators.minLength(2)]] ,
    lname:['',[Validators.required, Validators.minLength(2)]] ,
    title:['',[Validators.required, Validators.minLength(2)]] ,
    birthDate:['',[Validators.required, Validators.minLength(2)]] ,
    gender:['',[Validators.required, Validators.minLength(2)]] ,
    maritalStatus:['',[Validators.required, Validators.minLength(2)]] ,
     
    });



  }
  // fnameControl = new FormControl('');

}
