import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, Injectable, OnInit, Optional, Output, QueryList, ViewChild, ViewChildren, EventEmitter, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CourseCompare, CoursesEntities, User,CourseDescriptionEntitiy } from '../model/user';
import { ExcelsheetService } from '../services/excelsheet.service';
import { StudentComponent } from '../student/student.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatTableFilter } from 'mat-table-filter';
import { MatSort } from '@angular/material/sort';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DialogComponent implements OnInit {
  [x: string]: any;
  backupCourses: CoursesEntities[] = [];
  test: any;
 // description:any;
  users!: User[];
  courses!: any[];
  id: any;
  message!:string;
  searchText = '';
  coursecompare!: CourseCompare[];
  innerdataSource = new MatTableDataSource(this.coursecompare);
  @ViewChildren('innerTables') innerTables!: QueryList<MatTable<CourseCompare>>;
  // snameSubFilter = new FormControl('');
  @ViewChild('myTable') myTable!: MatTable<any>;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogref: MatDialogRef<DialogComponent>,
    private excelsheetSrvice: ExcelsheetService,
    private http: HttpClient


  ) {

    this.courses = data.coursesEntities;
  
    this.users = data.users;
    this.test = data.test;
    // this.test2=data.test2;
    this.id = data.id;
    try {
      this.courses.forEach(val => this.backupCourses.push(Object.assign({}, val)));
    }
    catch (ex) {
      console.log(ex);
    }
    // console.log(this.courses)

  }



  ngOnInit(): void {
  console.log(this.backupCourses) 

  }


  public onUpdatecourse(course: CoursesEntities): void {
    this.excelsheetSrvice.updateDataCourse(course).subscribe(result => {
      // show result to user
      // alert(result.message);
      // console.log(result);
      alert("course updated successfully")
    });
    course.inEditMode = false;
  }

  public onCancelEdit(course: CoursesEntities): void {

    const courseIndex = this.courses.findIndex(value => value.id == course.id);
    if (courseIndex !== null && courseIndex != undefined) {
      this.courses[courseIndex] = Object.assign({}, this.backupCourses[courseIndex]);
    }
    course.inEditMode = false;
  }

  isExpansionDetailRow = (i: number, row: Object) => row == this.expandedElement;

  public onSearch(course: CoursesEntities): void {
    this.excelsheetSrvice.getexamandcountry(course.dnameExam, course.country, course.dyesNo).subscribe(res => {
      console.log(course.university);
      this.coursecompare = res;
      this.innerdataSource = new MatTableDataSource(this.coursecompare);
      this.coursecompare;
      console.log(this.coursecompare);

    })

  }
  dataSource = new MatTableDataSource(this.coursecompare);

  //  displayedColumns1: string[] = [ 'id',"snameSub","scountryOfExam","sexamMethod","screditSub","smarkTrans","consNum1" ,"dnameExam","consNum2", "dexamNameAndNum" ,"dyesNo" ,"drecogCredit"," daquiredMark",
  //  "country", "nameOfExaminer", "action"];

  displayedColumns: string[] = ['No', "Subject1", "countryOfExam", "Exam Method", "Credit1", "Mark1", "LFD1", "Subject2", "LFD2", "Exam Number", "Yes|NO", "Credit2", "Mark2", "country", "university", "Examinater", "action"];



  expandedElement!: CourseCompare | null;
  expandedElement1!: CoursesEntities | null;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.innerdataSource.filter = filterValue.trim().toLowerCase();

    this.innerdataSource.filterPredicate = function (record, filter) {
      return record.snameSub.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
    }

  }


  onClose() {
    this.dialogref.close();
  }

  onSubmit(id:any) {
    if (confirm("Are You Soure To the Student Number " + id)) {
      this.excelsheetSrvice.submitForm(this.id).subscribe(user => {

        this.test(user);
        alert("This Student Recognation is All Done");
      },error => { console.log(error) });
    }


  }

  // selectCourse(course: CoursesEntities) {

  // }
  isShown: boolean = false;
  getTooltip(id:any): void {
    console.log('test test');
    console.log(this.backupCourses);
 this.description=this.backupCourses.find(val => val.id == id)?.courseDescriptionEntitiy.description;
 
    console.log(this.description);
//     // put our cases
   this.isShown = ! this.isShown;
 
  }
  showDetail(message:string){
    this.message=message;
   // console.log(this.message)
   //@ts-ignore
    document.getElementById("myDetails").open = true;
    
  }
  getTooltip2(id:any): void {
    this.university=this.backupCourses.find(value => value.id == id)?.university;
    console.log(this.university);
    // put our cases
   // this.isShown = ! this.isShown;
  
  }

  onDeleteCourse(course: any){
    if (confirm("Are You Soure To Remove Course Number " + course.id)) {
    console.log("Implement delete functionality here");
    // window.location.reload();
     this.excelsheetSrvice.deleteCourseById(course.id).subscribe(v => {
      console.log(this.courses);
      console.log(course.id);
     
     let index=this.courses.indexOf(course);
        this.courses.splice(index, 1);
        this.myTable.renderRows();
      }, error => { console.log(error) });
      
   }
  }


}

