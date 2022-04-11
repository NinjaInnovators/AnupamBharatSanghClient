import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-manage-volunteers-section',
  templateUrl: './manage-volunteers-section.component.html',
  styleUrls: ['./manage-volunteers-section.component.css']
})
export class ManageVolunteersSectionComponent implements OnInit {

  volunteersSectionForm: FormGroup;  
  volunteersList: any;  
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
    this.getVolunteersList();
    this.setVolunteersSectionForm();      
    this.authService.user.subscribe(x=>this.userId=x.id);    
  }

  getVolunteersList() {      
    let url = "/api/v1/volunteerssection/GetVolunteersSectionForAdmin";     
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)        {          
          this.volunteersList =response.data;
           this.volunteersSectionForm.patchValue({
              Id:this.volunteersList.Id,
              HeadingTitle: this.volunteersList.HeadingTitle,              
              Description:this.volunteersList.Description
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
    return this.volunteersSectionForm.controls;
  }

  setVolunteersSectionForm(): void {
    this.volunteersSectionForm = this.fb.group({
      Id:[0],
      HeadingTitle: ["", Validators.required],         
      Description:["",Validators.required]
    });
  }


  addVolunteersSection() {      
    if(this.volunteersSectionForm.value.Id>0) 
    this.isEdit=true;
    else
    this.isEdit=false;
    if (this.isEdit == false) {      
       if (!this.volunteersSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.volunteersSectionForm);        
       return;
     }
      let url = "/api/v1/volunteerssection/CreateUpdateVolunteersSection";
      this.crudService.saveData(url, this.volunteersSectionForm.value).subscribe(
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
       if (!this.volunteersSectionForm.valid) {
        this.crudService.markFormGroupTouched(this.volunteersSectionForm);      
       return;
     }
      let url = "/api/v1/volunteerssection/CreateUpdateVolunteersSection"      
      this.crudService.saveData(url, this.volunteersSectionForm.value).subscribe(
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
