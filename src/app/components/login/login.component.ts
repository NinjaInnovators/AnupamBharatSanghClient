import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin:Boolean=true;  
  loginForm:FormGroup;
  loginError = false;
  submitted=false; 
  getState:Observable<any>;
  errorMessage:string|null;
  currentRoute:any;
  returnUrl:string;
  private subscription: Subscription;
  
  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb:FormBuilder,
    private tostr:ToastrService,    
     private ref:ChangeDetectorRef,
     private crudService:CrudService
  ) { }

  ngOnInit(): void {   
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.setLoginForm();       
  }
 
 
 get f(){
  return this.loginForm.controls;
}
 setLoginForm():void{
  this.loginForm=this.fb.group({
    EmailId:['',Validators.compose([Validators.required,Validators.email])],
    Password:['',Validators.compose([Validators.required])]
  });
}


  login() {       
    if (this.loginForm.invalid) {
      this.crudService.markFormGroupTouched(this.loginForm);
      return;
    }
    let url='/api/v1/account/login';
    this.authService.signIn(url, this.loginForm.value).subscribe((response)=>{
     if(response.statusCode===200){      
     this.loginForm.reset();
     const returnUrl =this.route.snapshot.queryParams["returnUrl"] ||"/dashboard";
      this.router.navigateByUrl(returnUrl);
     }
     else{       
        this.loginForm.reset();
        this.tostr.error(response.message,"ECommerce !!");
     }
    });
  }

}
