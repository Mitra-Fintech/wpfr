import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../common/navbar/navbar.component';

@Component({
    selector: 'app-emp-account',
    templateUrl: './emp-account.html',
    styleUrls: ['./emp-account.scss'],
})
export class VerifyOtpComponent implements OnInit {
    @ViewChild(NavbarComponent) navabar: any;
    public getJsonValue: any;
    public postJsonvalue: any;
    constructor(private http: HttpClient, private router: Router) {}
    // ngAfterViewInit(): void {
    //     // throw new Error('Method not implemented.');
    //     this.navabar.checkUserType();
    // }

    ngOnInit(): void {
        // this.resendOtp()
        
    }

    resendOtp(){
        let session_id =
        sessionStorage
            .getItem('session_id')
            ?.replace('"', '')
            .replace('"', '') || 'no-session';

            let mobile_number =
            sessionStorage
                .getItem('mobile_number')
                ?.replace('"', '')
                .replace('"', '') || 'no-session';

        console.log(mobile_number)
        let body = new URLSearchParams();
        body.set('mobile_number', mobile_number)
        body.set('session_id', session_id)


        this.http
        .get('https://workfromhome.world/api/otp/send?' + body)
        .subscribe((response) => {
            interface ReposnseObject {
                status: string;
                status_code: any;
                isUserLoggedIn: boolean;
                message: any;
            }
            let json: ReposnseObject = JSON.parse(JSON.stringify(response));
            // console.log(json.isUserLoggedIn);
            console.log(response);
        })
    }

    verifyOtp() {
        const header = new HttpHeaders();
        header.set('Content-Type', 'application/x-www-form-urlencoded');
        // let body = {
        //     mobile_number: 'dummy',
        //     password: 'dummy',
        // };
        var mobile_number =   sessionStorage
        .getItem('mobile_number')
        ?.replace('"', '')
        .replace('"', '') || 'no-session';
      
        var otp = (<HTMLInputElement>document.getElementById('otp'))
            .value;
        let session_id =
            sessionStorage
                .getItem('session_id')
                ?.replace('"', '')
                .replace('"', '') || 'no-session';
        let body = new URLSearchParams();
        body.set('mobile_number', mobile_number);
        body.set('otp', otp);
        body.set('session_id', session_id);

        console.log('Api Call : ' + body);

        this.http
            .get('https://workfromhome.world/api/otp/verify?' + body)
            .subscribe((response) => {
                interface ReposnseObject {
                    status: string;
                    status_code: any;
                    isUserLoggedIn: boolean;
                    message: any;
                }
                let json: ReposnseObject = JSON.parse(JSON.stringify(response));
                // console.log(json.isUserLoggedIn);
                console.log(response);
                if (json.status == 'success' && json.status_code != 1300) {
                    let session_id = sessionStorage.getItem('session_id') || '';
                    session_id = session_id.replace('"', '');
                    this.http
                        .get(
                            'https://workfromhome.world/api/session/get?session_id=' +
                                session_id.replace('"', '')
                        )
                        .subscribe((response) => {
                            interface ReposnseObject {
                                isUserLoggedIn: boolean;
                                userType: any;
                                userId: any;
                            }
                            let json: ReposnseObject = JSON.parse(
                                JSON.stringify(response)
                            );
                            console.log(json.isUserLoggedIn);
                            sessionStorage.setItem(
                                'isUserLoggedIn',
                                JSON.stringify(json.isUserLoggedIn)
                            );
                            sessionStorage.setItem(
                                'userType',
                                JSON.stringify(json.userType)
                            );
                            sessionStorage.setItem(
                                'userId',
                                JSON.stringify(json.userId)
                            );
                        });
                    this.router.navigate(['/']);
                    // window.location.reload();
                } else {
                    alert(json.message);
                    sessionStorage.setItem('isUserLoggedIn', 'false');
                }
            });

        console.log('Ended');
    }
}
