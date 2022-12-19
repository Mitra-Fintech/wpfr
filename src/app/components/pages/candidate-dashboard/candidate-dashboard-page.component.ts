import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-candidate-dashboard-page',
    templateUrl: './candidate-dashboard-page.component.html',
    styleUrls: ['./candidate-dashboard-page.component.scss'],
})
export class CandidateDashboardPageComponent implements OnInit {
    public objToArray: any;
    public arraySize: any;
    public applyDetails: any;
    public applyArrayLen: any;
    public finalArray: any[] = [];



    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.checkIsLoggedIn()
        this.getJobListing();
        this.getAppliedJobListing();
    }
    private async checkIsLoggedIn() {
        let isUserLoggedIn = sessionStorage.getItem('session_id');
    
        if (isUserLoggedIn == null) {
            console.log('No Session ID');
            this.http
                .get('https://workfromhome.world/api/session/create')
                .subscribe((response) => {
                    interface ReposnseObject {
                        userType: string;
                        isUserLoggedIn: boolean;
                        userId : string;
                        session_id: string;
                    }
                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json);
                    // sessionStorage.setItem('isUserLoggedIn', JSON.stringify(json.isUserLoggedIn));
                    // sessionStorage.setItem('userType', JSON.stringify(json.userType));
                    // sessionStorage.setItem('userId', JSON.stringify(json.userId));
                    // sessionStorage.setItem('session_id', JSON.stringify(json.session_id));
    
                    if((json.isUserLoggedIn == true ) && json.userType == "candidate")
                    {
                        this.getUserDetails();
                    }else{
                        this.router.navigateByUrl('/candidate');
                    }
    
                });
        } else {
            let session_id = sessionStorage.getItem('session_id') || '';
            session_id = session_id.replace('"','');
    
    
            this.http
                .get('https://workfromhome.world/api/session/get?session_id=' + session_id?.replace('"',''))
                .subscribe((response) => {
                    interface ReposnseObject {
                        userType: string;
                        isUserLoggedIn: boolean;
                        userId : string;
                    }
                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json);
                    if((json.isUserLoggedIn == true ) && json.userType == "candidate") {
                        this.getUserDetails();
                    }else{
                        this.router.navigateByUrl('/candidate');
                    }
                });
        }
    }
    getUserDetails() {
        // this.http.get('https://workfromhome.world/api/job/list?company_id=1').subscribe();

        let user_id = sessionStorage.getItem('userId') || 'no-user-id';

        user_id = user_id.replace('"', '').replace('"', '');

        this.http
            .get('https://workfromhome.world/api/candidate/details?id='+user_id)
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

                console.log(this.objToArray[0][1]);

                // console.log(responseObj.status);
            });
    }

    idPass(data: any) {
        console.log(data);
        // localStorage.clear();
        localStorage.setItem('job_id', JSON.stringify(data));
    }

    getAppliedJobListing()  {
        
        this.applyDetails = localStorage.getItem('applied_job_id');
        this.applyDetails = JSON.parse(this.applyDetails);
        this.applyArrayLen = this.applyDetails.length;
        console.log(this.applyDetails);
        
        for(let ad of this.applyDetails)  
        {
            this.http
            .get('https://workfromhome.world/api/job/details?job_id='+ad)
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
                
                this.finalArray.push(this.objToArray[0][1]);

                // console.log(this.objToArray[0][1]);

                // console.log(responseObj.status);
            });

        }
        console.log(this.finalArray);
    }

}
