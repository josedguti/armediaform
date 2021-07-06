import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postData(data: any) {
    return this.http.post<any>('https://armedia-json-server.herokuapp.com/posts', data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getData(){
    return this.http.get<any>('https://armedia-json-server.herokuapp.com/posts')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
