import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home-counter',
  templateUrl: './home-counter.component.html',
  styleUrls: ['./home-counter.component.css']
})
export class HomeCounterComponent implements OnInit {

  homeEventCountSectionList:any;
  constructor( private crudService:CrudService,
    private tostr:ToastrService) { }

  ngOnInit( ): void {
    this.getHomeEventCountSectionList();
  }

  getHomeEventCountSectionList(){
    let url = "/api/v1/homeeventcount/GetHomeEventCountSectionList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.homeEventCountSectionList =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }
}
