import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component'; 
import { CreateComponent } from './create/create.component'; 


const routes: Routes = [];
{ path: '', component: HomeComponent },              
{ path: 'list', component: ListComponent }           


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
