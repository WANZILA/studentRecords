import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, retry, tap, map } from 'rxjs/operators';

import { Student, StudyProgramme } from './student';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  //http://localhost:4000/student
   private studentUrl = `${environment.apiUrl}/student`;
     // private studentUrl;

     // 'Access-Control-Allow-Credentails': 'true',
     //'Access-Control-Allow-Origin': '*'
     // 'Access-Control-Allow-Methods': '*'
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'      })
    }
    redirectUrl: string;

  constructor(
    private http: HttpClient,
    // private httpErrorHandler: HttpErrorHandler
  ) { }

  createStudent(student: Student): Observable<Student>{
    // 'Content-Type': 'apllication/json; charset=utf-8'
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // student.studentId= null;
    // const studId = this.encordUrl(student.studentId);
    const url = `${this.studentUrl}/add`;
    // return this.http.post<Student>(url, student,{ headers})
    return this.http.post<Student>(url, student, this.httpOptions)
    .pipe( 
      tap(data => console.log('CreateProduct:' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  student_get_all_Student_Intakes(intake: string, branch: string, studyProg: string): Observable<Student[]>{
    // /intakedate/:intakeDate/branch/:branchNum/studyprog/:studyProgramme
   // 
    const url = `${this.studentUrl}/intakedate/${intake}/branch/${branch}/studyprog/${studyProg}`;
    return this.http.get<Student[]>(url)
    .pipe(
      tap(data => console.log('getStudent ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
 
  // used in reg module to get all study programmes 
  // Nb it must be put in structures in version 0.2
  get_all_StudyProgrammes(): Observable<StudyProgramme[]>{
    return this.http.get<StudyProgramme[]>(`${this.studentUrl}/reg`)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
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
    // const studentId = this.encordUrl(id);
    const studentId = this.stringReplace1(id);
    const url = `${this.studentUrl}/${studentId}`;
    return this.http.delete<Student>(url, { headers })
      .pipe(
        tap(data => console.log('deleteStudent: ' + id)),
        catchError(this.handleError)
        );
  }

   updateStudent(student: Student): Observable<Student>{
     // const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
     // const studId = this.encordUrl(student.studentId);
     const studId = this.stringReplace1(student.studentId);
     // const url = `${this.studentUrl}/${studId}`;
    //  const url = `${this.studentUrl}/update/${studId}`;

     const url = `${this.studentUrl}/${studId}`;
     // this.http.put(url, student, this.httpOptions)
     return this.http.patch<Student>(url, student, this.httpOptions)
     .pipe(
       tap(()=> console.log('update Student' + student.fname)),
       map(() => student),
       catchError(this.handleError)
       // catchError(this.handleError)<any>('updateStudent)
     );
   } 
  // etcs tracking gsa
   
  //  encordUrl(text:string){
  //  // console.log(text);
  //   return encodeURIComponent(text);
  // }
  stringReplace1(text:string){
    //  console.log(text);   
    const txt1 = text.replace('/','_');
    const txt2 = txt1.replace('/','_');
     const txt3 = txt2.replace('/','_');
     console.log(txt3);
    return txt3;
  }

  private handleError(err): Observable<never> {
    //in this sample app we will log the errors to the console otherwise we can send to some remote logging server
    let errorMessage: string;
    if(err.error instanceof ErrorEvent ){ 
      //on client side handle the errror accordingly
      errorMessage = `An error occured: ${err.error.message}`;
    } else{
      //backend returns unsuccessfull response code 
      errorMessage = `Backend returned code ${err.status}: ${err.error}`;
    }
   // console.error(err);
    return throwError(errorMessage);
  }
  // private handleError(error: HttpErrorResponse){
  //   if(error.status === 0){
  //   //a client-side or network error occured. Handle it  accordingly.
  //   console.error('An error occured:', error.error);
  //   } else {
  //     //The backend returned an unsuccessfull response code.
  //     // the response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status},`+ `body was: ${error.error}`);      
  //   }
  //   //return an observable with a user-facing error message
  //   return throwError(
  //     'Sorry something bad happened;'
  //   )
  // }

  

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
