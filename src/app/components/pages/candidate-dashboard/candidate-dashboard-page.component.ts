import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-candidate-dashboard-page',
    templateUrl: './candidate-dashboard-page.component.html',
    styleUrls: ['./candidate-dashboard-page.component.scss'],
})
export class CandidateDashboardPageComponent implements OnInit {
    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.checkIsLoggedIn();
        this.checkAccountVerificationStatus();
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
                    if (
                        json.isUserLoggedIn == true &&
                        json.userType == 'candidate'
                    ) {
                    } else {
                        this.router.navigateByUrl('/candidate');
                    }
                });
        }
    }

    private async checkAccountVerificationStatus(){
        let mobile_number = sessionStorage.getItem('mobile_number') || '';
        mobile_number = mobile_number.replace('"', '').replace('"', '');
        let user_type = sessionStorage.getItem('userType') || '';
        user_type = user_type.replace('"', '').replace('"', '');
        
        this.http
                .get(
                    'https://workfromhome.world/api/account/verify-status?mobile_number=' +
                        mobile_number + '&user_type=' + user_type
                )
                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        code: boolean;
                        data: string;
                    }
                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    if (json.data == "0") {
                        this.router.navigateByUrl('/verify-otp');
                    } else {
                        this.router.navigateByUrl('/candidate-dashboard');
                    }
                });


    }
}
