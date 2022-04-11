import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { ManageBannerComponent } from './components/manage-banner/manage-banner.component';
import { ManageBlogCommentComponent } from './components/manage-blog-comment/manage-blog-comment.component';
import { ManageBlogComponent } from './components/manage-blog/manage-blog.component';
import { ManageCausesDetailsComponent } from './components/manage-causes-details/manage-causes-details.component';
import { ManageCausesPointsComponent } from './components/manage-causes-points/manage-causes-points.component';
import { ManageContactUsFormComponent } from './components/manage-contact-us-form/manage-contact-us-form.component';
import { ManageContactUsIconSectionComponent } from './components/manage-contact-us-icon-section/manage-contact-us-icon-section.component';
import { ManageContactUsSectionComponent } from './components/manage-contact-us-section/manage-contact-us-section.component';
import { ManageDonateNowFormComponent } from './components/manage-donate-now-form/manage-donate-now-form.component';
import { ManageDonateNowComponent } from './components/manage-donate-now/manage-donate-now.component';
import { ManageEventComponent } from './components/manage-event/manage-event.component';
import { ManageFaqListComponent } from './components/manage-faq-list/manage-faq-list.component';
import { ManageFaqSectionComponent } from './components/manage-faq-section/manage-faq-section.component';
import { ManageFooterSectionAnupamComponent } from './components/manage-footer-section-anupam/manage-footer-section-anupam.component';
import { ManageGalleryComponent } from './components/manage-gallery/manage-gallery.component';
import { ManageGenderComponent } from './components/manage-gender/manage-gender.component';
import { ManageHelpComponent } from './components/manage-help/manage-help.component';
import { ManageHomeCausesSectionComponent } from './components/manage-home-causes-section/manage-home-causes-section.component';
import { ManageHomeCausesComponent } from './components/manage-home-causes/manage-home-causes.component';
import { ManageHomeDonationSectionComponent } from './components/manage-home-donation-section/manage-home-donation-section.component';
import { ManageHomeEventCountSectionComponent } from './components/manage-home-event-count-section/manage-home-event-count-section.component';
import { ManageHomeEventListSectionComponent } from './components/manage-home-event-list-section/manage-home-event-list-section.component';
import { ManageHomeEventSectionComponent } from './components/manage-home-event-section/manage-home-event-section.component';
import { ManageHomeWelcomeSectionComponent } from './components/manage-home-welcome-section/manage-home-welcome-section.component';
import { ManageLatestNewsSectionComponent } from './components/manage-latest-news-section/manage-latest-news-section.component';
import { ManageLatestNewsComponent } from './components/manage-latest-news/manage-latest-news.component';
import { ManageMissionAndGoalsComponent } from './components/manage-mission-and-goals/manage-mission-and-goals.component';
import { ManageRoleComponent } from './components/manage-role/manage-role.component';
import { ManageSettingsComponent } from './components/manage-settings/manage-settings.component';
import { ManageSocialMediaLinkComponent } from './components/manage-social-media-link/manage-social-media-link.component';
import { ManageSponsersComponent } from './components/manage-sponsers/manage-sponsers.component';
import { ManageTellUsFormComponent } from './components/manage-tell-us-form/manage-tell-us-form.component';
import { ManageTellUsSectionComponent } from './components/manage-tell-us-section/manage-tell-us-section.component';
import { ManageUserProfileComponent } from './components/manage-user-profile/manage-user-profile.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ManageVolunteersSectionComponent } from './components/manage-volunteers-section/manage-volunteers-section.component';
import { ManageVolunteersComponent } from './components/manage-volunteers/manage-volunteers.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [  
  {path:'',
  component:DashboardComponent,
  children:[
    {
      path: "",
      data: {
        title: "Dashboard",
        urls: [
          { title: "Dashboard", url: "/main-dashboard" },
          { title: "Dashboard" },
        ],
      },
      component: MainDashboardComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-banner",
      data: {
        title: "Manage Banner",        
      },
      component: ManageBannerComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-home-causes",
      data: {
        title: "Manage Home Causes"
      },
      component: ManageHomeCausesComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-home-causes-section",
      data: {
        title: "Manage Home Causes Section"
      },
      component: ManageHomeCausesSectionComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-home-donation-section",
      data: {
        title: "Manage Home Donation Section"
      },
      component: ManageHomeDonationSectionComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-home-event-count-section",
      data: {
        title: "Manage Home Event Count Section"
      },
      component: ManageHomeEventCountSectionComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-home-event-list-section",
      data: {
        title: "Manage Home Event List Section"
      },
      component: ManageHomeEventListSectionComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-home-event-section",
      data: {
        title: "Manage Home Event Section"
      },
      component: ManageHomeEventSectionComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-home-welcome-section",
      data: {
        title: "Manage Home Welcome Section"
      },
      component: ManageHomeWelcomeSectionComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-blog",
      data: {
        title: "Manage Blog"
      },
      component: ManageBlogComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-blog-comment",
      data: {
        title: "Manage Blog Comment",        
      },
      component: ManageBlogCommentComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-causes-details",
      data: {
        title: "Manage Causes Details",       
      },
      component: ManageCausesDetailsComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-causes-points",
      data: {
        title: "Manage Causes Points"
      },
      component: ManageCausesPointsComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-contact-us-form",
      data: {
        title: "Manage Contact Us Form"
      },
      component: ManageContactUsFormComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-contact-us-icon-section",
      data: {
        title: "Manage Contact Us Icon Section"
      },
      component: ManageContactUsIconSectionComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-contact-us-section",
      data: {
        title: "Manage Contact Us Section"
      },
      component: ManageContactUsSectionComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-donate-now",
      data: {
        title: "Manage Donate Now"       
      },
      component: ManageDonateNowComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-donate-now-form",
      data: {
        title: "Manage Donate Now Form"
      },
      component: ManageDonateNowFormComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-event",
      data: {
        title: "Manage Event"
      },
      component: ManageEventComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-faq-list",
      data: {
        title: "Manage Faq List"
      },
      component: ManageFaqListComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-faq-section",
      data: {
        title: "Manage Faq Section"
      },
      component: ManageFaqSectionComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-footer-section-anupam",
      data: {
        title: "Manage Footer Section Anupam"
      },
      component: ManageFooterSectionAnupamComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-gallery",
      data: {
        title: "Manage Gallery"
      },
      component: ManageGalleryComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-gender",
      data: {
        title: "Manage Gender"
      },
      component: ManageGenderComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-help",
      data: {
        title: "Manage Help"
      },
      component: ManageHelpComponent,
      canActivate :[AuthGuard]
    },
  
    {
      path: "manage-latest-news",
      data: {
        title: "Manage Latest News"
      },
      component: ManageLatestNewsComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-latest-news-section",
      data: {
        title: "Manage Latest News Section"
      },
      component: ManageLatestNewsSectionComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-mission-and-goals",
      data: {
        title: "Manage Mission And Goals"
      },
      component: ManageMissionAndGoalsComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-role",
      data: {
        title: "Manage Role"
      },
      component: ManageRoleComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-settings",
      data: {
        title: "Manage Settings"
      },
      component: ManageSettingsComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-social-media-link",
      data: {
        title: "Manage Social Media Link"
      },
      component: ManageSocialMediaLinkComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-sponsers",
      data: {
        title: "Manage Sponsers"
      },
      component: ManageSponsersComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-tell-us-form",
      data: {
        title: "Manage Tell Us Form"
      },
      component: ManageTellUsFormComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-tell-us-section",
      data: {
        title: "Manage Tell Us Section"
      },
      component: ManageTellUsSectionComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-user",
      data: {
        title: "Manage User"
      },
      component: ManageUserComponent,
      canActivate :[AuthGuard]
    } ,
    {
      path: "manage-user-profile",
      data: {
        title: "Manage Profile"
      },
      component: ManageUserProfileComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-volunteers",
      data: {
        title: "Manage Volunteers"
      },
      component: ManageVolunteersComponent,
      canActivate :[AuthGuard]
    },
    {
      path: "manage-volunteers-section",
      data: {
        title: "Manage Volunteers Section"
      },
      component: ManageVolunteersSectionComponent,
      canActivate :[AuthGuard]
    }
    
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
