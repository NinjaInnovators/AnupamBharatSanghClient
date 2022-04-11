import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-home-causes',
  templateUrl: './manage-home-causes.component.html',
  styleUrls: ['./manage-home-causes.component.css']
})
export class ManageHomeCausesComponent implements OnInit {
  homeCausesForm: FormGroup;
  searchHomeCausesForm: FormGroup;
  homeCausesList: any;
  totalHomeCauses: any;
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
    this.setHomeCausesForm();    
    this.setsearchHomeCausesForm();
    this.searchHomeCauses();
    this.authService.user.subscribe(x=>this.userId=x.id);
  }

  get f() {
    return this.homeCausesForm.controls;
  }

  setHomeCausesForm(): void {
    this.homeCausesForm = this.fb.group({
      Id:[0],
      CausesTitle: ["", Validators.required],
      CausesImage:["assets/images/no-product.jpg",Validators.required],
      CausesDescription:["",Validators.required],
      FundRaised:["",Validators.required],
      FundGoal:["",Validators.required],
      IsUrgent:[false]
    });
  }

  setsearchHomeCausesForm(): void {
    this.searchHomeCausesForm = this.fb.group({
      Title: [null],
      IsActive: [""],
    });
  }

  searchHomeCauses() {      
    const title = this.searchHomeCausesForm.value.Title;
    let url = "/api/v1/homecauses/GetHomeCausesListForAdmin?Title=";   
    if (title != null && title != "") {
      url += title
    }
    url+='&Status=';
    if (this.searchHomeCausesForm.value.IsActive == "1") {
      this.status = true;  
      url+=this.status;   
    }
    if (this.searchHomeCausesForm.value.IsActive == "0") {
      this.status = false;   
      url+=this.status;   
    }   

    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
          this.totalHomeCauses = response.count;
          this.homeCausesList =response.data;
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
    this.setHomeCausesForm();
  }

  addHomeCauses() {     
    if (this.isView == false && this.isEdit == false) {    
      this.homeCausesForm.patchValue({
        Id:0        
      }); 
       if (!this.homeCausesForm.valid) {
        this.crudService.markFormGroupTouched(this.homeCausesForm);        
       return;
     }
      let url = "/api/v1/homecauses/CreateUpdateHomeCauses";
      this.homeCausesForm.value.FundRaised=+this.homeCausesForm.value.FundRaised;
      this.homeCausesForm.value.FundGoal=+this.homeCausesForm.value.FundGoal;
      this.crudService.saveData(url, this.homeCausesForm.value).subscribe(
        (response)=>{ 
          if(response.statusCode===201){
          this.homeCausesForm.reset();
          this.isView = true;
          this.searchHomeCauses();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
       else if(response.status==302){
        this.homeCausesForm.reset();
        this.isView = true;
        this.searchHomeCauses();
        this.tostr.warning(response.message,"Anupam Bharat Sangh");
      }
      else{
          this.homeCausesForm.reset();          
          this.tostr.error(response.message,"Anupam Bharat Sangh");
      }
      });
        
    } else {     
       if (!this.homeCausesForm.valid) {
        this.crudService.markFormGroupTouched(this.homeCausesForm);      
       return;
     }
      let url = "/api/v1/homecauses/CreateUpdateHomeCauses"   
      this.homeCausesForm.value.FundRaised=+this.homeCausesForm.value.FundRaised;
      this.homeCausesForm.value.FundGoal=+this.homeCausesForm.value.FundGoal;   
      this.crudService.saveData(url, this.homeCausesForm.value).subscribe(
        (response)=>{
        if(response.statusCode==200){
          this.homeCausesForm.reset(); 
          this.updateId =0;
          this.isView = true;
          this.searchHomeCauses();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
        else if(response.statusCode==302){        
          this.tostr.warning(response.message,"Anupam Bharat Sangh");
          this.homeCausesForm.reset();
          this.isView = true;
          this.searchHomeCauses();
        }
        else{
          this.homeCausesForm.reset();          
          this.tostr.error(response.message,"Error");
        }
      }       
      );
    }
  }

  editHomeCauses(data: any) {   
    this.isView = false;
    this.isEdit = true;
    this.updateId = data.Id;
    this.homeCausesForm.patchValue({
      Id:data.Id,
      CausesTitle: data.CausesTitle,   
      CausesImage:this.apiEndPoint+data.CausesImage,
      CausesDescription:data.CausesDescription,
      FundRaised:data.FundRaised,
      FundGoal:data.Goal
    });
  }

  reset() {
    this.isView = true;
    this.homeCausesForm.reset();
  }

  deleteHomeCauses(stId: any) {    
    const sttId = stId.Id;
    let url = "/api/v1/homecauses/DeleteHomeCauses?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchHomeCauses();
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
    let url = "/api/v1/homecauses/ChangeHomeCausesStatus?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchHomeCauses();
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
        this.homeCausesForm.controls['CausesImage'].setValue(base64);
      };
    }
    reader.readAsDataURL(evt.target.files[0]);
  }

}
