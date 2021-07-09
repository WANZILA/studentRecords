import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControlName,  } from '@angular/forms';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime} from 'rxjs/operators';

import * as moment from 'moment';
import { GenericValidatorsService } from '../../shared/generic-validators.service';
import { Admin } from '../admin';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { StringReplaceService } from '../../shared/stringReplace.service';
import { BranchService } from 'src/app/structures/branch.service';
import { Branch, Department } from 'src/app/structures/structure';
import { DepartmentService } from 'src/app/structures/department.service';


const VALIDATION_MESSAGES = {
  adminId:{
    required:' Required'
  },
  title:{
    required:' Required'
  },
  fname:{
    required: 'Required'
  } ,
  mname:{
    required: 'Required'
  } ,
  lname:{
    required: 'Required'
  },
  // birthDate:{
  //   required: 'Required'
  // } ,
  gender:{
    required: 'Required'
  },
  maritalStatus:{
    required: 'Required'
  },
  // branchNum:{
  //   required:' Required'
  // },
  // role:{
  //   required:' Required'
  // },
  nation:{
    required: 'Required'
  } ,
	district:{
    required: 'Required'
  } ,
	county:{
    required: 'Required'
  } ,
	subCounty:{
    required: 'Required'
  } ,
	parish:{
    required: 'Required'
  } ,
	village:{
    required: 'Required'
  } ,
	phoneAddress1:{
    required: 'Required'
  } ,
	phoneAddress2:{
    required: 'Required'
  } ,
	emailAddress:{
    required: 'Required'
  } ,
  // departCode:{
  //   required:' Required'
  // },
  username:{
    required:' Required'
  }  
}

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {

  //access  every form input fields in our signup html file
  @ViewChildren(FormControlName, {read: ElementRef })
  formInputElements: ElementRef[];
  // reference to FormGroup Model in the html
  // studentForm: FormGroup;
  generalForm: FormGroup;

  rowBranch: Branch[] = [];
  rowDepart: Department[] =[]

   
  //server error messages
  pageTitle = 'Register New Staff'
  errorMessage: string;

  //variable for tracking admin Id
  ADMINID: string;

  //property admin
  admin: Admin;

  //observable variable to aid in geting the route parameters
  private sub: Subscription;



 //use generic validation message Class
  displayMessage: {[key: string]: string } = {};
  private genericValidator: GenericValidatorsService;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private departmentservice: DepartmentService,
    private branchservice: BranchService,
    private stringReplaceService: StringReplaceService
    ) { 
    //define an instance of the validator for use with this form.
    this.genericValidator = new GenericValidatorsService(VALIDATION_MESSAGES);
  }

  ngOnInit(): void {

    // nb add religion 
       
    this.generalForm = this.fb.group({
    adminId:['',[Validators.required, Validators.minLength(2)]] ,
    title:['',[Validators.required, Validators.minLength(2)]] ,
    fname:['',[Validators.required, Validators.minLength(2)]] ,
    // mname:['',[Validators.required, Validators.minLength(2)]] ,
    mname:[''] ,
    lname:['',[Validators.required, Validators.minLength(2)]] ,
    // birthDate:['',[Validators.required, Validators.minLength(2)]] ,
    gender:['',[Validators.required, Validators.minLength(2)]] ,
    maritalStatus:[''] ,
    //children:['',[ Validators.minLength(2)]],
   // employmentStatus:['',[Validators.required, Validators.minLength(2)]],
    //employmentDate:['',[Validators.required, Validators.minLength(2)]],
    //unemploymentDate:['',[ Validators.minLength(2)]],
     branchNum:[''],
     departCode:[''],
     role:[''],
    nation:[''],
    district:[''] ,
    county:[''] ,
    subCounty:[''] ,
    parish:[''] ,
    village:[''] ,
    phoneAddress1:[''] ,
    phoneAddress2:[''] ,
    emailAddress:[''] ,
    // educationLevel:['',[Validators.required, Validators.minLength(2)]] ,
    // specify:['',[Validators.required, Validators.minLength(2)]],
    // institutions:['',[Validators.required, Validators.minLength(2)]],
    username:[''],
    passwords:['']
    });

    // Read the admin Id  from the route paramete using an observable
    this.sub = this.route.paramMap.subscribe(
      params => {
        const adminId = params.get('adminId');
        this.ADMINID = params.get('adminId');

        if(this.ADMINID === '0'){
          this.pageTitle ='Add Staff';
          this.generalForm.reset();
          //CODE FOR REFRESHING THE PAGE

        } else {
          this.getOne(adminId);
        }
        
      }
    );
    this.getAllBranches();
    this.getAllDepart();

  }

  ngOnDestry(): void{
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void{
    //watches for th blur event from any input element on the form
    const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    //merge the blur even observable with the valueChanges observable
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

  getAllDepart(){
    this.departmentservice.getAll().subscribe(
      result => {
        this.rowDepart = result;
      }
    )
  } 
 
  //getting admin details
  getOne(adminId: string ): void{
    this.adminService.getOne(adminId).subscribe({
       next: ( admin: Admin ) => {
         this.display(admin)
       },
       error: err => this.errorMessage = err
     });
  }

  display(admin: Admin ): void{
    if(this.generalForm){
      //resets the form
      this.generalForm.reset();
    }
    //checks of admin array object has content and displays accordingly
    if(admin[0].adminId ===' '){
      this.pageTitle = 'Register New Staff';
    } else {
      this.pageTitle = `Edit Staff Details: ${admin[0].adminId}`;

      //updates data to the form
      this.generalForm.patchValue(admin[0]);

      //gets the intake and birth dates in json string and converts them into 15/08/2020 using moment
      const birth = admin[0].birthDate;
       // passing the intake variable into moment
        let birthMoment: moment.Moment = moment(birth);
       // const birthD = this.generalForm.get('birthDate').patchValue(birthMoment.format('YYYY-MM-DD'));  
    }

  }


   saves(): void{
        
    // console.log(stud)
     if(this.generalForm.valid) {
       if(this.generalForm.dirty) {
         // validateDate('1992/1/20');
         // console.log(validateDate('1992/1/20'));
   
         //console.log(Date());
         //const stud = this.generalForm.studentId;
        
               
         const stud = { ...this.admin, ...this.generalForm.value};
         // let studId = this.encordUrl(stud.studentId);
         let studId = stud.adminId;
           // const stud = { ...this.student, ...this.generalForm.getRawValue()};
         console.log(stud);
         // console.log(this.STUDENTID);
         
         //change the studentId ptc_J2021_cit_05 to ptc/J2021/cit/05
         let studentIdReplaced = this.stringReplace2(this.ADMINID);
         console.log(studentIdReplaced);
         
         if(studentIdReplaced === studId) {         
           this.adminService.updates(stud)
             .subscribe({
               next: () => this.onSaveComplete(),
               error: err => this.errorMessage = err
             }); 
            // this.onSaveComplete();         
         } else {
         //create product
         // let studId = this.encordUrl(stud.studentId);
           // this.generalForm.value.reset();
           
           this.adminService.creates(stud)
            .subscribe({
             next: () => this.onSaveComplete(),
             error: err => this.errorMessage = err
           });
          // console.log(stud);
         }
       } else {
       this.onSaveComplete();
     }
 
     } else {
       this.errorMessage ="Correct the validation errors.";
     }
 
   }

  
   onSaveComplete(): void{
    // reset the form to clear the warnings
   this.generalForm.reset();
   this.router.navigate(['/adminmenu','adminSearch']);
    // console.log('yes ');
  }
  
  // fnameControl = new FormControl('');

  deletes(): void{
    const stud = { ...this.admin, ...this.generalForm.value};
     if(stud.studentId === 0 ) {
       // Don't delete, 
       this.onSaveComplete();
     } else {
       if(confirm(`Are sure you want to Delete: ${stud.fname}`)){
         this.adminService.deletes(stud.adminId)
         .subscribe({
           next: () => this.onSaveComplete(),
          // error: err => this.errorMessage = err
         });
         this.onSaveComplete();
       }
     }
   }
  
  stringReplace2(text:string){
    //  console.log(text);   
    const txt1 = text.replace('_','/');
    const txt2 = txt1.replace('_','/');
     const txt3 = txt2.replace('_','/');
console.log(txt3);
    return txt3;
  }

}
