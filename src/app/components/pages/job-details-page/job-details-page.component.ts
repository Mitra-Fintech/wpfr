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
    public user_id: any;
    public applyArray:any[] = [];


    // public job_listing_data!: string;

    constructor(private http: HttpClient, private router: Router) {}
    // constructor(private _Activatedroute:ActivatedRoute) { }

    ngOnInit(): void {
        this.getJobDetails();
        let postajobstatus = sessionStorage.getItem('post-a-job');
        if (postajobstatus == 'true') {
            this.postajob = true;
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

    showApplyNowButton() {
        let str = sessionStorage.getItem('userType') || 'not-set';
        str = str.replace('"', '');
        str = str.replace('"', '');
        console.log(str);

        if (str == 'candidate') {
            return true;
        } else {
            return false;
        }
    }

    applyNow(data: any){
        this.user_id = sessionStorage.getItem('userId');
        this.user_id = this.user_id.replace('"', '');
        this.user_id = this.user_id.replace('"', '');
        console.log(data);
        console.log(this.user_id);

        this.http
            .get(
                'https://workfromhome.world/api/job/apply?candidate_id='+this.user_id+'&job_id='+data
            )
            .subscribe((response: any) => {
                interface ResponseObject {
                    status: string;
                    code: any;
                    // data: Object;
                    // session_id: string;
                }

                // interface DataArrayObject {
                //     // job_title: string;
                //     array: Object;
                // }

                let responseObj: ResponseObject = JSON.parse(
                    JSON.stringify(response)
                );

                // let dataJson: DataArrayObject = JSON.parse(
                //     JSON.stringify(responseObj.data)
                // );

                // this.jobToArray = Object.entries(dataJson);
                
                responseObj.status = JSON.stringify(responseObj.status);
                console.log(responseObj.status);
                responseObj.status = responseObj.status.replace('"', '');
                responseObj.status = responseObj.status.replace('"', '');
                
                if(responseObj.status === "success"){
                    
                    this.applyArray.push(data);
                    localStorage.setItem('applied_job_id', JSON.stringify(this.applyArray));

                    // localStorage.setItem('applied_job_id',data);
                    window.alert("Job Applied Successfully");

                }
                else{
                    window.alert("Invalid Job");
                }
            });




    }
}
