import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient
  ) { }
  host = "https://newsapi.org/v2/top-headlines?";
  country = "us"; 
  api = "786302619ec14f11a7c39312cbf4da5b";

  headlines= this.host + "country="+this.country+"&apiKey="+this.api;

  getHeadlines(options):Observable<any>{
    return this.http.get(this.headlines, options)
  }

 
}
