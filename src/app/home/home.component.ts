import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router"
import { UserService } from '../user.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent   {
  
  constructor(private user: UserService, private http: HttpClient, private toastr: ToastrService, private router: Router) {}
  
private list=[];
private allItems=[];
  ngOnInit() {
             this.user.getMyTasks().subscribe((result) =>{ 
              this.list= result;
              this.allItems=this.list;
            });
  }

 
  searchbyTitle(text){
    this.list=this.allItems.filter(it => {
      text = text.toLowerCase();
      return it.title.toLowerCase().includes(text)});
  } 
  onsubmittask(title,description){
    this.user.addTask(title,description).subscribe(      );
    
  }
}
