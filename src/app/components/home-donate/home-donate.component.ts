import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home-donate',
  templateUrl: './home-donate.component.html',
  styleUrls: ['./home-donate.component.css']
})
export class HomeDonateComponent implements OnInit {

  donateItem:any;
  constructor(
    private crudService:CrudService,
    private tostr:ToastrService
    ) { }

  ngOnInit(): void {
    this.getDonateItem();
  }

  getDonateItem(){
    let url = "/api/v1/homedonation/GetHomeDonationSectionList";    
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {        
          this.donateItem =response.data;
          
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }     
      });
  }

}
