import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-home-donation-section',
  templateUrl: './manage-home-donation-section.component.html',
  styleUrls: ['./manage-home-donation-section.component.css']
})
export class ManageHomeDonationSectionComponent implements OnInit {
  homeDonationSectionForm: FormGroup;  
  homeDonationSectionList: any;  
  userId:string;
  url:any;
  updateId: Number;
  isEdit:boolean;
  apiEndPoint:any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private crudService: CrudService,   
    private tostr:ToastrService
  ) {
    this.apiEndPoint=environment.API_ENDPOINT;
  }

  ngOnInit(): void {
    this.getHomeDonationSectionList();
    this.setHomeDonationSectionForm();      
    this.authService.user.subscribe(x=>this.userId=x.id);    
  }

  getHomeDonationSectionList() {      
    let url = "/api/v1/homedonation/GetHomeDonationSectionList";     
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)        {          
          this.homeDonationSectionList =response.data;
           this.homeDonationSectionForm.patchValue({
              Id:this.homeDonationSectionList.Id,
              Title: this.homeDonationSectionList.Title,              
              Description:this.homeDonationSectionList.Description,
              ButtonText:this.homeDonationSectionList.ButtonText,
              ButtonLink:this.homeDonationSectionList.ButtonLink
            });
         
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }
       
      }
    );
  }
  get f() {
    return this.homeDonationSectionForm.controls;
  }

  setHomeDonationSectionForm(): void {
    this.homeDonationSectionForm = this.fb.group({
      Id:[0],
      Title: ["", Validators.required],         
      Description:["",Validators.required],
      ButtonText:["",Validators.required],
      ButtonLink:[""]      
    });
  }


  addHomeDonationSection() {  
    
    if(this.homeDonationSectionForm.value.Id>0) 
    this.isEdit=true;
    else
    this.isEdit=false;
    if (this.isEdit == false) {      
       if (!this.homeDonationSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.homeDonationSectionForm);        
       return;
     }
      let url = "/api/v1/homedonation/CreateUpdateHomeDonation";
      this.crudService.saveData(url, this.homeDonationSectionForm.value).subscribe(
        (response)=>{ 
          if(response.statusCode===201){                   
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
       else if(response.status==302){
                
        this.tostr.warning(response.message,"Anupam Bharat Sangh");
      }
      else{
                
          this.tostr.error(response.message,"Anupam Bharat Sangh");
      }
      });
        
    } else {     
       if (!this.homeDonationSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.homeDonationSectionForm);      
       return;
     }
      let url = "/api/v1/homedonation/CreateUpdateHomeDonation"      
      this.crudService.saveData(url, this.homeDonationSectionForm.value).subscribe(
        (response)=>{
        if(response.statusCode==200){         
          this.updateId =0;         
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
        else if(response.statusCode==302){       
          this.tostr.warning(response.message,"Anupam Bharat Sangh");
                 
        }
        else{                  
          this.tostr.error(response.message,"Error");
        }
      }       
      );
    }
  }

}
