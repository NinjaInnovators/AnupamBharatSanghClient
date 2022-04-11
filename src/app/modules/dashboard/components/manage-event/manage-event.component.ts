import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css']
})
export class ManageEventComponent implements OnInit {
  eventForm: FormGroup;
  searchEventForm: FormGroup;
  eventList: any;
  totalEvent: any;
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
    this.setEventForm();    
    this.setsearchEventForm();
    this.searchEvent();
    this.authService.user.subscribe(x=>this.userId=x.id);
  }

  get f() {
    return this.eventForm.controls;
  }

  setEventForm(): void {
    this.eventForm = this.fb.group({
      Id:[0],
      EventTitle: ["", Validators.required],
      EventBigImage:["assets/images/no-product.jpg",Validators.required],
      EventSmallImage:["assets/images/no-product.jpg",Validators.required],
      EventDescription:["",Validators.required],
      EventDate:["",Validators.required],
      EventTime:["",Validators.required],
      EventLocation:["",Validators.required],
      OrganizedBy:["",Validators.required]
    });
  }

  setsearchEventForm(): void {
    this.searchEventForm = this.fb.group({
      Title: [null],
      IsActive: [""],
    });
  }

  searchEvent() {      
    const title = this.searchEventForm.value.Title;
    let url = "/api/v1/event/GetEventListForAdmin?Title=";   
    if (title != null && title != "") {
      url += title
    }
    url+='&Status=';
    if (this.searchEventForm.value.IsActive == "1") {
      this.status = true;  
      url+=this.status;   
    }
    if (this.searchEventForm.value.IsActive == "0") {
      this.status = false;   
      url+=this.status;   
    }   

    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
          this.totalEvent = response.count;
          this.eventList =response.data;
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
    this.setEventForm();
  }

  addEvent() {       
   
    if (this.isView == false && this.isEdit == false) {      
       if (!this.eventForm.valid) {
        this.crudService.markFormGroupTouched(this.eventForm);        
       return;
     }
      let url = "/api/v1/event/CreateUpdateEvent";
      this.crudService.saveData(url, this.eventForm.value).subscribe(
        (response)=>{ 
          if(response.statusCode===201){
          this.eventForm.reset();
          this.isView = true;
          this.searchEvent();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
       else if(response.status==302){
        this.eventForm.reset();
        this.isView = true;
        this.searchEvent();
        this.tostr.warning(response.message,"Anupam Bharat Sangh");
      }
      else{
          this.eventForm.reset();          
          this.tostr.error(response.message,"Anupam Bharat Sangh");
      }
      });
        
    } else {     
       if (!this.eventForm.valid) {
        this.crudService.markFormGroupTouched(this.eventForm);      
       return;
     }
      let url = "/api/v1/event/CreateUpdateEvent"      
      this.crudService.saveData(url, this.eventForm.value).subscribe(
        (response)=>{
        if(response.statusCode==200){
          this.eventForm.reset(); 
          this.updateId =0;
          this.isView = true;
          this.searchEvent();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
        else if(response.statusCode==302){        
          this.tostr.warning(response.message,"Anupam Bharat Sangh");
          this.eventForm.reset();
          this.isView = true;
          this.searchEvent();
        }
        else{
          this.eventForm.reset();          
          this.tostr.error(response.message,"Error");
        }
      }       
      );
    }
  }

  editEvent(data: any) {   
    this.isView = false;
    this.isEdit = true;
    this.updateId = data.Id;
    this.eventForm.patchValue({
      Id:data.Id,
      EventTitle:data.EventTitle,
      EventBigImage:this.apiEndPoint+data.EventBigImage,
      EventSmallImage:this.apiEndPoint+data.EventSmallImage,
      EventDescription:data.EventDescription,
      EventDate:data.EventDate,
      EventTime:data.EventTime,
      EventLocation:data.EventLocation,
      OrganizedBy:data.OrganizedBy
    });
  }

  reset() {
    this.isView = true;
    this.eventForm.reset();
  }

  deleteEvent(stId: any) {    
    const sttId = stId.Id;
    let url = "/api/v1/event/DeleteEvent?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchEvent();
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
    let url = "/api/v1/event/ChangeEventStatus?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchEvent();
        this.tostr.success(response.message,"Success");
        }
        else
        {         
         this.tostr.error(response.message,"Error");
        }
      });
  }

  onSelectFile(evt: any) {
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        var base64 = e.target.result;
        this.eventForm.controls['EventBigImage'].setValue(base64);
      };
    }
    reader.readAsDataURL(evt.target.files[0]);
  }

  onSelectFileSmall(evt: any) {
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        var base64 = e.target.result;
        this.eventForm.controls['EventSmallImage'].setValue(base64);
      };
    }
    reader.readAsDataURL(evt.target.files[0]);
  }

}
