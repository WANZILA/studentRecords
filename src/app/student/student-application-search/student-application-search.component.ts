import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime} from 'rxjs/operators';
import * as moment from 'moment';
import { BranchService } from 'src/app/structures/branch.service';
import { IntakeService } from 'src/app/structures/intake.service';
import { Branch, Intake, StudyProgramme } from 'src/app/structures/structure';
import { StudyProgrammeService } from 'src/app/structures/studyprogrammes.service';
import { GenericValidator } from '../../shared/generic-validator';

import{ Student } from '../student';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-student-application-search',
  templateUrl: './student-application-search.component.html',
  styleUrls: ['./student-application-search.component.css']
})

export class StudentApplicationSearchComponent implements OnInit, AfterViewInit {
    //access  every form input fields 
    @ViewChildren(FormControlName, {read: ElementRef })
    formInputElements: ElementRef[];
    // reference to FormGroup Model in the html
    // studentForm: FormGroup;
    generalForm: FormGroup;

        //for displaying data from db
        rowsIntake: Intake[] =[];
        title: string;
        rows: Student[] = [];
        rowBranch: Branch[] = []; 
        rowStudyProgramme: StudyProgramme[] =[];
 
   //use generic validation message Class
    displayMessage: {[key: string]: string } = {};
    private genericValidator: GenericValidator;
  
    constructor(private fb: FormBuilder,
      private router: Router,
      private intakeService: IntakeService,
      private studyprogservice: StudyProgrammeService,
      private studentService: StudentService,
      private branchservice: BranchService) { 
      //define an instance of the validator for use with this form.
      this.genericValidator = new GenericValidator();
    }



  

  ngOnInit(): void {
    // nb add religion 
    this.generalForm = this.fb.group({
      intakeDate:['',[Validators.required, Validators.minLength(2)]] ,
      branchNum:['',[Validators.required, Validators.minLength(1)]],
      studyprogramme :['',[Validators.required, Validators.minLength(2)]]
    });
    
   // this.getStudents();
   this.getAllBranches();
   this.getAllIntakes();
   this.getAllStudyProg();
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
  
  getAllBranches(){
    this.branchservice.getAll().subscribe(
      result => {
        this.rowBranch = result;
      }
    )
  }
  getStudents(){
    this.studentService.getStudents().subscribe(
      result => {
        this.rows = result;
      }
    )
  }

  getAllIntakes(): void {
    this.intakeService.getAll_Intakes().subscribe(
      result => {
        this.rowsIntake= result
      }
    )
  }   
  getAllStudyProg(): void {
    this.studyprogservice.getAll().subscribe(
      result => {
        this.rowStudyProgramme = result
      }
    )
  }

  // encordUrl(text:string){
  //   console.log(text);
  //   return encodeURIComponent(text);
  // }
  // 
  search(): void{
   const intakeD = this.generalForm.get('intakeDate').value;
   const dateMoment: moment.Moment = moment(intakeD);
      const intake = dateMoment.format('YYYY-MM-DD');
   const branch = this.generalForm.get('branchNum').value;
   const studyProg = this.generalForm.get('studyprogramme').value;
    
    this.studentService.student_get_all_Student_Intakes(intake, branch, studyProg).subscribe(
      result => {
       //  this.displayCourseUnits(result);
       this.rows = result;
     
      }
    );

   }

  stringReplace(text:string){
    console.log(text);
   
    const txt1 = text.replace('/','_');
    const txt2 = txt1.replace('/','_');
     const txt3 = txt2.replace('/','_');

    return txt3;
  }

  clears(): void{
    this.generalForm.get('intakeDate').patchValue('');
    this.generalForm.get('branchNum').patchValue('');
    this.generalForm.get('studyprogramme').patchValue('');
  }




}
