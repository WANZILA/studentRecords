import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';

import { CourseUnit, CourseUnit_MarkSearch, CourseUnit_Reg } from './structure';

import { HandleErrors } from '../shared/handleErrors.service';
// import { StringReplaceService } from '../shared/stringreplace.service';

@Injectable({
  providedIn: 'root'
})

export class CourseUnitService {
  //url to the db API
  private generalUrl = `${environment.apiUrl}/structure/courseunits`;

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


 // used in mark-edit in the registrar module 
  getAll(): Observable<CourseUnit[]> {
    return this.http.get<CourseUnit[]>(`${this.generalUrl}`)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(
          this.handleErrors.handleError
        )
      );
  }

  // used for course search in structures
  getAll_Structure(course: string): Observable<CourseUnit[]> {
   // coursecode/:courseCode
   const url = `${this.generalUrl}/coursecode/${course}`;
   return this.http.get<CourseUnit[]>(url)
     .pipe(
       tap(data => console.log(JSON.stringify(data))),
       catchError(
         this.handleErrors.handleError)
     );
  }

  // getAllSemester(course, sem)

  getOne(id: string): Observable<CourseUnit> {
    if (id === '') {
      return of(this.initializeIntake());
    }
    const idReplace = id;
    // console.log(idReplace);
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.get<CourseUnit>(url)
      .pipe(
        tap(data => console.log('getOne' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }
   // /courseunits/:courseCode/semesternum/:semesterNum
  get_CourseUnit_Reg(coursename: string, semesternum: string):Observable<CourseUnit_Reg[]> {
    // if (coursename === '') {
    //   return of(this.initializeCourseUnit_Reg());
    // }
    
    // console.log(idReplace);
    const url = `${this.generalUrl}/${coursename}/semesternum/${semesternum}`;
    return this.http.get<CourseUnit_Reg[]>(url)
      .pipe(
        tap(data => console.log('getOne' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }

    //  // used in markSearch route
    //  get_CourseUnit_MarkSearch(semesterdatecode: string, courseunitcode: string):Observable<CourseUnit_MarkSearch[]> {
    //   // if (coursename === '') {
    //   //   return of(this.initializeCourseUnit_Reg());
    //   // }
      
    //   // console.log(idReplace);
    //   const url = `${this.generalUrl}/${coursename}/semesternum/${semesternum}`;
    //   return this.http.get<CourseUnit_Reg[]>(url)
    //     .pipe(
    //       tap(data => console.log('getOne' + JSON.stringify(data))),
    //       catchError(this.handleErrors.handleError)
    //     );
    // }

  createOne(addnew: CourseUnit): Observable<CourseUnit> {
    const url = `${this.generalUrl}/add`;
    // return this.http.post<Admin>(url, admin,{ headers})
    return this.http.post<CourseUnit>(url, addnew, this.httpOptions)
      .pipe(
        tap(data => console.log('CreateOne:' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }


  updateOne(editOld: CourseUnit): Observable<CourseUnit> {
    // onst idReplace = this.stringReplaceService.
    // const idReplace = this.forwardShlashReplace(editOld.intakeDate);
    const idReplace = editOld.courseUnitCode;
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.patch<CourseUnit>(url, editOld, this.httpOptions)
      .pipe(
        tap(() => console.log('update Admin' + editOld.courseUnitCode)),
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
    return this.http.delete<CourseUnit>(url, this.httpOptions)
      .pipe(
        tap(data => console.log('Deletes: ' + id)),
        catchError(this.handleErrors.handleError)
      );
  }

  private initializeIntake(): CourseUnit {
    return {
      courseUnitCode: null, 
      courseUnitName: null, 
      description: null, 
      creditHours: null, 
      courseCode: null,
      coursework: null,
      midExam: null,
      finalExam: null, 
      semesterNum: null,
    };
  }
  private initializeCourseUnit_Reg(): CourseUnit_Reg{
    return{
      courseUnitCode: null, 
      courseUnitName: null, 
      courseCode: null,
      semesterNum: null
    }

  }

}