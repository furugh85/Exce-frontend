
import { Injectable } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { EntityState, EntityStore, ID, QueryEntity, StoreConfig } from "@datorama/akita";

// }
export interface User {
    id: ID;
    name:string;
    matrikelnummer: string;
    studiengang: string;
    coursesEntities:any;
    status:string;
    selectedFiles:boolean;
    userFile:any;
    files:any[];
 
  }
export interface CoursesEntities {
    id: ID;
    consNum1: string;
    consNum2: string;
    daquiredMark: string;
    dexamNameAndNum: string;
    dnameExam: string;
    drecogCredit: string;
    dyesNo: string;
    nameOfExaminer: string;
    scountryOfExam: string;
    screditSub: string;
    sexamMethod: string;
    smarkTrans: string;
    snameSub: string;
    country:string;
    university:string;
    inEditMode:boolean;
    turnToEdit:boolean;
    compare:any[];
    coursecompare: CourseCompare[] | MatTableDataSource<CourseCompare>;
    courseDescriptionEntitiy:CourseDescriptionEntitiy;
    description:string;
   
  }

  export interface CourseCompare {
    id: ID;
    consNum1: string;
    consNum2: string;
    daquiredMark: string;
    dexamNameAndNum: string;
    dnameExam: string;
    drecogCredit: string;
    dyesNo: string;
    nameOfExaminer: string;
    scountryOfExam: string;
    screditSub: string;
    sexamMethod: string;
    smarkTrans: string;
    snameSub: string;
    country:string;
    university:string;
    inEditMode:boolean;
    
   
   
  }
  export interface CourseDescriptionEntitiy{
    id:ID;
    examnumber:string;
    description:string;
  }


  
  

 
