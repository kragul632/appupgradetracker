import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ViewdataComponent } from './viewdata/viewdata.component';
import { UploadComponent } from './upload/upload.component';
import { AdddataComponent } from './adddata/adddata.component';
import { AddEffortComponent } from './components/add-effort/add-effort.component';
import { UploadcsvComponent } from './components/uploadcsv/uploadcsv.component';
import { EffortTableComponent } from './components/effort-table/effort-table.component';
import { HomeComponent } from './components/home/home.component';
import { ViewApplicationEffortComponent } from './components/view-application-effort/view-application-effort.component';
import { BasicEffortComponent } from './components/basic-effort/basic-effort.component';
import { BasicEffortSubmitComponent } from './components/basic-effort-submit/basic-effort-submit.component';
import { ApplicationEffortComponent } from './components/application-effort/application-effort.component';
import { AddNewComponent } from './components/add-new/add-new.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'viewdata', component: ViewdataComponent },
    { path: 'edit', component: EditComponent },
    { path: 'add', component: AdddataComponent }, 
    {path: 'add-effort', component: AddEffortComponent},
    { path: '', redirectTo: '/viewdata', pathMatch: 'full' },
  { path: 'upload-csv', component: UploadcsvComponent },
  { path: 'effort-table', component: EffortTableComponent },
  {path: 'view-application-effort', component: ViewApplicationEffortComponent},
  { path: 'add-basic-effort', component: BasicEffortComponent},
  { path: 'edit-effort/:id', component: BasicEffortSubmitComponent },


    { path: 'application-effort', component: ApplicationEffortComponent },
    { path: 'add-new', component: AddNewComponent },
  
  ];
  
  
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
