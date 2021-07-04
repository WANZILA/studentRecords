import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';

import { Department } from './structure';

import { HandleErrors } from '../shared/handleErrors.service';
// import { StringReplaceService } from '../shared/stringreplace.service';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  //url to the db API
  private generalUrl = `${environment.apiUrl}/structure/departments`;

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



  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.generalUrl}`)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(
          this.handleErrors.handleError
        )
      );
  }

  getOne(id: string): Observable<Department> {
    if (id === '') {
      return of(this.initializeIntake());
    }
    const idReplace = id;
    // console.log(idReplace);
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.get<Department>(url)
      .pipe(
        tap(data => console.log('getOne' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }

  createOne(addnew: Department): Observable<Department> {
    const url = `${this.generalUrl}/add`;
    // return this.http.post<Admin>(url, admin,{ headers})
    return this.http.post<Department>(url, addnew, this.httpOptions)
      .pipe(
        tap(data => console.log('CreateOne:' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }


  updateOne(editOld: Department): Observable<Department> {
    // onst idReplace = this.stringReplaceService.
    // const idReplace = this.forwardShlashReplace(editOld.intakeDate);
    const idReplace = editOld.departCode;
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.patch<Department>(url, editOld, this.httpOptions)
      .pipe(
        tap(() => console.log('update Admin' + editOld.departName)),
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
    return this.http.delete<Department>(url, this.httpOptions)
      .pipe(
        tap(data => console.log('Deletes: ' + id)),
        catchError(this.handleErrors.handleError)
      );
  }

  private initializeIntake(): Department {
    return {
      departCode: null,
      departName: null,
      description: null
    };
  }

}