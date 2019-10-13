import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeliveryModule } from '../delivery-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarterComponent } from './starter.component';
import { StarterRoutes } from './starter.routing';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    DeliveryModule,
    FlexLayoutModule,
    RouterModule.forChild(StarterRoutes),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2VtLRJ3-GMn-ExW0atA2du5TjpRE4fz4'
    })
  ],
  declarations: [StarterComponent]
})
export class StarterModule {}
