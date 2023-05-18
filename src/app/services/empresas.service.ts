import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Empresa } from '../models/empresa';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'https://pav2.azurewebsites.net/api/empresas/';
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  post(obj: Empresa) {
    return this.httpClient.post(this.resourceUrl, obj);
  }
}
