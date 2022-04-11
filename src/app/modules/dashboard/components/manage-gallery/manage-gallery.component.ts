import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-gallery',
  templateUrl: './manage-gallery.component.html',
  styleUrls: ['./manage-gallery.component.css']
})
export class ManageGalleryComponent implements OnInit {
  galleryForm: FormGroup;
  searchGalleryForm: FormGroup;
  galleryList: any;
  totalGallery: any;
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
    this.setGalleryForm();    
    this.setsearchGalleryForm();
    this.searchGallery();
    this.authService.user.subscribe(x=>this.userId=x.id);
  }

  get f() {
    return this.galleryForm.controls;
  }

  setGalleryForm(): void {
    this.galleryForm = this.fb.group({
      Id:[0],
      GalleryCaption: ["", Validators.required],
      GalleryImage:["assets/images/no-product.jpg",Validators.required],
      GalleryDescription:["",Validators.required],
      LinkUrl:[""]
    });
  }

  setsearchGalleryForm(): void {
    this.searchGalleryForm = this.fb.group({
      Title: [null],
      IsActive: [""],
    });
  }

  searchGallery() {      
    const title = this.searchGalleryForm.value.Title;
    let url = "/api/v1/gallery/GetGalleryListForAdmin?Title=";   
    if (title != null && title != "") {
      url += title
    }
    url+='&Status=';
    if (this.searchGalleryForm.value.IsActive == "1") {
      this.status = true;  
      url+=this.status;   
    }
    if (this.searchGalleryForm.value.IsActive == "0") {
      this.status = false;   
      url+=this.status;   
    }   

    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
          this.totalGallery = response.count;
          this.galleryList =response.data;
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
    this.setGalleryForm();
  }

  addGallery() {     
    if (this.isView == false && this.isEdit == false) {    
      this.galleryForm.patchValue({
        Id:0        
      }); 
       if (!this.galleryForm.valid) {
        this.crudService.markFormGroupTouched(this.galleryForm);        
       return;
     }
      let url = "/api/v1/gallery/CreateUpdateGallery";
     
      this.crudService.saveData(url, this.galleryForm.value).subscribe(
        (response)=>{ 
          if(response.statusCode===201){
          this.galleryForm.reset();
          this.isView = true;
          this.searchGallery();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
       else if(response.status==302){
        this.galleryForm.reset();
        this.isView = true;
        this.searchGallery();
        this.tostr.warning(response.message,"Anupam Bharat Sangh");
      }
      else{
          this.galleryForm.reset();          
          this.tostr.error(response.message,"Anupam Bharat Sangh");
      }
      });
        
    } else {     
       if (!this.galleryForm.valid) {
        this.crudService.markFormGroupTouched(this.galleryForm);      
       return;
     }
      let url = "/api/v1/gallery/CreateUpdateGallery"  
       
      this.crudService.saveData(url, this.galleryForm.value).subscribe(
        (response)=>{
        if(response.statusCode==200){
          this.galleryForm.reset(); 
          this.updateId =0;
          this.isView = true;
          this.searchGallery();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
        else if(response.statusCode==302){        
          this.tostr.warning(response.message,"Anupam Bharat Sangh");
          this.galleryForm.reset();
          this.isView = true;
          this.searchGallery();
        }
        else{
          this.galleryForm.reset();          
          this.tostr.error(response.message,"Error");
        }
      }       
      );
    }
  }

  editGallery(data: any) {   
    this.isView = false;
    this.isEdit = true;
    this.updateId = data.Id;
    this.galleryForm.patchValue({
      Id:data.Id,
      GalleryCaption: data.GalleryCaption,   
      GalleryImage:this.apiEndPoint+data.GalleryImage,
      GalleryDescription:data.GalleryDescription,
      LinkUrl:data.LinkUrl
    });
  }

  reset() {
    this.isView = true;
    this.galleryForm.reset();
  }

  deleteGallery(stId: any) {    
    const sttId = stId.Id;
    let url = "/api/v1/gallery/DeleteGallery?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchGallery();
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
    let url = "/api/v1/gallery/ChangeGalleryStatus?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchGallery();
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
        this.galleryForm.controls['GalleryImage'].setValue(base64);
      };
    }
    reader.readAsDataURL(evt.target.files[0]);
  }

}
