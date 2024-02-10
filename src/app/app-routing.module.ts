import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { FileSearchComponent } from './file-search/file-search.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ViewFileComponent } from './view-file/view-file.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegistrationComponent},
  {path:'fileSearch',component:FileSearchComponent},
  {path:'fileUpload',component:FileUploadComponent},
  {path:'viewFile',component:ViewFileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
