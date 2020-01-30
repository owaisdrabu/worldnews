import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {

  weatherCurrently: any = [];
  constructor(
    private service: SharedService
  ) { }

  ngAfterViewInit(){

    let headers = new HttpHeaders({ 'Content-Type': 'application/Json' });
    let options = { headers: headers }
    this.service.getWeather(options)
      .subscribe(
        (res) => {
          console.log(res);
          this.weatherCurrently = res.currently;
        },
        (err) => {
          console.log(err);
        }
      )
  }
  ngOnInit() {
    
  }

}
