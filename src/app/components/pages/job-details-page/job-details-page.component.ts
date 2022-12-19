import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as module from 'src/app/components/pages/job-listings-page/job-listings-page.component';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-job-details-page',
    templateUrl: './job-details-page.component.html',
    styleUrls: ['./job-details-page.component.scss'],
})
export class JobDetailsPageComponent implements OnInit {
    // objToArray: any;
    public job_details: any;
    public id: any;
    public jobToArray: any;
    
    public postajob = false;

    public user_type: any;
    // public job_listing_data!: string;

    constructor(private http: HttpClient, private router: Router) {}
    // constructor(private _Activatedroute:ActivatedRoute) { }

    ngOnInit(): void {
        // let user_type = sessionStorage.getItem('userType');
        // // console.log(typeof user_type);
        // // console.log("hrllo");
        // if (user_type === "candidate") {
        //     this.postajob = true;
        //     console.log("this is exe");
        // }
        this.checkCanApply();
        this.getJobDetails();
    }
    checkCanApply() {
        this.user_type = sessionStorage.getItem('userType');
        
        // console.log(typeof user_type);
        // console.log("hrllo");
        
        this.user_type = this.user_type.replace('"', '');
        this.user_type = this.user_type.replace('"', '');

        if (this.user_type == "candidate") {
            this.postajob = true;
            
        }

        else{
            console.log(this.user_type);
        }
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
