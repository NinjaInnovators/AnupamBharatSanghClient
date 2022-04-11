import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-home-welcome-section',
  templateUrl: './manage-home-welcome-section.component.html',
  styleUrls: ['./manage-home-welcome-section.component.css']
})
export class ManageHomeWelcomeSectionComponent implements OnInit {
  homeWelcomeSectionForm: FormGroup;  
  homeWelcomeSectionList: any;  
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
    this.getHomeWelcomeSectionList();
    this.setHomeWelcomeSectionForm();      
    this.authService.user.subscribe(x=>this.userId=x.id);    
  }

  getHomeWelcomeSectionList() {      
    let url = "/api/v1/homewelcome/GetHomeWelcomeSectionList";     
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)        {          
          this.homeWelcomeSectionList =response.data;
           this.homeWelcomeSectionForm.patchValue({
              Id:this.homeWelcomeSectionList.Id,
              Title: this.homeWelcomeSectionList.Title,     
              WelcomeSectionImage:this.apiEndPoint+this.homeWelcomeSectionList.WelcomeSectionImage, 
              Description:this.homeWelcomeSectionList.Description,
              ButtonText:this.homeWelcomeSectionList.ButtonText,
              ButtonLink:this.homeWelcomeSectionList.ButtonLink,
              VideoButtonLink:this.homeWelcomeSectionList.VideoButtonLink
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
    return this.homeWelcomeSectionForm.controls;
  }

  setHomeWelcomeSectionForm(): void {
    this.homeWelcomeSectionForm = this.fb.group({
      Id:[0],
      Title: ["", Validators.required],  
      SubTitle: ["", Validators.required], 
      WelcomeSectionImage:["assets/images/no-product.jpg",Validators.required],    
      Description:["",Validators.required],
      ButtonText:["",Validators.required],
      ButtonLink:[""],
      VideoButtonLink:[""]
    });
  }


  addHomeWelcomeSection() { 
    
    if(this.homeWelcomeSectionForm.value.Id>0) 
    this.isEdit=true;
    else
    this.isEdit=false;
    if (this.isEdit == false) {      
       if (!this.homeWelcomeSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.homeWelcomeSectionForm);        
       return;
     }
      let url = "/api/v1/homewelcome/CreateUpdateHomeWelcome";
      this.crudService.saveData(url, this.homeWelcomeSectionForm.value).subscribe(
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
       if (!this.homeWelcomeSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.homeWelcomeSectionForm);      
       return;
     }
      let url = "/api/v1/homewelcome/CreateUpdateHomeWelcome"      
      this.crudService.saveData(url, this.homeWelcomeSectionForm.value).subscribe(
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


  onSelectFile(evt: any) {
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        var base64 = e.target.result;
        this.homeWelcomeSectionForm.controls['WelcomeSectionImage'].setValue(base64);
      };
    }
    reader.readAsDataURL(evt.target.files[0]);
  }

}
