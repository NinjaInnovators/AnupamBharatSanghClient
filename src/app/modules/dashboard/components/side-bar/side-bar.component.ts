import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { RouteInfo } from './sidebar.metadata';
import { ROUTES } from './menu-item';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  usrData:any;
  usrId:any;
  rolId:any;
  public sidebarnavItems:RouteInfo[]=[];
  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private account:AuthService,
    private crudService:CrudService
  ) {}

   
   ngOnInit() {
     this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
   }

  // ngOnInit() {
    // this.account.user.subscribe(x=>this.usrData=x);  
    // this.usrId=this.usrData.id;    
    // this.getMenuData();    
  // }
  // getMenuData(){    
    // let url="/api/userPermission/v1/permission/";
    // if(this.usrId!=null && this.usrId!="")
    // url+=this.usrId;
    // this.crudService.getData(url).subscribe(x=>this.sidebarnavItems=x.permissionList);
   
  // }

}
