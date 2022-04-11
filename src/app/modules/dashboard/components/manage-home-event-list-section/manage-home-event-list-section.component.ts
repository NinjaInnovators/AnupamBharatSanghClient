import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-home-event-list-section',
  templateUrl: './manage-home-event-list-section.component.html',
  styleUrls: ['./manage-home-event-list-section.component.css']
})
export class ManageHomeEventListSectionComponent implements OnInit {
  homeEventListSectionForm: FormGroup;  
  homeEventListSectionList: any;  
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
    this.getHomeEventListSectionList();
    this.setHomeEventListSectionForm();      
    this.authService.user.subscribe(x=>this.userId=x.id);    
  }

  get f() {
    return this.homeEventListSectionForm.controls;
  }

  setHomeEventListSectionForm(): void {
    this.homeEventListSectionForm = this.fb.group({
      Id:[0],
      EventListTitle: ["", Validators.required],    
      EventListSectionImage:["assets/images/no-product.jpg",Validators.required],     
      EventListDescription:["",Validators.required]      
    });
  }

  getHomeEventListSectionList() {  
    debugger;       
    let url = "/api/v1/homeventlistsection/GetHomeEventListSectionForAdmin";     
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200) {          
          this.homeEventListSectionList =response.data;
           this.homeEventListSectionForm.patchValue({
              Id:this.homeEventListSectionList.Id,
              EventListTitle: this.homeEventListSectionList.EventListTitle,              
              EventListDescription:this.homeEventListSectionList.EventListDescription,
              EventListSectionImage:this.homeEventListSectionList.EventListSectionImage
            });         
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }
       
      }
    );
  }

  addHomeEventListSection() {    
    if(this.homeEventListSectionForm.value.Id>0) 
    this.isEdit=true;
    else
    this.isEdit=false;
    if (this.isEdit == false) {   
      this.homeEventListSectionForm.patchValue({
        Id:0
      }) ;  
       if (!this.homeEventListSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.homeEventListSectionForm);        
       return;
     }
      let url = "/api/v1/homeventlistsection/CreateUpdateHomeEventListSection";
      this.crudService.saveData(url, this.homeEventListSectionForm.value).subscribe(
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
       if (!this.homeEventListSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.homeEventListSectionForm);      
       return;
     }
      let url = "/api/v1/homeventlistsection/CreateUpdateHomeEventListSection"      
      this.crudService.saveData(url, this.homeEventListSectionForm.value).subscribe(
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
        this.homeEventListSectionForm.controls['EventListSectionImage'].setValue(base64);
      };
    }
    reader.readAsDataURL(evt.target.files[0]);
  }

}
