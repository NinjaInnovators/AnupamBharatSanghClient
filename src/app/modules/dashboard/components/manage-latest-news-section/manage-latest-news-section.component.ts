import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-latest-news-section',
  templateUrl: './manage-latest-news-section.component.html',
  styleUrls: ['./manage-latest-news-section.component.css']
})
export class ManageLatestNewsSectionComponent implements OnInit {
 
  latestNewsSectionForm: FormGroup;  
  latestNewsSectionList: any;  
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
    this.getLatestNewsSectionList();
    this.setLatestNewsSectionForm();      
    this.authService.user.subscribe(x=>this.userId=x.id);    
  }

 
  get f() {
    return this.latestNewsSectionForm.controls;
  }

  setLatestNewsSectionForm(): void {
    this.latestNewsSectionForm = this.fb.group({
      Id:[0],
      LeftTitle: ["", Validators.required],         
      RightTitle:["",Validators.required],
      SectionImage:["assets/images/no-product.jpg",Validators.required],
      Description:["",Validators.required],
    });
  }

  getLatestNewsSectionList() {         
    let url = "/api/v1/latestnewssection/GetLatestNewsSectionList";     
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200) {          
          this.latestNewsSectionList =response.data;
           this.latestNewsSectionForm.patchValue({
              Id:this.latestNewsSectionList.Id,
              LeftTitle: this.latestNewsSectionList.LeftTitle,              
              RightTitle:this.latestNewsSectionList.RightTitle,
              SectionImage:this.latestNewsSectionList.SectionImage,
              Description:this.latestNewsSectionList.Description
            });         
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }
       
      }
    );
  }
  

  addLatestNewsSection() {      
    if(this.latestNewsSectionForm.value.Id>0) 
    this.isEdit=true;
    else
    this.isEdit=false;
    if (this.isEdit == false) {   
      this.latestNewsSectionForm.patchValue({
        Id:0
      })
       if (!this.latestNewsSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.latestNewsSectionForm);        
       return;
     }
      let url = "/api/v1/latestnewssection/CreateUpdateLatestNewsSection";
      this.crudService.saveData(url, this.latestNewsSectionForm.value).subscribe(
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
       if (!this.latestNewsSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.latestNewsSectionForm);      
       return;
     }
      let url = "/api/v1/latestnewssection/CreateUpdateLatestNewsSection"      
      this.crudService.saveData(url, this.latestNewsSectionForm.value).subscribe(
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
        this.latestNewsSectionForm.controls['SectionImage'].setValue(base64);
      };
    }
    reader.readAsDataURL(evt.target.files[0]);
  }

}
