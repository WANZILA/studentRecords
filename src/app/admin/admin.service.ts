import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';

import { Admin } from './admin';

import { HandleErrors } from '../shared/handleErrors.service';
// import { StringReplaceService } from '../shared/stringreplace.service';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  //url to the db API
  private generalUrl = `${environment.apiUrl}/admin`;

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

  getAll(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.generalUrl}`)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(
          this.handleErrors.handleError
        )
      );
  }

  getOne(id: string): Observable<Admin> {
    if (id === '') {
      return of(this.initializeAdmin());
    }
    const url = `${this.generalUrl}/${id}`;
    return this.http.get<Admin>(url)
      .pipe(
        tap(data => console.log('getAdmin')),
        catchError(this.handleErrors.handleError)
      );
  }

  creates(addnew: Admin): Observable<Admin> {
    const url = `${this.generalUrl}/add`;
    // return this.http.post<Admin>(url, admin,{ headers})
    return this.http.post<Admin>(url, addnew, this.httpOptions)
      .pipe(
        tap(data => console.log('CreateProduct:' + JSON.stringify(data))),
        catchError(this.handleErrors.handleError)
      );
  }
  

  updates(editOld: Admin): Observable<Admin>{
    // onst idReplace = this.stringReplaceService.
    const idReplace = this.forwardShlashReplace(editOld.adminId);
        const url = `${this.generalUrl}/${idReplace}`;
    return this.http.patch<Admin>(url, editOld, this.httpOptions)
    .pipe(
      tap(()=> console.log('update Admin' + editOld.fname)),
      map(() => editOld),
      catchError(this.handleErrors.handleError)
      // catchError(this.handleError)<any>('updateStudent)
    );
  } 

  deletes(id: string): Observable<{}>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // const idReplace = this.stringReplaceService.forwardShlashReplace(id);
    const idReplace = this.forwardShlashReplace(id);

    const url = `${this.generalUrl}/${idReplace}`;
    return this.http.delete<Admin>(url, { headers })
      .pipe(
        tap(data => console.log('Deletes: ' + id)),
        catchError(this.handleErrors.handleError)
        );
  }
  
  forwardShlashReplace(text:string) {
    //  console.log(text);   
    const txt1 = text.replace('/','_');
    const txt2 = txt1.replace('/','_');
     const txt3 = txt2.replace('/','_');
     console.log(txt3);
    return txt3;
  }

  private initializeAdmin(): Admin {
    return {
      adminId: null,
      fname: null,
      mname: null,
      lname: null,
      title: null,
      gender: null,
      birthDate: null,
      maritalStatus: null,
      children: null,
      employmentStatus: null,
      employmentDate: null,
      unemploymentDate: null,
      branchNum: null,
      role: null,
      nation: null,
      district: null,
      county: null,
      subCounty: null,
      parish: null,
      village: null,
      phoneAddress1: null,
      phoneAddress2: null,
      emailAddress: null,
      updatedBy: null,
      departCode: null,
      username: null,
    };


  }


}