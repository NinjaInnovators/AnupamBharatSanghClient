import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-get-involved',
  templateUrl: './get-involved.component.html',
  styleUrls: ['./get-involved.component.css']
})
export class GetInvolvedComponent implements OnInit {
  volunteerData:any;
  volunteerList:any;
  apiEndPoint:any;

  constructor(
    private crudService:CrudService,
    private tostr:ToastrService
    ) {
      this.apiEndPoint=environment.API_ENDPOINT;
     }

  ngOnInit(): void {
    this.getVolunteerSectionList();
    this.getVolunteerList()
  }

  getVolunteerSectionList(){
    let url = "/api/v1/volunteerssection/GetVolunteersSectionList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.volunteerData =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }

  getVolunteerList(){
    let url = "/api/v1/volunteer/GetVolunteersList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.volunteerList =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }

}
