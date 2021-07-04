import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';

import { Mark } from '../registry/registrar';

import { HandleErrors } from '../shared/handleErrors.service';
// import { StringReplaceService } from '../shared/stringreplace.service';

@Injectable({
  providedIn: 'root'
})

export class MarkService {
  //url to the db API
  private generalUrl = `${environment.apiUrl}/registrar/marks`;

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



  getAll(semesterdatecode:string, courseunitcode: string):Observable<Mark[]> {
    const url = `${this.generalUrl}/semesterdatecode/${semesterdatecode}/courseunitcode/${courseunitcode}`;
    return this.http.get<Mark[]>(url)
      .pipe(
        tap(data => console.log('getOne' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }

  getOne(id: string): Observable<Mark> {
    if (id === '') {
      return of(this.initializeIntake());
    }
    console.log(id);
    const idReplace = id;
    // console.log(idReplace);
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.get<Mark>(url)
      .pipe(
        tap(data => console.log('getOne' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }

  createOne(addnew: Mark): Observable<Mark> {
    const url = `${this.generalUrl}/add`;
    // return this.http.post<Admin>(url, admin,{ headers})
    return this.http.post<Mark>(url, addnew, this.httpOptions)
      .pipe(
        tap(data => console.log('CreateOne:' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }


  updateOne(editOld: Mark): Observable<Mark> {
    // onst idReplace = this.stringReplaceService.
    // const idReplace = this.forwardShlashReplace(editOld.intakeDate);
    const idReplace = editOld.markNum;
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.patch<Mark>(url, editOld, this.httpOptions)
      .pipe(
        tap(() => console.log('update Admin' + editOld.gradeCode)),
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
    return this.http.delete<Mark>(url, this.httpOptions)
      .pipe(
        tap(data => console.log('Deletes: ' + id)),
        catchError(this.handleErrors.handleError)
      );
  }

  private initializeIntake(): Mark {
    return {
      markNum: null,
      semesterDateCode: null,
      courseCode: null,
      courseUnitCode: null,
      studentId: null, 
      coursework: null,
      midExam: null,
      finalExam: null, 
      totalMark: null, 
      gradeCode: null 
    };
  }

}