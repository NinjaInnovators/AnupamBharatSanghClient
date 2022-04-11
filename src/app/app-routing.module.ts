import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GetInvolvedComponent } from './components/get-involved/get-involved.component';
import { HappeningsComponent } from './components/happenings/happenings.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OurWorksComponent } from './components/our-works/our-works.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'our-works',component:OurWorksComponent},
  {path:'campaigns',component:CampaignsComponent},
  {path:'happenings',component:HappeningsComponent},
  {path:'get-involved',component:GetInvolvedComponent},
  {path:'gallery',component:GalleryComponent},
  {path:'contact-us',component:ContactUsComponent},
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[AuthGuard] },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forget-password',component:ForgotPasswordComponent},
  {path:'**',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
