import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employer-dashboard-page',
    templateUrl: './employer-dashboard-page.component.html',
    styleUrls: ['./employer-dashboard-page.component.scss'],
})
export class EmployerDashboardPageComponent implements OnInit {
    public empDashArray: any;
    public empDasharraySize: any;
    public empDashLimitArray: any[] = [];

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.checkIsLoggedIn();
        this.getJobList();
        this.grretings
    }

    private grretings() {
        let today: Date = new Date();
        let curHr: any = today.getHours();

        if (curHr < 12) {
            console.log('good morning');
        } else if (curHr < 18) {
            console.log('good afternoon');
        } else {
            console.log('good evening');
        }
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
                        json.userType == 'company'
                    ) {
                    } else {
                        this.router.navigateByUrl('/company');
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
                        json.userType == 'company'
                    ) {
                    } else {
                        this.router.navigateByUrl('/company');
                    }
                });
        }
    }

    getJobList() {
        // this.http.get('https://workfromhome.world/api/job/list?company_id=1').subscribe();

        let user_id = sessionStorage.getItem('userId') || 'no-user-id';

        user_id = user_id.replace('"', '').replace('"', '');

        this.http
            .get('https://workfromhome.world/api/job/list' + '?company_id=' + user_id)
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

                this.empDashArray = Object.entries(dataJson);
                
                if(this.empDashArray.length == 0) {
                    this.empDasharraySize = 0;
                }
                
                else if(this.empDashArray.length == 1) {
                    this.empDashLimitArray.push(this.empDashArray[0]);
                }
                
                else{
                    for(let i = 0; i < 2; i++) {
                        this.empDashLimitArray.push(this.empDashArray[i]);
                    }
                }

                this.empDasharraySize = localStorage.getItem('active_jobs');
                
                // this.empDasharraySize = this.empDashArray.length;
                // console.log(this.empDashArray[2][1]);

                // console.log(responseObj.status);
            });
    }

    empidPass(data: any) {
        console.log(data);
        // localStorage.clear();
        localStorage.setItem('job_id', JSON.stringify(data));
    }
}
