import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home-events',
  templateUrl: './home-events.component.html',
  styleUrls: ['./home-events.component.css']
})
export class HomeEventsComponent implements OnInit {

  homeEventsList:any;
  constructor( 
    private crudService:CrudService,
    private tostr:ToastrService) 
    { }

  ngOnInit(): void {
    this.getHomeEventsList();
  }

  getHomeEventsList(){
    let url = "/api/v1/homeeventsection/GetHomeEventSectionList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.homeEventsList =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }

}
