import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Contacto } from '../models/contacto';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactosService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'https://pymes2021.azurewebsites.net/api/contactos/';
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  getById(Id: number) {
    return this.httpClient.get(this.resourceUrl + Id);
  }

  post(obj: Contacto) {
    return this.httpClient.post(this.resourceUrl, obj);
  }
}
