import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WshelperService {

  constructor(private http: HttpClient) { }

  get<T>(url: string) {
    return this.http.get<T>(url);
  }

  post<T>(url: string, obj: {}) {
    return this.http.post<T>(url, obj);
  }

  put<T>(url: string, obj: {}, option?: {}) {
    return this.http.put<T>(url, obj, option);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(url);
  }

}
