import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ManageBannerComponent } from './components/manage-banner/manage-banner.component';
import { ManageBlogComponent } from './components/manage-blog/manage-blog.component';
import { ManageBlogCommentComponent } from './components/manage-blog-comment/manage-blog-comment.component';
import { ManageCausesPointsComponent } from './components/manage-causes-points/manage-causes-points.component';
import { ManageCausesDetailsComponent } from './components/manage-causes-details/manage-causes-details.component';
import { ManageContactUsSectionComponent } from './components/manage-contact-us-section/manage-contact-us-section.component';
import { ManageContactUsFormComponent } from './components/manage-contact-us-form/manage-contact-us-form.component';
import { ManageContactUsIconSectionComponent } from './components/manage-contact-us-icon-section/manage-contact-us-icon-section.component';
import { ManageDonateNowComponent } from './components/manage-donate-now/manage-donate-now.component';
import { ManageDonateNowFormComponent } from './components/manage-donate-now-form/manage-donate-now-form.component';
import { ManageEventComponent } from './components/manage-event/manage-event.component';
import { ManageFaqListComponent } from './components/manage-faq-list/manage-faq-list.component';
import { ManageFaqSectionComponent } from './components/manage-faq-section/manage-faq-section.component';
import { ManageFooterSectionAnupamComponent } from './components/manage-footer-section-anupam/manage-footer-section-anupam.component';
import { ManageGalleryComponent } from './components/manage-gallery/manage-gallery.component';
import { ManageGenderComponent } from './components/manage-gender/manage-gender.component';
import { ManageHelpComponent } from './components/manage-help/manage-help.component';
import { ManageHomeCausesComponent } from './components/manage-home-causes/manage-home-causes.component';
import { ManageHomeCausesSectionComponent } from './components/manage-home-causes-section/manage-home-causes-section.component';
import { ManageHomeDonationSectionComponent } from './components/manage-home-donation-section/manage-home-donation-section.component';
import { ManageHomeEventCountSectionComponent } from './components/manage-home-event-count-section/manage-home-event-count-section.component';
import { ManageHomeEventListSectionComponent } from './components/manage-home-event-list-section/manage-home-event-list-section.component';
import { ManageHomeEventSectionComponent } from './components/manage-home-event-section/manage-home-event-section.component';
import { ManageHomeWelcomeSectionComponent } from './components/manage-home-welcome-section/manage-home-welcome-section.component';
import { ManageLatestNewsComponent } from './components/manage-latest-news/manage-latest-news.component';
import { ManageLatestNewsSectionComponent } from './components/manage-latest-news-section/manage-latest-news-section.component';
import { ManageMissionAndGoalsComponent } from './components/manage-mission-and-goals/manage-mission-and-goals.component';
import { ManageRoleComponent } from './components/manage-role/manage-role.component';
import { ManageSettingsComponent } from './components/manage-settings/manage-settings.component';
import { ManageSocialMediaLinkComponent } from './components/manage-social-media-link/manage-social-media-link.component';
import { ManageSponsersComponent } from './components/manage-sponsers/manage-sponsers.component';
import { ManageTellUsFormComponent } from './components/manage-tell-us-form/manage-tell-us-form.component';
import { ManageTellUsSectionComponent } from './components/manage-tell-us-section/manage-tell-us-section.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ManageUserProfileComponent } from './components/manage-user-profile/manage-user-profile.component';
import { ManageVolunteersComponent } from './components/manage-volunteers/manage-volunteers.component';
import { ManageVolunteersSectionComponent } from './components/manage-volunteers-section/manage-volunteers-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    MainDashboardComponent,
    SideBarComponent,
    BreadcrumbComponent,
    ManageBannerComponent,
    ManageBlogComponent,
    ManageBlogCommentComponent,
    ManageCausesPointsComponent,
    ManageCausesDetailsComponent,
    ManageContactUsSectionComponent,
    ManageContactUsFormComponent,
    ManageContactUsIconSectionComponent,
    ManageDonateNowComponent,
    ManageDonateNowFormComponent,
    ManageEventComponent,
    ManageFaqListComponent,
    ManageFaqSectionComponent,
    ManageFooterSectionAnupamComponent,
    ManageGalleryComponent,
    ManageGenderComponent,
    ManageHelpComponent,
    ManageHomeCausesComponent,
    ManageHomeCausesSectionComponent,
    ManageHomeDonationSectionComponent,
    ManageHomeEventCountSectionComponent,
    ManageHomeEventListSectionComponent,
    ManageHomeEventSectionComponent,
    ManageHomeWelcomeSectionComponent,
    ManageLatestNewsComponent,
    ManageLatestNewsSectionComponent,
    ManageMissionAndGoalsComponent,
    ManageRoleComponent,
    ManageSettingsComponent,
    ManageSocialMediaLinkComponent,
    ManageSponsersComponent,
    ManageTellUsFormComponent,
    ManageTellUsSectionComponent,
    ManageUserComponent,
    ManageUserProfileComponent,
    ManageVolunteersComponent,
    ManageVolunteersSectionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
