import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public news: any = [];
  constructor(
    private service: SharedService
  ) {}

  ionViewWillEnter(){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.service.getHeadlines(options)
    .subscribe(
      (res)=>{
        this.news = res.articles;
        console.log(res);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
