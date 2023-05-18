import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'https://pavii2022.azurewebsites.net/api/estudiantes/';
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  post(obj: Estudiante) {
    return this.httpClient.post(this.resourceUrl, obj);
  }
}
