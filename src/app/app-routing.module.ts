import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { CandidateDetailsPageComponent } from './components/pages/candidate-details-page/candidate-details-page.component';
import { CandidatesPageComponent } from './components/pages/candidates-page/candidates-page.component';
import { CategoriesPageComponent } from './components/pages/categories-page/categories-page.component';
import { CompaniesPageComponent } from './components/pages/companies-page/companies-page.component';
import { CompanyDetailsPageComponent } from './components/pages/company-details-page/company-details-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { JobDetailsPageComponent } from './components/pages/job-details-page/job-details-page.component';
import { JobListingsPageComponent } from './components/pages/job-listings-page/job-listings-page.component';
import { MainHomeComponent } from './components/pages/main-home/main-home.component';
import { MyAccountPageComponent } from './components/pages/candidate-account-page/my-account-page.component';
import { PostAJobPageComponent } from './components/pages/post-a-job-page/post-a-job-page.component';
import { PricingPageComponent } from './components/pages/pricing-page/pricing-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { TermsConditionsPageComponent } from './components/pages/terms-conditions-page/terms-conditions-page.component';
import { EmployLoginComponent } from './components/pages/emp-account/emp-account';
import { MyProfileCandidatesComponent } from './components/pages/my-profile-candidate/candidate-details-page.component';
import { MyCompanyDetailsPageComponent } from './components/pages/my-profile-employer/company-details-page.component';

import { CandidateVerifyOtp} from './components/pages/candidate-verify-otp-page/candidate-page.component';
import {VerifyOtpComponent} from './components/pages/verify-otp/emp-account'
import { CandidateDashboardPageComponent } from './components/pages/candidate-dashboard/candidate-dashboard-page.component'
import { EmployerDashboardPageComponent } from './components/pages/employer-dashboard/employer-dashboard-page.component'
import { CompanyJobListingsPageComponent } from './components/pages/company-jobs-posted/company-jobs-posted-page.component';
import { CandidateMyProfileEdit } from './components/pages/candidate-my-profile-edit/candidate-my-profile-edit-page.component';
import { PostAJobPageEditComponent } from './components/pages/post-a-job-edit-page/post-a-job-edit-page.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password-ui/forgot-password-page.component';


const routes: Routes = [
    {path: '', component: MainHomeComponent},
    {path: 'about', component: AboutPageComponent},
    {path: 'jobs/listings', component: JobListingsPageComponent},
    {path: 'jobs/details', component: JobDetailsPageComponent},
    {path: 'post-a-job', component: PostAJobPageComponent},
    {path: 'companies', component: CompaniesPageComponent},
    {path: 'company-details', component: CompanyDetailsPageComponent},
    {path: 'pricing', component: PricingPageComponent},
    {path: 'categories', component: CategoriesPageComponent},
    {path: 'candidates', component: CandidatesPageComponent},
    // {path: 'candidate/details', component: CandidateDetailsPageComponent},
    {path: 'candidate/dashboard', component: CandidateDashboardPageComponent},
    {path: 'employer/dashboard', component: EmployerDashboardPageComponent},
    {path: 'faq', component: FaqPageComponent},
    {path: 'privacy-policy', component: PrivacyPolicyPageComponent},
    {path: 'terms-conditions', component: TermsConditionsPageComponent},
    {path: 'candidate', component: MyAccountPageComponent},
    {path: 'blog', component: BlogPageComponent},
    {path: 'blog-details', component: BlogDetailsPageComponent},
    {path: 'contact', component: ContactPageComponent},
    {path: 'employer', component: EmployLoginComponent},
    {path: 'jobs/edit', component: PostAJobPageEditComponent},
    {path: 'candidate/verify-otp', component: CandidateVerifyOtp},
    {path: 'my-details', component: MyCompanyDetailsPageComponent},
    {path: 'verify-otp', component: VerifyOtpComponent},
    {path: 'jobs/posted', component: CompanyJobListingsPageComponent},

    {path: 'candidate/my-profile/edit', component: CandidateMyProfileEdit},
    {path: 'candidate/my-profile', component: CandidateDetailsPageComponent},
    
    {path: 'employer/my-profile', component: MyCompanyDetailsPageComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},


    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

