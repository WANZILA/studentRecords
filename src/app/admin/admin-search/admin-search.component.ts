import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminService} from '../admin.service';


// import {}
@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css']
})
export class AdminSearchComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef})
  formInputElements: ElementRef[];

  //reference to the FormGroup Model in the html
  generalForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService) { }

  ngOnInit(): void {

  }

}
