// app-routing.module.ts - Defines routes for navigation
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },  // Default to list
  { path: 'list', component: ListComponent },
  { path: 'form', component: FormComponent },
  { path: 'form/:id', component: FormComponent }  // For editing with ID
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
