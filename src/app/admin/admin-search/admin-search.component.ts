import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

import {Admin } from '../admin';
import { AdminService} from '../admin.service';
import { GenericValidatorsService } from '../../shared/generic-validators.service';

const VALIDATION_MESSAGES = {
  
  branchNum:{
    required:' Required'
  },
  role:{
    required:' Required'
  },
  departCode:{
    required:' Required'
  }
}
// import {}
@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css']
})
export class AdminSearchComponent implements OnInit {
  //acces every form input fields 
  @ViewChildren(FormControlName, { read: ElementRef})
  formInputElements: ElementRef[];

  //reference to the FormGroup Model in the html
  generalForm: FormGroup;
  
 // use generic validaton message class
 displayMessage: {[key: string]: string } = {};
 private genericValidator: GenericValidatorsService;
 
 // for displaying data from DB
 rows: Admin[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService) {
      this.genericValidator = new GenericValidatorsService(VALIDATION_MESSAGES);
     }

  ngOnInit(): void {
    //generating form controls
    this.generalForm = this.fb.group({
      departCode:['',[Validators.required, Validators.minLength(2)]],
      branchNum: ['',[Validators.required, Validators.minLength(2)]],
      role: ['',[Validators.required, Validators.minLength(2)]]
    });
    this.getAll();
  }

  ngOnDestroy(): void{
    // this.sub.unsubcribe();
  }

  ngAfterViewInit(): void{
    // watches for the blur event from any input element on the form
    const controlBlurs: Observable<any> [] = this.formInputElements.map((FormControl: ElementRef) => fromEvent(FormControl.nativeElement, 'blur'));

    // merge the blur even observable wih the valuesChanges observable
    merge(this.generalForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.generalForm);
    });
  }
  
  getAll(){
    this.adminService.getAll().subscribe(
      result => {
        this.rows = result;
      }
    )
  }

  stringReplace(text:string){
    console.log(text);   
    const txt1 = text.replace('/','_');
    const txt2 = txt1.replace('/','_');
     const txt3 = txt2.replace('/','_');
    return txt3;
  }

  search(){
    console.log('yeah');
  }

}
