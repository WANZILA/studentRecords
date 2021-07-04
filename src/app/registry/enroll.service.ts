import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';

import { Enroll, EnrollSingleStudent } from '../registry/registrar';

import { HandleErrors } from '../shared/handleErrors.service';
// import { StringReplaceService } from '../shared/stringreplace.service';

@Injectable({
  providedIn: 'root'
})

export class EnrollService {
  //url to the db API

  private generalUrl = `${environment.apiUrl}/registrar/enrolls`;
  private studentUrl = `${environment.apiUrl}/student`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentails': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    })
  }

  redirectUrl: string;
  // private stringReplaceService: StringReplaceService
  constructor(
    private http: HttpClient,
    private handleErrors: HandleErrors
  ) { }



  getAll(): Observable<Enroll[]> {
    return this.http.get<Enroll[]>(`${this.generalUrl}`)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(
          this.handleErrors.handleError
        )
      );
  }
  
  // uses EnrollSingleStudent for getting only student names
  get_Students_To_Enroll(intakeDate:string, studyProgramme:string,courseCode: string):Observable<EnrollSingleStudent[]> {
    const url = `${this.generalUrl}/intakedate/${intakeDate}/studyprogramme/${studyProgramme}/coursecode/${courseCode}`;
    return this.http.get<EnrollSingleStudent[]>(url)
      .pipe(
        tap(data => console.log('getOne' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }



  get_EnrolledStudents(semesterdatecode: string, coursecode: string, semesternum: string):Observable<Enroll[]> {
    const url = `${this.generalUrl}/semesterdatecode/${semesterdatecode}/semesternum/${semesternum}/coursecode/${coursecode}`;
    return this.http.get<Enroll[]>(url)
      .pipe(
        tap(data => console.log('getOne' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }

  getOne(id: string): Observable<Enroll> {
    if (id === '') {
      return of(this.initializeIntake());
    }
    const idReplace = id;
    // console.log(idReplace);
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.get<Enroll>(url)
      .pipe(
        tap(data => console.log('getOne' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }


 
  createOne(addnew: Enroll): Observable<Enroll> {
    const url = `${this.generalUrl}/add`;
    // return this.http.post<Admin>(url, admin,{ headers})
    return this.http.post<Enroll>(url, addnew, this.httpOptions)
      .pipe(
        tap(data => console.log('CreateOne:' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }

  // adds_Enroll

  // /enrolls/add


  updateOne(editOld: Enroll): Observable<Enroll> {
    // onst idReplace = this.stringReplaceService.
    // const idReplace = this.forwardShlashReplace(editOld.intakeDate);
    const idReplace = editOld.markNum;
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.patch<Enroll>(url, editOld, this.httpOptions)
      .pipe(
        tap(() => console.log('updates' + editOld.markNum)),
        map(() => editOld),
        catchError(this.handleErrors.handleError)
      );
  }

  deleteOne(id: string): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const idReplace = this.stringReplaceService.forwardShlashReplace(id);
    ///const idReplace = this.forwardShlashReplace(id);
    const idReplace = id;
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.delete<Enroll>(url, this.httpOptions)
      .pipe(
        tap(data => console.log('Deletes: ' + id)),
        catchError(this.handleErrors.handleError)
      );
  }

  private initializeIntake(): Enroll {
    return {
      markNum: null,
      semesterDateCode: null,
      courseCode: null,
      courseUnitCode: null,
      studentId: null
    };
  }

}