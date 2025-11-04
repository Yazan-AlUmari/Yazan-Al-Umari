// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IContent } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private itemsUrl = 'api/items';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Read: Get all items with pagination and sorting
  getItems(page: number = 1, pageSize: number = 10, sort: string = 'id'): Observable<IContent[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('sort', sort);
    return this.http.get<IContent[]>(this.itemsUrl, { params }).pipe(
      tap(_ => this.log('fetched items')),
      catchError(this.handleError<IContent[]>('getItems', []))
    );
  }

  // Read: Get a single item by ID
  getItemById(id: number): Observable<IContent> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<IContent>(url).pipe(
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError<IContent>(`getItem id=${id}`))
    );
  }

  // Add: Add a new item
  addItem(item: IContent): Observable<IContent> {
    return this.http.post<IContent>(this.itemsUrl, item, this.httpOptions).pipe(
      tap((newItem: IContent) => this.log(`added item w/ id=${newItem.id}`)),
      catchError(this.handleError<IContent>('addItem'))
    );
  }

  // Update: Update an existing item
  updateItem(id: number, item: IContent): Observable<any> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.put(url, item, this.httpOptions).pipe(
      tap(_ => this.log(`updated item id=${id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  // Delete: Delete an item by ID
  deleteItem(id: number): Observable<IContent> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.delete<IContent>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<IContent>('deleteItem'))
    );
  }

  private log(message: string) {
    console.log(`DataService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
