import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-help',
  templateUrl: './manage-help.component.html',
  styleUrls: ['./manage-help.component.css']
})
export class ManageHelpComponent implements OnInit {
  helpForm: FormGroup;  
  helpList: any;  
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
    this.getHelpList();
    this.setHelpForm();      
    this.authService.user.subscribe(x=>this.userId=x.id);    
  }

  getHelpList() {      
    let url = "/api/v1/help/GetHelpList";     
    this.crudService.getData(url).subscribe(
      (response) => {
        if(response.statusCode===200)        {          
          this.helpList =response.data;
           this.helpForm.patchValue({
              Id:this.helpList.Id,
              HelpTitle: this.helpList.HelpTitle,              
              HelpDescription:this.helpList.HelpDescription,
              HelpButtonText:this.helpList.HelpButtonText,
              HelpButtonLink:this.helpList.HelpButtonLink
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
    return this.helpForm.controls;
  }

  setHelpForm(): void {
    this.helpForm = this.fb.group({
      Id:[0],
      HelpTitle: ["", Validators.required],         
      HelpDescription:["",Validators.required],
      HelpButtonText:["",Validators.required],
      HelpButtonLink:[""]      
    });
  }


  addHelp() {  
    
    if(this.helpForm.value.Id>0) 
    this.isEdit=true;
    else
    this.isEdit=false;
    if (this.isEdit == false) {      
       if (!this.helpForm.valid) {
        this.crudService.markFormGroupTouched(this.helpForm);        
       return;
     }
      let url = "/api/v1/help/CreateUpdateHelp";
      this.crudService.saveData(url, this.helpForm.value).subscribe(
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
       if (!this.helpForm.valid) {
        this.crudService.markFormGroupTouched(this.helpForm);      
       return;
     }
      let url = "/api/v1/help/CreateUpdateHelp"      
      this.crudService.saveData(url, this.helpForm.value).subscribe(
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
