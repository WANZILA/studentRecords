import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';

import { StudyProgramme } from './structure';

import { HandleErrors } from '../shared/handleErrors.service';
// import { StringReplaceService } from '../shared/stringreplace.service';

@Injectable({
  providedIn: 'root'
})

export class StudyProgrammeService {
  //url to the db API
  private generalUrl = `${environment.apiUrl}/structure/studyprogrammes`;

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

  getAll(): Observable<StudyProgramme[]> {
    return this.http.get<StudyProgramme[]>(`${this.generalUrl}`)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(
          this.handleErrors.handleError
        )
      );
  }

}