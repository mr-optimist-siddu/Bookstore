import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Nodejs API
  REST_API: string = 'http://localhost:8000';
  //Set Http Headers.
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private httpClient: HttpClient) {
    this.REST_API = 'https://localhost:8000';
  }
  //add records
  AddBook(data: Book): Observable<any>{
    let API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
  }

  //get all books
  getBooks() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  //get Single books
  getBook(id: any): Observable<any>{
    let API_URL = `${this.REST_API}/read-book/${id}`;
    return this.httpClient.get(API_URL, { headers:this.httpHeaders }).pipe(map((res:any)=> {
      return res || {}
    }),
      catchError(this.handleError)
    )
  }

  //Update Book Data
  updateBook(id: any, data: any): Observable<any>{
    let API_URL = `${this.REST_API}/update-book/${id}`;
    return this.httpClient.patch(API_URL, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }

  //Delete book data
  deleteBook(id: any, data: any): Observable<any>{
    let API_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //handle client error
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return (errorMessage);
  }
}
