import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-home-event-count-section',
  templateUrl: './manage-home-event-count-section.component.html',
  styleUrls: ['./manage-home-event-count-section.component.css']
})
export class ManageHomeEventCountSectionComponent implements OnInit {
  homeEventCountSectionForm: FormGroup;
  searchHomeEventCountSectionForm: FormGroup;
  homeEventCountSectionList: any;
  totalHomeEventCountSection: any;
  isView: boolean = true;
  isEdit: boolean = false;
  status?: boolean;
  userId:string;
  url:any;
  updateId: Number;
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
    this.setHomeEventCountSectionForm();    
    this.setsearchHomeEventCountSectionForm();
    this.searchhomeEventCountSection();
    this.authService.user.subscribe(x=>this.userId=x.id);
  }

  get f() {
    return this.homeEventCountSectionForm.controls;
  }

  setHomeEventCountSectionForm(): void {
    this.homeEventCountSectionForm = this.fb.group({
      Id:[0],
      EventCaption: ["", Validators.required],     
      EventCount:["",Validators.required]
    });
  }

  setsearchHomeEventCountSectionForm(): void {
    this.searchHomeEventCountSectionForm = this.fb.group({
      EventCaption: [null],
      IsActive: [""],
    });
  }

  searchhomeEventCountSection() {      
    const eventCaption = this.searchHomeEventCountSectionForm.value.Title;
    let url = "/api/v1/homeeventcount/GetHomeEventCountSectionListForAdmin?eventCaption=";   
    if (eventCaption != null && eventCaption != "") {
      url += eventCaption
    }
    url+='&Status=';
    if (this.searchHomeEventCountSectionForm.value.IsActive == "1") {
      this.status = true;  
      url+=this.status;   
    }
    if (this.searchHomeEventCountSectionForm.value.IsActive == "0") {
      this.status = false;   
      url+=this.status;   
    }   

    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
          this.totalHomeEventCountSection = response.count;
          this.homeEventCountSectionList =response.data;
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }
       
      }
    );
  }

  add() {
    this.isEdit=false;
    this.isView = false;
  }

  addHomeEventCountSection() {    

    if (this.isView == false && this.isEdit == false) {  
      this.homeEventCountSectionForm.patchValue({
        Id:0
      }) ;  
       if (!this.homeEventCountSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.homeEventCountSectionForm);        
       return;
     }
      let url = "/api/v1/homeeventcount/CreateUpdateHomeEventCount";
      this.homeEventCountSectionForm.value.EventCount=+this.homeEventCountSectionForm.value.EventCount;
      this.crudService.saveData(url, this.homeEventCountSectionForm.value).subscribe(
        (response)=>{ 
          if(response.statusCode===201){
          this.homeEventCountSectionForm.reset();
          this.isView = true;
          this.searchhomeEventCountSection();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
       else if(response.status==302){
        this.homeEventCountSectionForm.reset();
        this.isView = true;
        this.searchhomeEventCountSection();
        this.tostr.warning(response.message,"Anupam Bharat Sangh");
      }
      else{
          this.homeEventCountSectionForm.reset();          
          this.tostr.error(response.message,"Anupam Bharat Sangh");
      }
      });
        
    } else {     
       if (!this.homeEventCountSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.homeEventCountSectionForm);      
       return;
     }
      let url = "/api/v1/homeeventcount/CreateUpdateHomeEventCount"      
      this.homeEventCountSectionForm.value.EventCount=+this.homeEventCountSectionForm.value.EventCount;
      this.crudService.saveData(url, this.homeEventCountSectionForm.value).subscribe(
        (response)=>{
        if(response.statusCode==200){
          this.homeEventCountSectionForm.reset(); 
          this.updateId =0;
          this.isView = true;
          this.searchhomeEventCountSection();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
        else if(response.statusCode==302){        
          this.tostr.warning(response.message,"Anupam Bharat Sangh");
          this.homeEventCountSectionForm.reset();
          this.isView = true;
          this.searchhomeEventCountSection();
        }
        else{
          this.homeEventCountSectionForm.reset();          
          this.tostr.error(response.message,"Error");
        }
      }       
      );
    }
  }

  editHomeEventCountSection(data: any) {   
    this.isView = false;
    this.isEdit = true;
    this.updateId = data.Id;
    this.homeEventCountSectionForm.patchValue({
      Id:data.Id,
      EventCaption: data.EventCaption,       
      EventCount:data.EventCount
    });
  }

  reset() {
    this.isView = true;
    this.homeEventCountSectionForm.reset();
  }

  deleteHomeEventCountSection(stId: any) {    
    const sttId = stId.Id;
    let url = "/api/v1/homeeventcount/DeleteHomeEventCountSection?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchhomeEventCountSection();
        this.tostr.success(response.message,"Success");
        }
        else
        {         
         this.tostr.error(response.message,"Error");
        }
      },
     
    );
  }
  changeStatus(stId: any) {    
    const sttId = stId.Id;
    let url = "/api/v1/homeeventcount/ChangeHomeEventCountSectionStatus?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchhomeEventCountSection();
        this.tostr.success(response.message,"Success");
        }
        else
        {         
         this.tostr.error(response.message,"Error");
        }
      });
  }

 

}
