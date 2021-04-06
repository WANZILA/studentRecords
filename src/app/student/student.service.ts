import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';

import { Student } from './student';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  //http://localhost:4000/student
   private studentUrl = `${environment.apiUrl}/student`;
     // private studentUrl;

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentails': 'true',
        'Access-Control-Allow-Origin': '*'
      })
    }
    redirectUrl: string;

  constructor(
    private http: HttpClient,
    // private httpErrorHandler: HttpErrorHandler
  ) { }

  createStudent(student: Student): Observable<Student>{
    // 'Content-Type': 'apllication/json; charset=utf-8'
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // student.studentId= null;
    // const studId = this.encordUrl(student.studentId);
    const url = `${this.studentUrl}/add`;
    return this.http.post<Student>(url, student,{ headers})
    .pipe( 
      tap(data => console.log('CreateProduct:' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.studentUrl}`)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  //  getStudent(studentId: string){
  //   const url = `${this.studentUrl}/${studentId}`;
  //    return this.http.get<Student>(url)
  //    .pipe(
  //      catchError(this.handleError('getStudent', null))
  //    )
  //  }
  
  getStudent(studentId: string): Observable<Student>{
    if(studentId ===' '){
      return of(this.initializeStudent());
    }
    const url = `${this.studentUrl}/${studentId}`;
    return this.http.get<Student>(url)
    .pipe(
      tap(data => console.log('getStudent ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteStudent(id: string): Observable<{}>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const studentId = this.encordUrl(id);
    const url = `${this.studentUrl}/${studentId}`;
    return this.http.delete<Student>(url, { headers })
      .pipe(
        tap(data => console.log('deleteStudent: ' + id)),
        catchError(this.handleError)
        );
  }

   updateStudent(student: Student): Observable<Student>{
     const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
     const studId = this.encordUrl(student.studentId);
     const url = `${this.studentUrl}/${studId}`;
     return this.http.put<Student>(url, student, { headers })
     .pipe(
       tap(()=> console.log('update Student' + student.fname)),
       map(() => student),
       catchError(this.handleError)
     )
   } 
   
   encordUrl(text:string){
   // console.log(text);
    return encodeURIComponent(text);
  }


  private handleError(err): Observable<never> {
    //in this sample app we will log the errors to the console otherwise we can send to some remote logging server
    let errorMessage: string;
    if(err.error instanceof ErrorEvent ){ 
      //on client side handle the errror accordingly
      errorMessage = `An error occured: ${err.error.message}`;
    } else{
      //backend returns unsuccessfull response code 
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  

  //returns intialized messages
  private initializeStudent(): Student{
    return {
      studentId: null,
      fname: null ,
      mname: null ,
      lname: null ,
      title: null ,
      birthDate: null ,
      gender: null ,
      maritalStatus: null ,
      // children: null ,	
      nation: null  ,
      district: null  ,
      county: null ,
      subCounty: null ,
      parish: null ,
      village: null ,
      phoneAddress1: null ,
      phoneAddress2: null ,
      emailAddress: null ,
      // keenName: null ,
      // keenRelationship: null ,
      // keenPhone: 0 ,
      // keenEmail: null ,
      // keenAddress: null ,
      educationLevel: null ,
      // specify: null ,
      // institutions: null ,
      intakeDate: null ,
      branchNum: null ,
      studyprogramme: null ,
      // EntryLevel: null ,
      courseCode: null ,
      studentStatus: null  ,
      passwords: null  ,
      // adminId: null 
    };
  }





}