import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Barrio } from '../models/barrio';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BarriosService {

  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'https://pavii2022.azurewebsites.net/api/barrios';
  }

    get() {
      return this.httpClient.get(this.resourceUrl);
    }
}