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

  host = "https://newsapi.org/v2/";
  endpoint1 = "top-headlines?";
  endpoint2 = "sources?";
  country = "in";
  api = "786302619ec14f11a7c39312cbf4da5b";

  headlines = this.host + this.endpoint1 + "country=" + this.country + "&apiKey=" + this.api;
  sources = this.host + this.endpoint2 + "&apiKey=" + this.api;

  getHeadlines(options): Observable<any> {
    return this.http.get(this.headlines, options);
  }

  getSources(options): Observable<any> {
    return this.http.get(this.sources, options);
  }

  getByCountry(country, options):Observable<any> {
    let c = country
    let api = this.host + this.endpoint1 + "country=" + c + "&apiKey=" + this.api;
    return this.http.get(api, options);
  }


}
