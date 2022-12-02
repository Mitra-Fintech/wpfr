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
import { MyAccountPageComponent } from './components/pages/candidate-account/my-account-page.component';
import { PostAJobPageComponent } from './components/pages/post-a-job-page/post-a-job-page.component';
import { PricingPageComponent } from './components/pages/pricing-page/pricing-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { TermsConditionsPageComponent } from './components/pages/terms-conditions-page/terms-conditions-page.component';
import { EmployLoginComponent } from './components/pages/emp-account/emp-account';
import { MyProfileCandidatesComponent } from './components/pages/my-profile-candidate/candidate-details-page.component';
import { MyCompanyDetailsPageComponent } from './components/pages/my-details/company-details-page.component';


const routes: Routes = [
    {path: '', component: MainHomeComponent},
    {path: 'about', component: AboutPageComponent},
    {path: 'job-listings', component: JobListingsPageComponent},
    {path: 'job-details', component: JobDetailsPageComponent},
    {path: 'post-a-job', component: PostAJobPageComponent},
    {path: 'companies', component: CompaniesPageComponent},
    {path: 'company-details', component: CompanyDetailsPageComponent},
    {path: 'pricing', component: PricingPageComponent},
    {path: 'categories', component: CategoriesPageComponent},
    {path: 'candidates', component: CandidatesPageComponent},
    {path: 'candidate-details', component: CandidateDetailsPageComponent},
    {path: 'faq', component: FaqPageComponent},
    {path: 'privacy-policy', component: PrivacyPolicyPageComponent},
    {path: 'terms-conditions', component: TermsConditionsPageComponent},
    {path: 'candidate', component: MyAccountPageComponent},
    {path: 'blog', component: BlogPageComponent},
    {path: 'blog-details', component: BlogDetailsPageComponent},
    {path: 'contact', component: ContactPageComponent},
    {path: 'company', component: EmployLoginComponent},
    {path: 'my-profile', component: MyProfileCandidatesComponent},
    {path: 'my-details', component: MyProfileCandidatesComponent},

    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

