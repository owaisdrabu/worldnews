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

  getHeadlines(): Observable<any> {
    return this.http.get(this.headlines);
  }

  getSources(): Observable<any> {
    return this.http.get(this.sources);
  }

  getCountries(): Observable<any> {
    return this.http.get('./assets/countries.json');
  }

  getByCountry(country): Observable<any> {
    let c = country
    let api = this.host + this.endpoint1 + "country=" + c + "&apiKey=" + this.api;
    return this.http.get(api);
  }
  cors = "https://cors-anywhere.herokuapp.com";
  getWeather(lat, lon, options): Observable<any> {
    console.log("aaaa" + lat + ',' + lon)
    return this.http.get(this.cors +
      '/https://api.darksky.net/forecast/69dffd31b8b2b9ae86aae57b66a82e2e/' + lat + "," + lon, options);
  }


}
