import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-job-listings-page',
    templateUrl: './job-listings-page.component.html',
    styleUrls: ['./job-listings-page.component.scss']
})

export class JobListingsPageComponent implements OnInit {
    public getJsonValue: any;
    public postJsonValue: any;
    public objToArray: any;
    public arraySize: any;
    public count = 1;
    public bmkArr:any[] = [];
    public canBmked: any = false;
    public dataArray: any;
    
    public user_type: any;

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.checkCanBeBookmarked();
        this.getJobListing();
    }

    checkCanBeBookmarked() {
        this.user_type = sessionStorage.getItem('userType');
        this.user_type = this.user_type.replace('"', '');
        this.user_type = this.user_type.replace('"', '');
        
        if (this.user_type == "candidate") {
          this.canBmked = true;
          
        }
    }

    getJobListing() {
        // this.http.get('https://workfromhome.world/api/job/list?company_id=1').subscribe();

        let user_id = sessionStorage.getItem('userId') || 'no-user-id';

        user_id = user_id.replace('"', '').replace('"', '');

        this.http
            .get('https://workfromhome.world/api/job/recent' + '?limit=10')
            
            .subscribe((response) => {
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

                // localStorage.setItem('job_listing_data',JSON.stringify(dataJson));

                this.objToArray = Object.entries(dataJson);

                this.arraySize = this.objToArray.length;

                console.log(this.objToArray[2][1]);

                // console.log(responseObj.status);
            });
    }

    idPass(data: any) {
        console.log(data);
        // localStorage.clear();
        localStorage.setItem('job_id', JSON.stringify(data));
    }
   

    idPassBmrk(data: number) {
        console.log(data);
        console.log("hrllo");
        // localStorage.clear();
        this.dataArray = localStorage.getItem('bmk_id');
        this.dataArray = JSON.parse(this.dataArray);

        if(this.dataArray.includes(data))
        {
            window.alert("Job Already Bookmarked");

        }
        else{
            this.bmkArr.push(data);
            localStorage.setItem('bmk_id', JSON.stringify(this.bmkArr));
            window.alert("Job Bookmarked");
        }
        // let job_details = localStorage.getItem('job_id');
        // job_details = JSON.parse(job_details);
        

        // this.bmkArr.push(this.count);
        // console.log(this.bmkArr);

    }

    
}
