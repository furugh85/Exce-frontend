import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from '../model/user';
import { CoursesEntities} from '../model/user';
import { createRequestOption } from 'src/request-util (2)';
@Injectable({
  providedIn: 'root'
})
export class ExcelsheetService {
 
  private baseUrl = 'http://localhost:8080';

  constructor(private http:HttpClient) { 
  
  }

  // to upload excelFile and country param
  upload(file: File, country: any,university:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
  
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/user/add?country=${country}&university=${university}`, formData, {
      reportProgress: true,
      responseType: 'json'
     
    });
    return this.http.request(req);
   
  }
  //to save as archive former students
  uploadArchive(file: File, country: any, university:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
  
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/user/add-archive?country=${country}&university=${university}`, formData, {
      reportProgress: true,
      responseType: 'json'
     
    });
    return this.http.request(req);
   
  }

  //to upload multipleFiles trans and program study

  uploadfiles(file: File, id: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/user/uploadMultipleFiles/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

//to get multiple files
  getmultipleFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/files`);
  }
  getFile(fileName:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/files/${fileName}`);
  }

  
//to get all users info from Db 
 public getUserAll(): Observable<User[]> {
    // return this.http.get<User[]>(`${this.baseUrl}/user/all`);
  return this.http.get<User[]>(`${this.baseUrl}/user/pagination-levels?pageNo=0&pageSize=2`);

  }
  public getcoursebyid(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/course/findbyid/${id}`)
    
 }
 //getexamandcountry to make comparision
 public getexamandcountry(dnameExam:string, country:string,dyesNo:string):Observable<any>{
   return this.http.get(`${this.baseUrl}/course/examandcountry?dnameExam=${dnameExam}&country=${country}&dyesNo=${dyesNo}`)
 }
 //UPDATE COURSE
 public updateDataCourse(course: CoursesEntities): Observable<any> {
  return this.http.put<CoursesEntities>(`${this.baseUrl}/course/update`, course)
}
public deleteCourse(courseId:any): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/course/delete/${courseId}`)
}
//to submit if all courses are evaluated
public submitForm(id:any): Observable<any>{
  return this.http.put<any>(`${this.baseUrl}/user/statusCompleted/${id}`,null)
}
//to filter from front but remain in DB
public submitFormhiden(id:any): Observable<any>{
  return this.http.put<any>(`${this.baseUrl}/user/statusHideCompleted/${id}`,null)
}

//to pagination
query(req?: any): Observable<any> {
 // const options = createRequestOption(req);
  return this.http.get<User[]>(`${this.baseUrl}/user/pagination-levels`+'?pageNo='+req.pageNo+'&pageSize='+req.pageSize, { observe: 'response' });
}
deleteFile(filename:any,id:number):Observable<string>{
return this.http.get<string>(`${this.baseUrl}/user/delete-file/${filename}/${id}`)
}
deleteUser(id:any):Observable<any>{
  return this.http.delete<any>(`${this.baseUrl}/user/deleteUser/${id}`)
}

deleteCourseById(id:any):Observable<any>{
  return this.http.delete<any>(`${this.baseUrl}/course/deleteCourse/${id}`)
}


}











  // getFiles1(): Observable<CoursesEntities[]> {
  //   return this.http.get<CoursesEntities[]>(`${this.baseUrl}/user/all`);
   
   
  // }

  // async getAll() {
  //   const response = await this.http.get(`${this.baseUrl}/user/all`).toPromise();
  //   this.store.set(response.data);
  // }
 
  
	
	// 	return this.http.post<string[]>(`${this.baseurl}/file/upload`,formData,{
  //     reportProgress:true,
  //     observe:'events'
  //   });
  //  }
  
  // getFiles():Observable<any>{
  //   return this.http.get(`${this.baseurl}/files`);
 

