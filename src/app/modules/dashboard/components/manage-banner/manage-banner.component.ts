import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-banner',
  templateUrl: './manage-banner.component.html',
  styleUrls: ['./manage-banner.component.css']
})
export class ManageBannerComponent implements OnInit {
  bannerForm: FormGroup;
  searchBannerForm: FormGroup;
  bannerList: any;
  totalBanner: any;
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
    this.setBannerForm();    
    this.setsearchBannerForm();
    this.searchBanner();
    this.authService.user.subscribe(x=>this.userId=x.id);
  }

  get f() {
    return this.bannerForm.controls;
  }

  setBannerForm(): void {
    this.bannerForm = this.fb.group({
      Id:[0],
      Title: ["", Validators.required],
      BannerImage:["assets/images/no-product.jpg",Validators.required],
      Description:["",Validators.required],
      ButtonText:["",Validators.required],
      ButtonLink:["",Validators.required]
    });
  }

  setsearchBannerForm(): void {
    this.searchBannerForm = this.fb.group({
      Title: [null],
      IsActive: [""],
    });
  }

  searchBanner() {      
    const title = this.searchBannerForm.value.Title;
    let url = "/api/v1/banner/GetBannerListForAdmin?Title=";   
    if (title != null && title != "") {
      url += title
    }
    url+='&Status=';
    if (this.searchBannerForm.value.IsActive == "1") {
      this.status = true;  
      url+=this.status;   
    }
    if (this.searchBannerForm.value.IsActive == "0") {
      this.status = false;   
      url+=this.status;   
    }   

    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
          this.totalBanner = response.count;
          this.bannerList =response.data;
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

  addBanner() {       
   
    if (this.isView == false && this.isEdit == false) {      
       if (!this.bannerForm.valid) {
        this.crudService.markFormGroupTouched(this.bannerForm);        
       return;
     }
      let url = "/api/v1/banner/CreateUpdateBanner";
      this.crudService.saveData(url, this.bannerForm.value).subscribe(
        (response)=>{ 
          if(response.statusCode===201){
          this.bannerForm.reset();
          this.isView = true;
          this.searchBanner();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
       else if(response.status==302){
        this.bannerForm.reset();
        this.isView = true;
        this.searchBanner();
        this.tostr.warning(response.message,"Anupam Bharat Sangh");
      }
      else{
          this.bannerForm.reset();          
          this.tostr.error(response.message,"Anupam Bharat Sangh");
      }
      });
        
    } else {     
       if (!this.bannerForm.valid) {
        this.crudService.markFormGroupTouched(this.bannerForm);      
       return;
     }
      let url = "/api/v1/banner/CreateUpdateBanner"      
      this.crudService.saveData(url, this.bannerForm.value).subscribe(
        (response)=>{
        if(response.statusCode==200){
          this.bannerForm.reset(); 
          this.updateId =0;
          this.isView = true;
          this.searchBanner();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
        else if(response.statusCode==302){        
          this.tostr.warning(response.message,"Anupam Bharat Sangh");
          this.bannerForm.reset();
          this.isView = true;
          this.searchBanner();
        }
        else{
          this.bannerForm.reset();          
          this.tostr.error(response.message,"Error");
        }
      }       
      );
    }
  }

  editBanner(data: any) {   
    this.isView = false;
    this.isEdit = true;
    this.updateId = data.Id;
    this.bannerForm.patchValue({
      Id:data.Id,
      Title: data.Title,   
      BannerImage:this.apiEndPoint+data.BannerImage,
      Description:data.Description,
      ButtonText:data.ButtonText,
      ButtonLink:data.ButtonLink
    });
  }

  reset() {
    this.isView = true;
    this.bannerForm.reset();
  }

  deleteBanner(stId: any) {    
    const sttId = stId.Id;
    let url = "/api/v1/banner/DeleteBanner?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchBanner();
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
    let url = "/api/v1/banner/ChangeBannerStatus?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchBanner();
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
        this.bannerForm.controls['BannerImage'].setValue(base64);
      };
    }
    reader.readAsDataURL(evt.target.files[0]);
  }

}
