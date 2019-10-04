import { map, catchError, share } from 'rxjs/operators';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootpath = "http://engine-staging.viame.ae/assessment";
  
  userName: string = "";
   name: string = "";
   id: string = "";
  constructor(private http:HttpClient) {
  } 
  
  login(username,password):any{ 
this.http.post<any>(`${this.rootpath}/login`,
 `{users: {email: "test@test.com", password: "123"}}`)
.pipe(map(user => {
  alert(`user.token`);

  if (user && user.token) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }),
  catchError(this.handleError)
); 
}  
//a6ad00ac113a19d953efb91820d8788e2263b28a
gettasks(token):any{ 
this.http.get(`${this.rootpath}/user/list?x-access-token=a6ad00ac113a19d953efb91820d8788e2263b28a` )
.pipe(map(user => {
  alert('eeok');

  }),
  catchError(this.handleError)
); 
}

getMyTasks():any{
  const  headers = new  HttpHeaders().set('x-access-token','a6ad00ac113a19d953efb91820d8788e2263b28a');

  return this.http.get("https://engine-staging.viame.ae/assessment/user/list", {headers});

}

addTask(title,description):any{
  const  headers = new  HttpHeaders().set('x-access-token','a6ad00ac113a19d953efb91820d8788e2263b28a');
  // let headers = new Headers();
  // headers.append('Content-Type','application/json');
var  data={todolist: {
   title:title,
  description:description,
  status:1
  }};
  
  return this.http.post<todolist>('http://engine-staging.viame.ae/assessment/user/task',data,{ headers: headers})
      .subscribe(
          res =>{
              console.log(res);
          },
          err => {
              console.log(err.message);
          }
      )

}

isLoggedIn() {
  if (localStorage.getItem('currentUser')) {
    return true;
  }
  return false;
}
  handleError(error: HttpErrorResponse):any {
  if (error.error instanceof ErrorEvent) {

    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {

    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
  }
}

}

export interface todolist  {
  title: string,
  description: string,
  status:number,
}