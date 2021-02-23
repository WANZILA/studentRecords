import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime} from 'rxjs/operators';
import { GenericValidator } from '../../shared/shared/generic-validator';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent implements OnInit, AfterViewInit {

  //access  every form input fields in our signup html file
  @ViewChildren(FormControlName, {read: ElementRef })
  formInputElements: ElementRef[];
  // reference to FormGroup Model in the html
  // studentForm: FormGroup;
  generalForm: FormGroup;


 //use generic validation message Class
  displayMessage: {[key: string]: string } = {};
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) { 
    //define an instance of the validator for use with this form.
    this.genericValidator = new GenericValidator();
  }

  ngOnInit(): void {

    // nb add religion 
    
    
    this.generalForm = this.fb.group({
    adminId:['',[Validators.required, Validators.minLength(2)]] ,
    title:['',[Validators.required, Validators.minLength(2)]] ,
    fname:['',[Validators.required, Validators.minLength(2)]] ,
    mName:['',[Validators.required, Validators.minLength(2)]] ,
    lname:['',[Validators.required, Validators.minLength(2)]] ,
    birthDate:['',[Validators.required, Validators.minLength(2)]] ,
    gender:['',[Validators.required, Validators.minLength(2)]] ,
    maritalStatus:['',[Validators.required, Validators.minLength(2)]] ,
    children:['',[Validators.required, Validators.minLength(2)]],
    employmentStatus:['',[Validators.required, Validators.minLength(2)]],
    employmentDate:['',[Validators.required, Validators.minLength(2)]],
    unemploymentDate:['',[Validators.required, Validators.minLength(2)]],
    branchNum:['',[Validators.required, Validators.minLength(2)]],
    departCode:['',[Validators.required, Validators.minLength(2)]],
    role:['',[Validators.required, Validators.minLength(2)]],
    nation:['',[Validators.required, Validators.minLength(2)]],
    district:['',[Validators.required, Validators.minLength(2)]] ,
    county:['',[Validators.required, Validators.minLength(2)]] ,
    subCounty:['',[Validators.required, Validators.minLength(2)]] ,
    parish:['',[Validators.required, Validators.minLength(2)]] ,
    village:['',[Validators.required, Validators.minLength(2)]] ,
    phoneAddress1:['',[Validators.required, Validators.minLength(2)]] ,
    phoneAddress2:['',[ Validators.minLength(2)]] ,
    emailAddress:['',[Validators.required, Validators.minLength(2)]] ,
    // educationLevel:['',[Validators.required, Validators.minLength(2)]] ,
    // specify:['',[Validators.required, Validators.minLength(2)]],
    // institutions:['',[Validators.required, Validators.minLength(2)]],
    username:['',[Validators.required, Validators.minLength(2)]],
    passwords:['',[Validators.required, Validators.minLength(2)]]
    });

  }

  ngAfterViewInit(): void {
    //Watch for the blur event fron any input element on the form
    const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    //merge the blur even obserable with the valueChanges observable
    merge(this.generalForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.generalForm);
    });
  }


  // fnameControl = new FormControl('');
  save(){
    console.log('Yeah');
  }


}
