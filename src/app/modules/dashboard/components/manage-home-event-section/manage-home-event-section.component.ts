import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-home-event-section',
  templateUrl: './manage-home-event-section.component.html',
  styleUrls: ['./manage-home-event-section.component.css']
})
export class ManageHomeEventSectionComponent implements OnInit {
  homeEventSectionForm: FormGroup;
  searchHomeEventSectionForm: FormGroup;
  homeEventSectionList: any;
  totalHomeEventSection: any;
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
    this.setHomeEventSectionForm();    
    this.setsearchHomeEventSectionForm();
    this.searchHomeEventSection();
    this.authService.user.subscribe(x=>this.userId=x.id);
  }

  get f() {
    return this.homeEventSectionForm.controls;
  }

  setHomeEventSectionForm(): void {
    this.homeEventSectionForm = this.fb.group({
      Id:[0],
      EventTitle: ["", Validators.required],     
      EventDescription:["",Validators.required],
      EventIconImage:["",Validators.required],
      EventLinkUrl:[""]
    });
  }

  setsearchHomeEventSectionForm(): void {
    this.searchHomeEventSectionForm = this.fb.group({
      Title: [null],
      IsActive: [""],
    });
  }

  searchHomeEventSection() {      
    const title = this.searchHomeEventSectionForm.value.Title;
    let url = "/api/v1/homeeventsection/GetHomeEventSectionListForAdmin?eventTitle=";   
    if (title != null && title != "") {
      url += title
    }
    url+='&Status=';
    if (this.searchHomeEventSectionForm.value.IsActive == "1") {
      this.status = true;  
      url+=this.status;   
    }
    if (this.searchHomeEventSectionForm.value.IsActive == "0") {
      this.status = false;   
      url+=this.status;   
    }   

    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
          this.totalHomeEventSection = response.count;
          this.homeEventSectionList =response.data;
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

  addHomeEventSection() {       
   
    if (this.isView == false && this.isEdit == false) {      
       if (!this.homeEventSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.homeEventSectionForm);        
       return;
     }
      let url = "/api/v1/homeeventsection/CreateUpdateHomeEventSection";
      this.crudService.saveData(url, this.homeEventSectionForm.value).subscribe(
        (response)=>{ 
          if(response.statusCode===201){
          this.homeEventSectionForm.reset();
          this.isView = true;
          this.searchHomeEventSection();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
       else if(response.status==302){
        this.homeEventSectionForm.reset();
        this.isView = true;
        this.searchHomeEventSection();
        this.tostr.warning(response.message,"Anupam Bharat Sangh");
      }
      else{
          this.homeEventSectionForm.reset();          
          this.tostr.error(response.message,"Anupam Bharat Sangh");
      }
      });
        
    } else {     
       if (!this.homeEventSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.homeEventSectionForm);      
       return;
     }
      let url = "/api/v1/homeeventsection/CreateUpdateHomeEventSection"      
      this.crudService.saveData(url, this.homeEventSectionForm.value).subscribe(
        (response)=>{
        if(response.statusCode==200){
          this.homeEventSectionForm.reset(); 
          this.updateId =0;
          this.isView = true;
          this.searchHomeEventSection();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
        else if(response.statusCode==302){        
          this.tostr.warning(response.message,"Anupam Bharat Sangh");
          this.homeEventSectionForm.reset();
          this.isView = true;
          this.searchHomeEventSection();
        }
        else{
          this.homeEventSectionForm.reset();          
          this.tostr.error(response.message,"Error");
        }
      }       
      );
    }
  }

  editHomeEventSection(data: any) {   
    this.isView = false;
    this.isEdit = true;
    this.updateId = data.Id;
    this.homeEventSectionForm.patchValue({
      Id:data.Id,
      EventTitle: data.EventTitle,   
      EventDescription:data.EventDescription,
      EventIconImage:data.EventIconImage,
      EventUrlLink:data.EventUrlLink
    });
  }

  reset() {
    this.isView = true;
    this.homeEventSectionForm.reset();
  }

  deleteHomeEventSection(stId: any) {    
    const sttId = stId.Id;
    let url = "/api/v1/homeeventsection/DeleteHomeEventSection?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchHomeEventSection();
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
    let url = "/api/v1/homeeventsection/ChangeHomeEventSectionStatus?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchHomeEventSection();
        this.tostr.success(response.message,"Success");
        }
        else
        {         
         this.tostr.error(response.message,"Error");
        }
      });
  } 

}
