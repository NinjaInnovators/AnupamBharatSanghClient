import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-manage-home-causes-section',
  templateUrl: './manage-home-causes-section.component.html',
  styleUrls: ['./manage-home-causes-section.component.css']
})
export class ManageHomeCausesSectionComponent implements OnInit {

  homeCausesSectionForm: FormGroup;  
  homeCausesSectionList: any;  
  userId:string;
  url:any;
  updateId: Number;
  isEdit:boolean;
 
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private crudService: CrudService,   
    private tostr:ToastrService
  ) {
    
  }

  ngOnInit(): void {
    this.getHomeCausesSectionList();
    this.setHomeCausesSectionForm();      
    this.authService.user.subscribe(x=>this.userId=x.id);    
  }

  getHomeCausesSectionList() {         
    let url = "/api/v1/homecausessection/GetHomeCausesSectionListForAdmin";     
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200) {          
          this.homeCausesSectionList =response.data;
           this.homeCausesSectionForm.patchValue({
              Id:this.homeCausesSectionList.Id,
              SectionHeading: this.homeCausesSectionList.SectionHeading,              
              SectionSubHeading:this.homeCausesSectionList.SectionSubHeading
            });         
        }
        else
        {
          this.tostr.error("Error occured while getting the record","Error");
        }
       
      }
    );
  }
  get f() {
    return this.homeCausesSectionForm.controls;
  }

  setHomeCausesSectionForm(): void {
    this.homeCausesSectionForm = this.fb.group({
      Id:[0],
      SectionHeading: ["", Validators.required],         
      SectionSubHeading:["",Validators.required]
    });
  }


  addHomeCausesSection() {      
    if(this.homeCausesSectionForm.value.Id>0) 
    this.isEdit=true;
    else
    this.isEdit=false;
    if (this.isEdit == false) {      
       if (!this.homeCausesSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.homeCausesSectionForm);        
       return;
     }
      let url = "/api/v1/homecausessection/CreateUpdateHomeCausesSection";
      this.crudService.saveData(url, this.homeCausesSectionForm.value).subscribe(
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
       if (!this.homeCausesSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.homeCausesSectionForm);      
       return;
     }
      let url = "/api/v1/homecausessection/CreateUpdateHomeCausesSection"      
      this.crudService.saveData(url, this.homeCausesSectionForm.value).subscribe(
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

}
