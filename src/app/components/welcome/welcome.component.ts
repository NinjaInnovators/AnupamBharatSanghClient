import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
welcomeItem:any;
apiEndPoint:any;
  constructor(
    private crudService:CrudService,
    private tostr:ToastrService
    ) { 
      this.apiEndPoint=environment.API_ENDPOINT;
    }

  ngOnInit(): void {
    this.getWelcomeItem();
  }

  getWelcomeItem(){
    let url = "/api/v1/homewelcome/GetHomeWelcomeSectionList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.welcomeItem =response.data;
          
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }

}
