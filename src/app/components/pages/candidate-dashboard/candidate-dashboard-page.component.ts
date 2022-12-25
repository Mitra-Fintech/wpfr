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
    public statArray: any;

    public applyDetails: any;
    public applyJobId: any;
    public user_id: any;
    public idArray: any[] = [];
    public jobToArray: any;
    public finalArray: any[] = [];
    public dummyArray: any[] = [];
    public dummyArray2: any[] = [];
    public ids: any;
    public jobId: any;
    public i:number=0;

    public finalArraySize: any;

    public job_det: any;
    public facebookImg: boolean = true;
    public linkedinImg: boolean = true;
    public instaImg: boolean = true;
    public twitterImg: boolean = true;
    public behanceImg: boolean = true;

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.checkIsLoggedIn();
        this.getUserDetails();
        this.getJobIdDetails();
    }
    isMobileVerified() {
        // throw new Error('Method not implemented.');

        let mobile_number = sessionStorage.getItem('mobile_number') || '';
        mobile_number = mobile_number.replace('"', '').replace('"', '');

        let usertype = sessionStorage.getItem('userType') || '';
        usertype = usertype.replace('"', '').replace('"', '');

        this.http
            .get(
                'https://workfromhome.world/api/account/verify-status?user_type=' +
                    usertype +
                    '&mobile_number=' +
                    mobile_number
            )
            .subscribe((response) => {
                interface ReposnseObject {
                    status: any;
                    code: any;
                    data: any;
                }
                let json: ReposnseObject = JSON.parse(JSON.stringify(response));
                // console.log(json);
                if (json.data == 1 || json.data == '1') {
                    this.getUserDetails();
                } else {
                    this.router.navigateByUrl('/verify-otp');
                }
            });
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
                        userId: string;
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

                    if (
                        json.isUserLoggedIn == true &&
                        json.userType == 'candidate'
                    ) {
                        this.getUserDetails();
                    } else {
                        this.router.navigateByUrl('/candidate');
                    }
                });
        } else {
            let session_id = sessionStorage.getItem('session_id') || '';
            session_id = session_id.replace('"', '');

            this.http
                .get(
                    'https://workfromhome.world/api/session/get?session_id=' +
                        session_id?.replace('"', '')
                )
                .subscribe((response) => {
                    interface ReposnseObject {
                        userType: string;
                        isUserLoggedIn: boolean;
                        userId: string;
                    }
                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json);
                    if (
                        json.isUserLoggedIn == true &&
                        json.userType == 'candidate'
                    ) {
                        this.isMobileVerified();
                        // this.getUserDetails();
                    } else {
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
            .get(
                'https://workfromhome.world/api/candidate/details?id=' + user_id
            )
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
                if(this.objToArray[0][1].facebook == null){
                    this.facebookImg = false;
                }

                if(this.objToArray[0][1].linkedin == null){
                    this.linkedinImg = false;
                }

                if(this.objToArray[0][1].behance == null){
                    this.behanceImg = false;
                }

                if(this.objToArray[0][1].twitter == null){
                    this.twitterImg = false;
                }

                if(this.objToArray[0][1].instagram == null){
                    this.instaImg = false;
                }

                // console.log(responseObj.status);
            });
    }

    
    getJobIdDetails()  {
        
        this.user_id = sessionStorage.getItem('userId') || 'no-user-id';

        this.user_id = this.user_id.replace('"', '').replace('"', '');

        this.http
        .get('https://workfromhome.world/api/candidate/applications?candidate_id='+this.user_id)

        .subscribe((response) => {
            
            interface ResponseObject {
                status: string;
                code: any;
                search_length: any;
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

                    this.applyDetails = Object.entries(dataJson);
                    // this.dummyArray.push(this.applyDetails);
                    // console.log("hii");
                    console.log(this.applyDetails);
                    
                    
                    // this.finalArray.push(this.objToArray[0][1]);

                    // this.applyJobId = this.applyDetails[0][2].job_id;
            
            this.getJobDetails(this.applyDetails);
             // console.log(this.applyDetails);
            // this.getJobDetails(this.applyDetails[0][1]);
            
            });
        }

        getJobDetails(detailArray: any[]) {
            // this.dummyArray = detailArray
            console.log(detailArray);
            // console.log(detailArray);
            
            // for (this.ids of detailArray) {
            //     this.idArray.push(this.ids[1].job_id);
            // }
            // console.log(detailArray);


            for (this.jobId of detailArray) {
                // console.log(parseInt(this.jobId[1].job_id, 10));

                // for(this.jobId[1] of detailArray){

                
                
                this.http
                .get('https://workfromhome.world/api/job/details?job_id='+parseInt(this.jobId[1].job_id, 10))
                
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
                    
                    this.statArray = Object.entries(dataJson);
                    // console.log(this.statArray);
                    // this.dummyArray.push(this.statArray);
                    // console.log(this.statArray[0][1]);x  
                    this.finalArray.push(this.statArray[0][1]);

                    // console.log(this.jobId[1]);
                    this.finalArraySize = this.finalArray.length;
                });
                // console.log(this.jobId[1]);
            }
            console.log(this.finalArray)
        }
        
        
        idPass(data: any) {
            console.log(data);
            // localStorage.clear();
            localStorage.setItem('job_id', JSON.stringify(data));
        }
}
