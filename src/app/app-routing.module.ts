import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExcelsheetComponent } from './excelsheet/excelsheet.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {path:'', redirectTo:"/home", pathMatch:"full"},
  {path:'home',component:ExcelsheetComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
