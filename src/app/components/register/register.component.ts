import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm:FormGroup;  
  submitted=false; 
  getState:Observable<any>;  
  currentRoute:any;
  returnUrl:string;    
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
    this.setRegisterForm();       
  } 
 
 get f(){
  return this.registerForm.controls;
}
 setRegisterForm():void{
  this.registerForm=this.fb.group({
    UserName:["",Validators.compose([Validators.required])],
    MobileNo: ["",
      Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
    ],
    EmailId:["",Validators.compose([Validators.required,Validators.email])],
    Password:["",Validators.compose([Validators.required])],
    Gender:["",Validators.compose([Validators.required])],
  });
}


  register() {    
    debugger;   
    if (this.registerForm.invalid) {
      this.crudService.markFormGroupTouched(this.registerForm);
      return;
    }
    let url='/api/v1/account/Register';
    this.registerForm.value.Gender=+this.registerForm.value.Gender;
    this.authService.register(url, this.registerForm.value).subscribe((response)=>{
     if(response.statusCode===201){      
     this.registerForm.reset();
     const returnUrl =this.route.snapshot.queryParams["returnUrl"] ||"/dashboard";
      this.router.navigateByUrl(returnUrl);
     }
     else{       
        this.registerForm.reset();
        this.tostr.error(response.message,"ECommerce !!");
     }
    });
  }

}
