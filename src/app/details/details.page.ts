import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @Input() details:any = [];
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log(this.details);
  }
  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
