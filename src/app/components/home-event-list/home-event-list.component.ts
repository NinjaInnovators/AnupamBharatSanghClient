import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-event-list',
  templateUrl: './home-event-list.component.html',
  styleUrls: ['./home-event-list.component.css']
})
export class HomeEventListComponent implements OnInit {

  eventListSection:any;
  apiEndPoint:any;
  eventList:any;

  constructor(
    private crudService:CrudService,
    private tostr:ToastrService
  ) {
    this.apiEndPoint=environment.API_ENDPOINT;
   }

  ngOnInit(): void {
   this.getEventListSection();
   this.getEventList();
  }

  getEventListSection(){
    let url = "/api/v1/homeventlistsection/GetHomeEventListSectionList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.eventListSection =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }

  getEventList(){
    let url = "/api/v1/event/GetEventList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.eventList =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }
}
