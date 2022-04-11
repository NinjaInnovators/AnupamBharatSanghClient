import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  bannerList:any;
  apiEndPoint:any;
  
  bannerOptions = { 
    items: 1,
    dots: false,
    nav: false,
    loop: true,
    autoplay: 3000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
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
    this.getBannerList();
  }

  getBannerList(){
    let url = "/api/v1/banner/GetBannerList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.bannerList =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }

}
