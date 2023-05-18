import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'https://pav2.azurewebsites.net/api/libros/';
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  getById(Id: number) {
    return this.httpClient.get(this.resourceUrl + Id);
  }

  put(Id: number, obj: Libro) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }
}
