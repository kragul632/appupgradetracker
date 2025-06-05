import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewdataComponent } from './viewdata/viewdata.component';

import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { UploadComponent } from './upload/upload.component';
import { HeaderComponent } from './header/header.component';
import { AdddataComponent } from './adddata/adddata.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewdataComponent,
    EditComponent,
    UploadComponent,
    HeaderComponent,
    AdddataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
