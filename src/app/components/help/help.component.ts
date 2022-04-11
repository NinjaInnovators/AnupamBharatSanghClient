import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  helpData:any;
  constructor(
    private crudService:CrudService,
    private tostr:ToastrService
    ) {
      
     }

  ngOnInit(): void {
    this.getHelpList();
  }

  getHelpList(){
    let url = "/api/v1/help/GetHelpList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.helpData =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }

}
