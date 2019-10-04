import { map, catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router"
import { UserService } from '../user.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent   {

  constructor(private user: UserService, private http: HttpClient, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit() {
    this.restForm();
  }
  public username = "";
  public password = "";
  restForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.username = "";
    this.password = "";
  }
   onSubmit(username: string, password: string) {
//test@test.com
this.user.login(username,password).subscribe((data) => {
  if (this.user.isLoggedIn) {
    alert(`Success`);

     this.router.navigate(['/home']);
   } else {
     alert('Username or password is incorrect.');
   }
 },
 error => alert( error)
);
    
    // let params = new HttpParams().set('username', this.username).set('password', this.password);
    // this.http.get(this.userAccount.rootpath + '/Account/GetUser', { params: params }).subscribe((res: any[]) => {
    //   console.log(res);
    //   this.userAccount = res;
    //   if (this.userAccount == null)
    //     this.toastr.error("Please enter valid user detail", "Invalid");
    //   this.userservice.userName = this.username;
    //   this.userservice.id = this.userAccount.id;
    //   this.userservice.name= this.userAccount.title;

    //   if (this.userAccount.isTeacher) {
    //     this.toastr.success("Teacher,Welcome to portal", "Success");
    //     this.router.navigate(['./teacher']);
    //   }
    //   else {
    //     this.toastr.success("Student,Welcome to portal", "Success");
    //     this.router.navigate(['./student']);
    //   }
    // });
   

  }

}
