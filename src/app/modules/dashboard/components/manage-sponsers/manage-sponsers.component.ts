import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-sponsers',
  templateUrl: './manage-sponsers.component.html',
  styleUrls: ['./manage-sponsers.component.css']
})
export class ManageSponsersComponent implements OnInit {
  sponserForm: FormGroup;
  searchSponserForm: FormGroup;
  sponserList: any;
  totalSponser: any;
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
    this.setSponserForm();    
    this.setsearchSponserForm();
    this.searchSponser();
    this.authService.user.subscribe(x=>this.userId=x.id);
  }

  get f() {
    return this.sponserForm.controls;
  }

  setSponserForm(): void {
    this.sponserForm = this.fb.group({
      Id:[0],
      SponserTitle: ["", Validators.required],
      SponserImage:["assets/images/no-product.jpg",Validators.required],
      SponserTagLine:["",Validators.required]     
    });
  }

  setsearchSponserForm(): void {
    this.searchSponserForm = this.fb.group({
      SponserTitle: [null],
      IsActive: [""],
    });
  }

  searchSponser() {      
    const title = this.searchSponserForm.value.Title;
    let url = "/api/v1/sponsers/GetSponserListForAdmin?Title=";   
    if (title != null && title != "") {
      url += title
    }
    url+='&Status=';
    if (this.searchSponserForm.value.IsActive == "1") {
      this.status = true;  
      url+=this.status;   
    }
    if (this.searchSponserForm.value.IsActive == "0") {
      this.status = false;   
      url+=this.status;   
    }   

    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
          this.totalSponser = response.count;
          this.sponserList =response.data;
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
    this.setSponserForm();
  }

  addSponser() {       
   
    if (this.isView == false && this.isEdit == false) {  
      this.sponserForm.patchValue({
        Id:0     
      });    
       if (!this.sponserForm.valid) {
        this.crudService.markFormGroupTouched(this.sponserForm);        
       return;
     }
      let url = "/api/v1/sponsers/CreateUpdateSponsers";
      this.crudService.saveData(url, this.sponserForm.value).subscribe(
        (response)=>{ 
          if(response.statusCode===201){
          this.sponserForm.reset();
          this.isView = true;
          this.searchSponser();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
       else if(response.status==302){
        this.sponserForm.reset();
        this.isView = true;
        this.searchSponser();
        this.tostr.warning(response.message,"Anupam Bharat Sangh");
      }
      else{
          this.sponserForm.reset();          
          this.tostr.error(response.message,"Anupam Bharat Sangh");
      }
      });
        
    } else {   
        
       if (!this.sponserForm.valid) {
        this.crudService.markFormGroupTouched(this.sponserForm);      
       return;
     }
      let url = "/api/v1/sponsers/CreateUpdateSponsers"      
      this.crudService.saveData(url, this.sponserForm.value).subscribe(
        (response)=>{
        if(response.statusCode==200){
          this.sponserForm.reset(); 
          this.updateId =0;
          this.isView = true;
          this.searchSponser();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
        else if(response.statusCode==302){        
          this.tostr.warning(response.message,"Anupam Bharat Sangh");
          this.sponserForm.reset();
          this.isView = true;
          this.searchSponser();
        }
        else{
          this.sponserForm.reset();          
          this.tostr.error(response.message,"Error");
        }
      }       
      );
    }
  }

  editSponser(data: any) {     
    this.isView = false;
    this.isEdit = true;
    this.updateId = data.Id;
    this.sponserForm.patchValue({
      Id:data.Id,
      SponserTitle: data.SponserTitle,   
      SponserImage:this.apiEndPoint+data.SponserImage,
      SponserTagLine:data.SponserTagLine,     
    });
  }

  reset() {
    this.isView = true;
    this.sponserForm.reset();
  }

  deleteSponser(stId: any) {    
    const sttId = stId.Id;
    let url = "/api/v1/sponsers/DeleteSponser?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchSponser();
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
    let url = "/api/v1/sponsers/ChangeSponserStatus?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchSponser();
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
        this.sponserForm.controls['SponserImage'].setValue(base64);
      };
    }
    reader.readAsDataURL(evt.target.files[0]);
  }

}
