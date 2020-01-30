import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public countries: any ;
  // public countries: any = ['ae', ar ,at, au, be, bg, br,
  //    ca, ch, cn, co, cu, cz, de, eg, fr, gb, gr, hk, hu, id, ie, il, 
  //    in, it, jp, kr, lt, lv, ma, mx, my, ng, nl, no, 
  //    nz, ph, pl, pt, ro, rs, ru, sa, se, sg, si, sk, 
  //    th, tr, tw, ua, us, ve, za]
  public news: any = [];
  constructor(
    private modalController: ModalController,
    private service: SharedService
  ) { }

  onChange($event) {
    let country = $event.target.value;
    console.log($event.target.value);

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.service.getByCountry(country)
      .subscribe(
        (res) => {
          console.log(res.articles);
          this.news = res.articles;
        },
        (err) => {
          console.log(err);
        }
      )
  }
  ionViewWillEnter() {
    console.log(this.countries);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.service.getHeadlines()
      .subscribe(
        (res) => {
          this.news = res.articles;
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      )

      this.service.getCountries()
      .subscribe(
        (res)=>{
          this.countries = res;
          console.log(res);
        },
        (err)=>{
          console.log(err);
        }

      )

    this.service.getSources()
      .subscribe(
        (res) => {
          console.log(res.sources);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  onClickCard(id){
    console.log('card' + id);
  }
}
