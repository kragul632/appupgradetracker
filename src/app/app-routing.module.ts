import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ViewdataComponent } from './viewdata/viewdata.component';
import { UploadComponent } from './upload/upload.component';
import { AdddataComponent } from './adddata/adddata.component';
import { AddEffortComponent } from './components/add-effort/add-effort.component';

const routes: Routes = [
    { path: 'upload', component: UploadComponent },
    { path: 'viewdata', component: ViewdataComponent },
    { path: 'edit', component: EditComponent },
    { path: 'add', component: AdddataComponent }, 
    {path: 'add-effort', component: AddEffortComponent},
    { path: '', redirectTo: '/viewdata', pathMatch: 'full' }
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
