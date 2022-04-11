import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'sponsers',
  templateUrl: './sponsers.component.html',
  styleUrls: ['./sponsers.component.css']
})
export class SponsersComponent implements OnInit {

  // sponsersList=[
  //   "assets/images/clients/1.png",
  //   "assets/images/clients/2.png",
  //   "assets/images/clients/3.png",
  //   "assets/images/clients/4.png",
  //   "assets/images/clients/5.png",
  //   "assets/images/clients/1.png",
  //   "assets/images/clients/2.png"
  // ]

  sponsersList:any;
  apiEndPoint:any;

  sponserOptions = { 
    items: 1,
    dots: true,
    nav: false,
    loop: true,
    autoplay: 3000,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  }; 
  constructor(
    private crudService:CrudService,
    private tostr:ToastrService
  ) {
    this.apiEndPoint=environment.API_ENDPOINT;
   }

  ngOnInit(): void {
    this.getSponserList();
  }

  getSponserList(){
    let url = "/api/v1/sponsers/GetSponserList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.sponsersList =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }

}
