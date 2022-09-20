import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExcelsheetComponent } from '../excelsheet/excelsheet.component';



const routes: Routes = [
  {path:'home',component:ExcelsheetComponent},



];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),   
  ],
  exports: [
  RouterModule
  ],
})
export class AppRoutingModule { }
