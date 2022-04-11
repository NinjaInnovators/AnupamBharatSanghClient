import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-our-works',
  templateUrl: './our-works.component.html',
  styleUrls: ['./our-works.component.css']
})
export class OurWorksComponent implements OnInit {
  causesList:any;
  apiEndPoint:any;
  constructor(
    private crudService:CrudService,
    private tostr:ToastrService
    ) {
      this.apiEndPoint=environment.API_ENDPOINT;
     }

  ngOnInit(): void {
    this.getCausesList();
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
