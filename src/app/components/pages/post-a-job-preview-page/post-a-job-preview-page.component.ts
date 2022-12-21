import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as module from 'src/app/components/pages/job-listings-page/job-listings-page.component';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Toolbar } from 'ngx-editor';

@Component({
    selector: 'app-post-a-job-preview-page',
    templateUrl: './post-a-job-preview-page.component.html',
    styleUrls: ['./post-a-job-preview-page.component.scss'],
})
export class PostAJobPreview implements OnInit {
    // objToArray: any;
    public job_details: any;
    public id: any;
    public jobToArray: any;
    public postajob = false;
    public user_id: any;
    public applyArray:any[] = [];
    public previewJobDetails: any;

    editor: any;
    html: any;

    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];


    // public job_listing_data!: string;

    constructor(private http: HttpClient, private router: Router) {}
    // constructor(private _Activatedroute:ActivatedRoute) { }

    ngOnInit(): void {

        // this.getJobDetails();

        this.previewJobDetails = localStorage.getItem('previewObj');
        this.previewJobDetails = JSON.parse(this.previewJobDetails);


        console.log(this.previewJobDetails);

        // let postajobstatus = sessionStorage.getItem('post-a-job');
        // if (postajobstatus == 'true') {
        //     this.postajob = true;
        // }
    }


    createJob(){

        let title = this.previewJobDetails.job_title;
        let description = this.previewJobDetails.job_description;
        let category_id = this.previewJobDetails.category_id;
        let type_id = this.previewJobDetails.type_id;
        let tags = this.previewJobDetails.tags;
        let gender = this.previewJobDetails.gender;
        let salary_type = this.previewJobDetails.salary_type;
        let minimum_salary = this.previewJobDetails.minimum_salary;
        let maximum_salary = this.previewJobDetails.maximum_salary;
        let experience = this.previewJobDetails.experience;
        let career_level = this.previewJobDetails.career_level;
        let qualification = this.previewJobDetails.qualification;
        let introduction_video_url = this.previewJobDetails.introduction_video_url;
        let deadline = this.previewJobDetails.deadline;


        // let friendly_address = (<HTMLInputElement>document.getElementById('friendly_address')).value;
        // let location = (<HTMLInputElement>document.getElementById('location')).value;
       
        // let otp = (<HTMLInputElement>document.getElementById('otp')).value;

        let session_id =
        sessionStorage.getItem('session_id') || 'no-session';
    session_id = session_id.replace('"', '');
        
        let body = new URLSearchParams();

        body.set('title', title);
        body.set('description', description);
        body.set('category_id', category_id)
        body.set('type_id',type_id)
        body.set('tags', tags)
        body.set('gender', gender)
        body.set('salary_type', salary_type)
        body.set('minimum_salary', minimum_salary)
        body.set('maximum_salary', maximum_salary)
        body.set('experience', experience)
        body.set('career_level', career_level)
        body.set('qualification', qualification)
        body.set('introduction_video_url', introduction_video_url)
        body.set('deadline', deadline)
        body.set('friendly_address', "null")
        body.set('location', "null")
        body.set('session_id', session_id.replace('"', ''));
    

        this.http
        .get('https://workfromhome.world/api/job/post?' + body)
        .subscribe((response) => {
            interface ReposnseObject {
                status: string;
                status_code: any;
                data: object;
            }  
            interface DataObject {
                job_created: boolean
            }
            let json: ReposnseObject = JSON.parse(JSON.stringify(response));
            let DataJson: DataObject = JSON.parse(JSON.stringify(json.data));
            // console.log(json.isUserLoggedIn);
            console.log(DataJson.job_created);

            if(DataJson.job_created){
                alert('Job Posted successfully')
                this.router.navigate(['/jobs/posted'], {
                                    skipLocationChange: false,})
            }
            else{
                alert('Something went wrong')
            }
        })

    }

    getJobDetails() {
        // console.log(environment.apiHost);

        this.job_details = localStorage.getItem('job_id');

        this.job_details = JSON.parse(this.job_details);

        // console.log(typeof this.job_details)

        this.http
            .get(
                'https://workfromhome.world/api/job/details?job_id=' +this.job_details
            )
            .subscribe((response: any) => {
                interface ResponseObject {
                    status: string;
                    code: any;
                    data: Object;
                    // session_id: string;
                }

                interface DataArrayObject {
                    // job_title: string;
                    array: Object;
                }

                let responseObj: ResponseObject = JSON.parse(
                    JSON.stringify(response)
                );

                let dataJson: DataArrayObject = JSON.parse(
                    JSON.stringify(responseObj.data)
                );

                this.jobToArray = Object.entries(dataJson);

                console.log(this.jobToArray[0][1]);
            });
    }


    
}
