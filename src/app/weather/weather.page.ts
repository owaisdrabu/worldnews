import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {

  weatherCurrently: any = [];
  weatherHourly: any = [];
  nextHours: any;
  lat: any;
  lon: any;


  constructor(
    private service: SharedService,
    private geo: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) { }


  testkey(){
    console.log("keytest")
  }

  ngAfterViewInit() {

    this.geo.getCurrentPosition().then(
      (res) => {
        this.lat = res.coords.latitude;
        this.lon = res.coords.longitude;
        console.log(res);
        console.log(this.lat + ',' + this.lon + "AA");
        this.geocoder();
        this.weather();
      }).catch(
        (err) => {
          console.log(err);
        }
      )

    let watch = this.geo.watchPosition();
    watch.subscribe((data) => {
      data.coords.longitude;
      data.coords.latitude;
    });
  }

  geocoder() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(this.lat, this.lon, options)
      .then((result: NativeGeocoderResult[]) => console.log(JSON.stringify(result[0])))
      .catch((error: any) => console.log(error));
  }

  weather() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/Json' });
    let options = { headers: headers }
    this.service.getWeather(this.lat, this.lon, options)
      .subscribe(
        (res) => {
          console.log(res);
          this.weatherCurrently = res.currently;
          console.log(res.currently.time);
          let time = new Date(res.currently.time * 1000);
          console.log(time);
          let hrs = time.getHours();
          let mins = "0" + time.getMinutes();
          let seconds = "0" + time.getSeconds();
          // let formattedTime = hrs + ':' + mins.substr(-2) + ':' + seconds.substr(-2);

          let formattedTime = hrs;
          console.log(formattedTime);
          this.weatherHourly = res.hourly.data.slice(0, 12).map(
            function (value) {
              let time = new Date(value.time * 1000);
              let hrs = time.getHours();
              return {
                "time": hrs,
                "summary": value.summary,
                "icon": value.icon,
                "temperature": value.temperature
              }
            }
          );
          console.log(this.weatherHourly);
        },
        (err) => {
          console.log(err);
        }
      )
  }
  ngOnInit() {

  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ngAfterViewInit();
      event.target.complete();
    }, 2000);
  }
}
