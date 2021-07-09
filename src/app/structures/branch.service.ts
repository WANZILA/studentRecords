import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';

import { Branch } from './structure';

import { HandleErrors } from '../shared/handleErrors.service';
// import { StringReplaceService } from '../shared/stringreplace.service';

@Injectable({
  providedIn: 'root'
})

export class BranchService {
  //url to the db API
  private generalUrl = `${environment.apiUrl}/structure/branches`;

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

  getAll(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.generalUrl}`)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(
          this.handleErrors.handleError
        )
      );
  }

  getOne(id: string): Observable<Branch> {
    if (id === '') {
      return of(this.initializeIntake());
    }
    const idReplace = id;
    // console.log(idReplace);
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.get<Branch>(url)
      .pipe(
        tap(data => console.log('getOne' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }

  createOne(addnew: Branch): Observable<Branch> {
    const url = `${this.generalUrl}/add`;

    return this.http.post<Branch>(url, addnew, this.httpOptions)
      .pipe(
        tap(data => console.log('CreateOne:' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }


  updateOne(editOld: Branch): Observable<Branch> {

    const idReplace = editOld.branchNum;
    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.patch<Branch>(url, editOld, this.httpOptions)
      .pipe(
        tap(() => console.log('update Admin' + editOld.branchName)),
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
    return this.http.delete<Branch>(url, this.httpOptions)
      .pipe(
        tap(data => console.log('Deletes: ' + id)),
        catchError(this.handleErrors.handleError)
      );
  }

  private initializeIntake(): Branch {
    return {
      branchNum: null,
      branchName: null
    };
  }

}