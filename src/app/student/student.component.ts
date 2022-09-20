import { AfterViewInit, Component, Inject, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ExcelsheetService } from '../services/excelsheet.service';
import { CoursesEntities, User } from '../model/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: []
})
export class StudentComponent implements OnInit, AfterViewInit {
  users!: User[];
  courses!: CoursesEntities[];
  id: any;
  page!: number;
  itemsPerPage: any;
  paginateOrLevels: any;
  @ViewChild('paginator') paginator!: MatPaginator;
  resultsLength: any;
  selectedFiles!: any;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos!: Observable<any>


  // get data(): User[] {
  //     return this.users;
  // }

  @Input() set data(_value: User[]) {
    //   this.users = value.filter(p => p.status != "hideCompleted");
     //this.pendingUser=[...value];
    // console.log(this.users);
    this.loadAll();
   

  }


  constructor(private excelsheetSrvice: ExcelsheetService, private matDialog: MatDialog) {

  }

  ngOnInit(): void {
    this.itemsPerPage = 2;
    this.page = 0;
    this.resultsLength = 100;
    this.loadAll();
    // this.fileInfos = this.excelsheetSrvice.getmultipleFiles();
    //this.users
    this.excelsheetSrvice.getUserAll().subscribe(data => {
      this.users = data.filter(p => p.status != "hideCompleted");
      // console.info(this.users);
      //  this.users= data;
    

    });


  }


  downloadFile(fileName: string) {
    this.excelsheetSrvice.getFile(fileName).subscribe(v => {

    })

  }





  test(user: any) {


    let selectedUser = this.users.find(p => p.id === user.id);


    if (selectedUser) {
      //    console.info(selectedUser);
      selectedUser.status = user.status;
      // if (selectedUser.status === "completed") { 
      //  this.users=[];
      // }

    }

  }

  onHidenSubmit(id: any) {
    this.excelsheetSrvice.submitFormhiden(id).subscribe(user => {

      this.updateUserStatusList(user);
    });

  }

  updateUserStatusList(user: any) {
    let selectedUser = this.users.find(p => p.id === user.id);

    if (selectedUser) {
      selectedUser.status = user.status;
      // if (selectedUser.status === "completed") {

      this.users = this.users.filter(p => p.status !== "hideCompleted");


    }
  }

  onOpenDialog(id: any): void {

    let dialogRef = this.matDialog.open(DialogComponent, {
      maxWidth: '97vw',
      width: '4500px',
      height: '3000px',
      panelClass: 'dilog-details',
      data: {
        coursesEntities: this.users.find(value => value.id == id)?.coursesEntities,
        //description: this.users.find(value => value.id == id)?.coursesEntities,
        id: id,
        users: this.users,
        test: this.test,

      },
      disableClose: true
    });
dialogRef.afterClosed().subscribe(r=>{this.loadAll()});

  }

  // onError(_message: string): void {
  //   throw new Error('Method not implemented.');
  // }

  deleteFile(filename: any, id: any) {
    this.excelsheetSrvice.deleteFile(filename, id).subscribe(v => {

      this.loadAll();

    }, error => { console.log(error) });

  }



  displayedColumns: string[] = ['No', "Name", "Subject Of Study", "Matriculation", "actions", "status", "delete", "Files"];

  dataSource = new MatTableDataSource<User>(this.users);

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe((event) => {
      console.log(event)
      this.itemsPerPage = event.pageSize;
      this.page = event.pageIndex;
      this.loadAll();
    });
  }

  loadAll() {
    // this.fileInfos = this.excelsheetSrvice.getmultipleFiles();
    this.excelsheetSrvice
      .query({
        pageNo: this.page,
        pageSize: this.itemsPerPage,


      })
      .subscribe(
        (res: HttpResponse<User[]>) => {
          this.users = res.body ? res.body : [];
          console.log(this.users);

          // @ts-ignore
          this.resultsLength = parseInt(res.headers.get('X-Total-Count')?.toString(), 10);
        },

        // (res: HttpErrorResponse) => this.onError(res.message)
      );
  }
  onDeleteUser(id: any) {
    if (confirm("Are You Soure To Remove Student Number " + id)) {
      console.log("Implement delete functionality here");
      this.excelsheetSrvice.deleteUser(id).subscribe(v => {
        this.loadAll();
      }, error => { console.log(error) });
    }


  }


  selectFiles(event: any, id: number) {
    this.users.find(val => {
      if (val.id === id) {
        val.selectedFiles = true;
        val.userFile = event.target.files;

      }
    })


  }

  uploadfiles(id: any): void {
    this.progress = 0;
    this.users.find(val => {
      if (val.id === id) {
        if (val.userFile) {
          const file: File = val.userFile.item(0);
          this.excelsheetSrvice.uploadfiles(file, id).subscribe(
            (event: any) => {
              val.selectedFiles = false;
              if (event instanceof HttpResponse) {
                this.message = event.body.message;
                // console.log( alert( this.message));
                // alert( this.message);
                //this.fileInfos = this.excelsheetSrvice.getmultipleFiles();
                this.loadAll();
              }
            }, (_err: any) => {
              console.log(_err);
              this.progress = 0;
              if (_err.error && _err.error.message) {
                this.message = _err.error.message;
              } else {
                this.message = 'Could not upload the file!';

              }
              alert(this.message);
              this.currentFile = undefined;

            });


        }
      }
    })

  }

}




