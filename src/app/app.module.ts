import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OurWorksComponent } from './components/our-works/our-works.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { HappeningsComponent } from './components/happenings/happenings.component';
import { GetInvolvedComponent } from './components/get-involved/get-involved.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { OwlModule } from 'ngx-owl-carousel';
import { NgwWowModule } from 'ngx-wow';
import { LightboxModule } from 'ngx-lightbox';
import { SponsersComponent } from './components/sponsers/sponsers.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { NewsLetterComponent } from './components/news-letter/news-letter.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './helpers/loader-interceptor';
import { NgxConfirmBoxModule } from 'ngx-confirm-box';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingBarModule, LoadingBarService } from 'ngx-loading-bar';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ToastrModule} from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import { BannerComponent } from './components/banner/banner.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeDonateComponent } from './components/home-donate/home-donate.component';
import { HomeCounterComponent } from './components/home-counter/home-counter.component';
import { HomeCauseComponent } from './components/home-cause/home-cause.component';
import { HelpComponent } from './components/help/help.component';
import { VolunteerSectionComponent } from './components/volunteer-section/volunteer-section.component';
import { VolunteerListComponent } from './components/volunteer-list/volunteer-list.component';
import { CausesListComponent } from './components/causes-list/causes-list.component';
import { HomeEventsComponent } from './components/home-events/home-events.component';
import { HomeEventListComponent } from './components/home-event-list/home-event-list.component';
import { NewsSectionComponent } from './components/news-section/news-section.component';
import { NewsListComponent } from './components/news-list/news-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    OurWorksComponent,
    CampaignsComponent,
    HappeningsComponent,
    GetInvolvedComponent,
    GalleryComponent,
    ContactUsComponent,
    SponsersComponent,
    EventDetailComponent,
    ProjectDetailComponent,
    NewsLetterComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    LoaderComponent,
    BannerComponent,
    WelcomeComponent,
    HomeDonateComponent,
    HomeCounterComponent,
    HomeCauseComponent,
    HelpComponent,
    VolunteerSectionComponent,
    VolunteerListComponent,
    CausesListComponent,
    HomeEventsComponent,
    HomeEventListComponent,
    NewsSectionComponent,
    NewsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OwlModule,
    NgwWowModule,
    LightboxModule,
    BrowserAnimationsModule,
    //LoadingBarModule,
    //LoadingBarRouterModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      enableHtml: true
    }),
    NgxSpinnerModule
  ],  
  providers: [
    //LoadingBarService,   
    NgxConfirmBoxModule,       
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
