import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-cause',
  templateUrl: './home-cause.component.html',
  styleUrls: ['./home-cause.component.css']
})
export class HomeCauseComponent implements OnInit {

  homeCausesSectionData:any;
  causesList:any;
  apiEndPoint:any;
  constructor(
    private crudService:CrudService,
    private tostr:ToastrService
    ) {
      this.apiEndPoint=environment.API_ENDPOINT;
     }

  ngOnInit(): void {
    this.getHomeCausesSection();
    this.getCausesList();
  }

  getHomeCausesSection()
  {
    let url = "/api/v1/homecausessection/GetHomeCausesSectionList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.homeCausesSectionData =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }
  getCausesList(){
    let url = "/api/v1/homecauses/GetHomeCausesList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.causesList =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }

}
