import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewdataComponent } from './viewdata/viewdata.component';

import { Router, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { UploadComponent } from './upload/upload.component';
import { HeaderComponent } from './header/header.component';
import { AdddataComponent } from './adddata/adddata.component';
import { EffortTableComponent } from './components/effort-table/effort-table.component';
import { AddEffortComponent } from './components/add-effort/add-effort.component';
import { UploadcsvComponent } from './components/uploadcsv/uploadcsv.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewdataComponent,
    EditComponent,
    UploadComponent,
    HeaderComponent,
    AdddataComponent,
    EffortTableComponent,
    AddEffortComponent,
    UploadcsvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
