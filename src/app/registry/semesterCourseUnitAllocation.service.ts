import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';

import { SemesterCourseUnitAllocation } from './registrar';

import { HandleErrors } from '../shared/handleErrors.service';
// import { StringReplaceService } from '../shared/stringreplace.service';

@Injectable({
  providedIn: 'root'
})

export class SemesterCourseUnitAllocationService {
  //url to the db API
  private generalUrl = `${environment.apiUrl}/registrar/courseunitallocations`;

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



  getAll(): Observable<SemesterCourseUnitAllocation[]> {
    return this.http.get<SemesterCourseUnitAllocation[]>(`${this.generalUrl}`)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(
          this.handleErrors.handleError
        )
      );
  }

  getOne(id: string): Observable<SemesterCourseUnitAllocation> {
    if (id === '') {
      return of(this.initializeIntake());
    }
    const idReplace = id;
    // console.log(idReplace);
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.get<SemesterCourseUnitAllocation>(url)
      .pipe(
        tap(data => console.log('getOne' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }

  get_SemesterAssingedCourseUnits(semesterdatecode: string, coursecode: string, semesternum: string):Observable<SemesterCourseUnitAllocation[]> {
    // if (coursename === '') {
    //   return of(this.initializeCourseUnit_Reg());
    // }
    
    // console.log(idReplace);
    const url = `${this.generalUrl}/semesterdatecode/${semesterdatecode}/coursecode/${coursecode}/semesternum/${semesternum}`;
    return this.http.get<SemesterCourseUnitAllocation[]>(url)
      .pipe(
        tap(data => console.log('getOne' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }

  createOne(addnew: SemesterCourseUnitAllocation): Observable<SemesterCourseUnitAllocation> {
    const url = `${this.generalUrl}/add`;
    // return this.http.post<Admin>(url, admin,{ headers})
    return this.http.post<SemesterCourseUnitAllocation>(url, addnew, this.httpOptions)
      .pipe(
        tap(data => console.log('CreateOne:' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }


  updateOne(editOld: SemesterCourseUnitAllocation): Observable<SemesterCourseUnitAllocation> {
    // onst idReplace = this.stringReplaceService.
    // const idReplace = this.forwardShlashReplace(editOld.intakeDate);
    const idReplace = editOld.allocationNum;
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.patch<SemesterCourseUnitAllocation>(url, editOld, this.httpOptions)
      .pipe(
        tap(() => console.log('update Admin' + editOld.allocationNum)),
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
    return this.http.delete<SemesterCourseUnitAllocation>(url, this.httpOptions)
      .pipe(
        tap(data => console.log('Deletes: ' + id)),
        catchError(this.handleErrors.handleError)
      );
  }

  private initializeIntake(): SemesterCourseUnitAllocation {
    return {
      allocationNum: null,
      semesterDateCode: null,
      semesterNum: null,
      courseCode: null,
      courseUnitCode: null,
      intakeDate: null,
      adminId: null,
      notes: null
    };
  }

}