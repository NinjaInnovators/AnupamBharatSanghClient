import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-volunteers',
  templateUrl: './manage-volunteers.component.html',
  styleUrls: ['./manage-volunteers.component.css']
})
export class ManageVolunteersComponent implements OnInit {
  volunteerForm: FormGroup;
  searchVolunteerForm: FormGroup;
  volunteerList: any;
  totalVolunteer: any;
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
    this.setVolunteerForm();    
    this.setsearchVolunteerForm();
    this.searchVolunteer();
    this.authService.user.subscribe(x=>this.userId=x.id);
  }

  get f() {
    return this.volunteerForm.controls;
  }

  setVolunteerForm(): void {
    this.volunteerForm = this.fb.group({
      Id:[0],
      VolunteerName: ["", Validators.required],
      VolunteerImage:["assets/images/no-product.jpg",Validators.required],
      VolunteerWish:["",Validators.required],
      VolunteerDesignation:["",Validators.required],
      VolunteerFacebookLink:[""],
      VolunteerTwitterLink:[""],
      VolunteerGoogleLink:[""],
      VolunteerLinkedinLink:[""],
      VolunteerSkypeLink:[""]
    });
  }

  setsearchVolunteerForm(): void {
    this.searchVolunteerForm = this.fb.group({
      VolunteerName: [null],
      IsActive: [""],
    });
  }

  searchVolunteer() {      
    const title = this.searchVolunteerForm.value.VolunteerName;
    let url = "/api/v1/volunteer/GetVolunteerListForAdmin?Title=";   
    if (title != null && title != "") {
      url += title
    }
    url+='&Status=';
    if (this.searchVolunteerForm.value.IsActive == "1") {
      this.status = true;  
      url+=this.status;   
    }
    if (this.searchVolunteerForm.value.IsActive == "0") {
      this.status = false;   
      url+=this.status;   
    }   

    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
          this.totalVolunteer = response.count;
          this.volunteerList =response.data;
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
    this.setVolunteerForm();
  }

  addVolunteer() {       
   
    if (this.isView == false && this.isEdit == false) {   
      this.volunteerForm.patchValue({
        Id:0
      })   
       if (!this.volunteerForm.valid) {
        this.crudService.markFormGroupTouched(this.volunteerForm);        
       return;
     }
      let url = "/api/v1/volunteer/CreateUpdateVolunteer";
      this.crudService.saveData(url, this.volunteerForm.value).subscribe(
        (response)=>{ 
          if(response.statusCode===201){
          this.volunteerForm.reset();
          this.isView = true;
          this.searchVolunteer();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
       else if(response.status==302){
        this.volunteerForm.reset();
        this.isView = true;
        this.searchVolunteer();
        this.tostr.warning(response.message,"Anupam Bharat Sangh");
      }
      else{
          this.volunteerForm.reset();          
          this.tostr.error(response.message,"Anupam Bharat Sangh");
      }
      });
        
    } else {     
       if (!this.volunteerForm.valid) {
        this.crudService.markFormGroupTouched(this.volunteerForm);      
       return;
     }
      let url = "/api/v1/volunteer/CreateUpdateVolunteer"      
      this.crudService.saveData(url, this.volunteerForm.value).subscribe(
        (response)=>{
        if(response.statusCode==200){
          this.volunteerForm.reset(); 
          this.updateId =0;
          this.isView = true;
          this.searchVolunteer();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
        else if(response.statusCode==302){        
          this.tostr.warning(response.message,"Anupam Bharat Sangh");
          this.volunteerForm.reset();
          this.isView = true;
          this.searchVolunteer();
        }
        else{
          this.volunteerForm.reset();          
          this.tostr.error(response.message,"Error");
        }
      }       
      );
    }
  }

  editVolunteer(data: any) {   
    this.isView = false;
    this.isEdit = true;
    this.updateId = data.Id;
    this.volunteerForm.patchValue({
      Id:data.Id,
      VolunteerName:data.VolunteerName,
      VolunteerImage:this.apiEndPoint+data.VolunteerImage,
      VolunteerWish:data.VolunteerWish,
      VolunteerDesignation:data.VolunteerDesignation,
      VolunteerFacebookLink:data.ValunteerFacebookLink,
      VolunteerTwitterLink:data.VolunteerTwitterLink,
      VolunteerGoogleLink:data.VolunteerGoogleLink,
      VolunteerLinkedinLink:data.VolunteerLinkedinLink,
      VolunteerSkypeLink:data.VolunteerSkypeLink
    });
  }

  reset() {
    this.isView = true;
    this.volunteerForm.reset();
  }

  deleteVolunteer(stId: any) {    
    const sttId = stId.Id;
    let url = "/api/v1/volunteer/DeleteVolunteer?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchVolunteer();
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
    let url = "/api/v1/volunteer/ChangeVolunteerStatus?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchVolunteer();
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
        this.volunteerForm.controls['VolunteerImage'].setValue(base64);
      };
    }
    reader.readAsDataURL(evt.target.files[0]);
  }

}
