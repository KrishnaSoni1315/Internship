import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ImageServiceService} from './image-service.service';
import {FormsModule} from '@angular/forms';
import { ImageSearchComponent } from './image-search/image-search.component';
import { SearchHistoryComponent } from './search-history/search-history.component';



@NgModule({
  declarations: [
    AppComponent,
    ImageSearchComponent,
    SearchHistoryComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ImageServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
