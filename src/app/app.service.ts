import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, debounceTime } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class AppService {

constructor(private httpClient: HttpClient) { }
env = environment;
apiUrl = this.env.apiUrl;
tokenTag;

private setHeaders(): HttpHeaders {
  const headersConfig = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
     Accept: 'application/json'
  });
  if (this.getToken()) {
 //   headersConfig.append('Authorization', this.getToken());
  }
  return headersConfig;
}

private handleError(error: HttpErrorResponse) {
  const err = {
     status: error.status + ': ' + error.statusText,
    statusCode: error.status,
    message: error.error.detail ? error.error.detail : ''
  };
  return throwError(err);
}

getToken(): string {
  return window.localStorage[this.tokenTag];
}


public get(path: string, parameters: HttpParams = new HttpParams()): Observable<any> {
  return this.httpClient.get(this.apiUrl + encodeURIComponent(path), { headers: this.setHeaders(), params: parameters }).pipe(
    map((res: any) => {
      return res;
    }),
    catchError(this.handleError)
  );
}

}
