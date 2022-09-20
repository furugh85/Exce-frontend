import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ExcelsheetComponent } from './excelsheet/excelsheet.component';
import { StudentComponent } from './student/student.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material/material.module';
import { MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
   ExcelsheetComponent,
   StudentComponent,
   DialogComponent,
   FooterComponent,
  
  
  ],
  entryComponents:[DialogComponent],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserModule,
   Ng2SearchPipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
