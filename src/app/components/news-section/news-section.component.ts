import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-section',
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.css']
})
export class NewsSectionComponent implements OnInit {

  newsSection:any;
  apiEndPoint:any;
  latestNewsList:any;
  
  constructor(
    private crudService: CrudService,   
    private tostr:ToastrService
    ) { 
      this.apiEndPoint=environment.API_ENDPOINT;
    }

  ngOnInit(): void {
    this.getNewsSection();
    this.getLatestNewsList();
  }
  getNewsSection(){
    let url = "/api/v1/latestnewssection/GetLatestNewsSectionList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.newsSection =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }

  getLatestNewsList(){
    let url = "/api/v1/latestnews/GetLatestNewsList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.latestNewsList =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }
}
