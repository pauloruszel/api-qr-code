import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
  private apiUrl = 'http://localhost:8080/api/v1/qrcode';

  constructor(private http: HttpClient) {}

  geradorQrCode(params: any): Observable<any> {
    if (params.base64 === 'true') {
      return this.http.get(this.apiUrl, {
        params: params,
        responseType: 'text'
      });
    } else {
      return this.http.get(this.apiUrl, {
        params: params,
        responseType: 'blob'
      });
    }
  }
  
}

