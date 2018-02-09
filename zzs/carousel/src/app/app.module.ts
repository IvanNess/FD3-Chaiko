import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CarouselVideoComponent } from './carouselVideo.component';
import { VideoDatasource } from './videoProvider.datasource';
import { SafePipe } from './safePipe.pipe';

import { SlickModule } from 'ngx-slick';

@NgModule({
  declarations: [
    AppComponent,
    CarouselVideoComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    SlickModule.forRoot()
  ],
  providers: [VideoDatasource],
  bootstrap: [AppComponent],
})
export class AppModule { }
