import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewdataComponent } from './viewdata/viewdata.component';

import { Router, RouterModule } from '@angular/router';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { UploadComponent } from './upload/upload.component';
import { HeaderComponent } from './header/header.component';
import { AdddataComponent } from './adddata/adddata.component';
import { EffortTableComponent } from './components/effort-table/effort-table.component';
import { AddEffortComponent } from './components/add-effort/add-effort.component';
import { UploadcsvComponent } from './components/uploadcsv/uploadcsv.component';
import { HomeComponent } from './components/home/home.component';
import { ViewApplicationEffortComponent } from './components/view-application-effort/view-application-effort.component';
import { BasicEffortComponent } from './components/basic-effort/basic-effort.component';
import { BasicEffortSubmitComponent } from './components/basic-effort-submit/basic-effort-submit.component';
import { ApplicationEffortComponent } from './components/application-effort/application-effort.component';
import { AddNewComponent } from './components/add-new/add-new.component';


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
    UploadcsvComponent,
    HomeComponent,
    ViewApplicationEffortComponent,
    BasicEffortComponent,
    BasicEffortSubmitComponent,
    ApplicationEffortComponent,
    AddNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
