import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pet } from './pet';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class PetService {
  private petsUrl = 'api/pets'; // URL to web api TODO

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET Pets from the server */
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.petsUrl).pipe(
      tap((_) => this.log('fetched Pets')),
      catchError(this.handleError<Pet[]>('getPets', []))
    );
  }

  /** GET Pet by id. Return `undefined` when id not found */
  getPetNo404<Data>(id: number): Observable<Pet> {
    const url = `${this.petsUrl}/?id=${id}`;
    return this.http.get<Pet[]>(url).pipe(
      map((Pets) => Pets[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} Pet id=${id}`);
      }),
      catchError(this.handleError<Pet>(`getPet id=${id}`))
    );
  }

  /** GET Pet by id. Will 404 if id not found */
  getPet(id: number): Observable<Pet> {
    const url = `${this.petsUrl}/${id}`;
    return this.http.get<Pet>(url).pipe(
      tap((_) => this.log(`fetched Pet id=${id}`)),
      catchError(this.handleError<Pet>(`getPet id=${id}`))
    );
  }

  /* GET Pets whose name contains search term */
  searchPets(term: string): Observable<Pet[]> {
    if (!term.trim()) {
      // if not search term, return empty Pet array.
      return of([]);
    }
    return this.http.get<Pet[]>(`${this.petsUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found Pets matching "${term}"`)
          : this.log(`no Pets matching "${term}"`)
      ),
      catchError(this.handleError<Pet[]>('searchPets', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Pet to the server */
  addPet(Pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.petsUrl, Pet, this.httpOptions).pipe(
      tap((newPet: Pet) => this.log(`added Pet w/ id=${newPet.id}`)),
      catchError(this.handleError<Pet>('addPet'))
    );
  }

  /** DELETE: delete the Pet from the server */
  deletePet(id: number): Observable<Pet> {
    const url = `${this.petsUrl}/${id}`;

    return this.http.delete<Pet>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted Pet id=${id}`)),
      catchError(this.handleError<Pet>('deletePet'))
    );
  }

  /** PUT: update the Pet on the server */
  updatePet(Pet: Pet): Observable<any> {
    return this.http.put(this.petsUrl, Pet, this.httpOptions).pipe(
      tap((_) => this.log(`updated Pet id=${Pet.id}`)),
      catchError(this.handleError<any>('updatePet'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PetService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PetService: ${message}`);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
