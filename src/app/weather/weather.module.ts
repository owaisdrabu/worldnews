import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeatherPageRoutingModule } from './weather-routing.module';

import { WeatherPage } from './weather.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // WeatherPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: WeatherPage
      }
    ])
  ],
  declarations: [WeatherPage]
})
export class WeatherPageModule {}
