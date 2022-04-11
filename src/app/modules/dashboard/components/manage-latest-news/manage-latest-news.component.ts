import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-latest-news',
  templateUrl: './manage-latest-news.component.html',
  styleUrls: ['./manage-latest-news.component.css']
})
export class ManageLatestNewsComponent implements OnInit {
  latestNewsForm: FormGroup;
  searchLatestNewsForm: FormGroup;
  latestNewsList: any;
  totalLatestNews: any;
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
    this.setLatestNewsForm();    
    this.setsearchLatestNewsForm();
    this.searchLatestNews();
    this.authService.user.subscribe(x=>this.userId=x.id);
  }

  get f() {
    return this.latestNewsForm.controls;
  }

  setLatestNewsForm(): void {
    this.latestNewsForm = this.fb.group({
      Id:[0],
      NewsTitle: ["", Validators.required],
      NewsHoverImage:["assets/images/no-product.jpg",Validators.required],
      NewsDescription:["",Validators.required],
      NewsCategory:["",Validators.required],
      NewsDate:["",Validators.required],
      TotalNewsComments:["",Validators.required]
    });
  }

  setsearchLatestNewsForm(): void {
    this.searchLatestNewsForm = this.fb.group({
      Title: [null],
      IsActive: [""],
    });
  }

  searchLatestNews() {      
    const title = this.searchLatestNewsForm.value.Title;
    let url = "/api/v1/latestnews/GetLatestNewsListForAdmin?Title=";   
    if (title != null && title != "") {
      url += title
    }
    url+='&Status=';
    if (this.searchLatestNewsForm.value.IsActive == "1") {
      this.status = true;  
      url+=this.status;   
    }
    if (this.searchLatestNewsForm.value.IsActive == "0") {
      this.status = false;   
      url+=this.status;   
    }   

    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
          this.totalLatestNews = response.count;
          this.latestNewsList =response.data;
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
    this.setLatestNewsForm();
  }

  addLatestNews() {   
   
    if (this.isView == false && this.isEdit == false) {  
      this.latestNewsForm.patchValue({
        Id:0
      })
       if (!this.latestNewsForm.valid) {
        this.crudService.markFormGroupTouched(this.latestNewsForm);        
       return;
     }
     this.latestNewsForm.value.TotalNewsComments=+this.latestNewsForm.value.TotalNewsComments;
      let url = "/api/v1/latestnews/CreateUpdateLatestNews";
      this.crudService.saveData(url, this.latestNewsForm.value).subscribe(
        (response)=>{ 
          if(response.statusCode===201){
          this.latestNewsForm.reset();
          this.isView = true;
          this.searchLatestNews();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
       else if(response.status==302){
        this.latestNewsForm.reset();
        this.isView = true;
        this.searchLatestNews();
        this.tostr.warning(response.message,"Anupam Bharat Sangh");
      }
      else{
          this.latestNewsForm.reset();          
          this.tostr.error(response.message,"Anupam Bharat Sangh");
      }
      });
        
    } else {     
       if (!this.latestNewsForm.valid) {
        this.crudService.markFormGroupTouched(this.latestNewsForm);      
       return;
     }
     this.latestNewsForm.value.TotalNewsComments=+this.latestNewsForm.value.TotalNewsComments;
      let url = "/api/v1/latestnews/CreateUpdateLatestNews"      
      this.crudService.saveData(url, this.latestNewsForm.value).subscribe(
        (response)=>{
        if(response.statusCode==200){
          this.latestNewsForm.reset(); 
          this.updateId =0;
          this.isView = true;
          this.searchLatestNews();
          this.tostr.success(response.message,"Anupam Bharat Sangh");
        }
        else if(response.statusCode==302){        
          this.tostr.warning(response.message,"Anupam Bharat Sangh");
          this.latestNewsForm.reset();
          this.isView = true;
          this.searchLatestNews();
        }
        else{
          this.latestNewsForm.reset();          
          this.tostr.error(response.message,"Error");
        }
      }       
      );
    }
  }

  editLatestNews(data: any) {   
    this.isView = false;
    this.isEdit = true;
    this.updateId = data.Id;
    this.latestNewsForm.patchValue({
      Id:data.Id,
      NewsTitle: data.NewsTitle,   
      NewsHoverImage:this.apiEndPoint+data.NewsHoverImage,
      NewsDescription:data.NewsDescription,
      NewsCategory:data.NewsCategory,
      NewsDate:data.NewsDate,
      TotalNewsComments:data.TotalNewsComments
    });
  }

  reset() {
    this.isView = true;
    this.latestNewsForm.reset();
  }

  deleteLatestNews(stId: any) {    
    const sttId = stId.Id;
    let url = "/api/v1/latestnews/DeleteLatestNews?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchLatestNews();
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
    let url = "/api/v1/latestnews/ChangeLatestNewsStatus?id=" + sttId;
    this.crudService.deleteData(url).subscribe(
      (response) => {
        if(response.statusCode===200)
        {
        this.updateId = 0;
        this.isView = true;        
        this.searchLatestNews();
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
        this.latestNewsForm.controls['NewsHoverImage'].setValue(base64);
      };
    }
    reader.readAsDataURL(evt.target.files[0]);
  }

}
