import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatagoryServiceService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCategorys() {
    return this.http.get<CategoryModel>(this.serverUrl + 'api/adminCategorys').pipe(
      catchError(this.handleError)
    );
  }

  getCategory(id: number) {
    return this.http.get<CategoryModel>(this.serverUrl + 'api/adminCategory/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createCategory(blog) {
    return this.http.post<any>(this.serverUrl + 'api/createCategory', blog)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateCategory(blog, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateCategory/' + id, blog)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteCategory/' + id).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    
    return throwError('Something bad happened. Please try again later.');
  }
  
}
