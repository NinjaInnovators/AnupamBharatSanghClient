import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-happenings',
  templateUrl: './happenings.component.html',
  styleUrls: ['./happenings.component.css']
})
export class HappeningsComponent implements OnInit {

  eventList:any;
  apiEndPoint:any;
  constructor(
    private crudService:CrudService,
    private tostr:ToastrService
  ) { 
    this.apiEndPoint=environment.API_ENDPOINT;
  }

  ngOnInit(): void {
    this.getEventList();
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
