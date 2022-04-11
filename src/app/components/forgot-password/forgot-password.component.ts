import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm:FormGroup;   
  currentRoute:any;
  returnUrl:string;  
  
  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb:FormBuilder,
    private tostr:ToastrService,   
     private crudService:CrudService
  ) { }

  ngOnInit(): void {   
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.setForgotPasswordForm();       
  }
 
 
 get f(){
  return this.forgotPasswordForm.controls;
}
 setForgotPasswordForm():void{
  this.forgotPasswordForm=this.fb.group({
    EmailId:['',Validators.compose([Validators.required,Validators.email])]    
  });
}


  forgotPassword() {       
    if (this.forgotPasswordForm.invalid) {
      this.crudService.markFormGroupTouched(this.forgotPasswordForm);
      return;
    }
    let url='/api/v1/account/forgetPassword';
    this.authService.signIn(url, this.forgotPasswordForm.value).subscribe((response)=>{
     if(response.statusCode===200){      
     this.forgotPasswordForm.reset();
     this.tostr.success(response.message,"ECommerce !!");
     }
     else{       
        this.forgotPasswordForm.reset();
        this.tostr.error(response.message,"ECommerce !!");
     }
    });
  }

}
