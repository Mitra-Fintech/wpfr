import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-account-page',
    templateUrl: './my-account-page.component.html',
    styleUrls: ['./my-account-page.component.scss'],
})

export class CandidateVerifyOtp implements OnInit {
    public getJsonValue: any;
    public postJsonvalue: any;

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        // this.postMethod();
        this.checkIsLoggedInInsideApp();
    }

    private async postMethod() {
        const header = new HttpHeaders();
        header.set('Content-Type', 'application/x-www-form-urlencoded');
        // let body = {
        //     mobile_number: 'dummy',
        //     password: 'dummy',
        // };
        var mobile_number = (<HTMLInputElement>(
            document.getElementById('mobile_number')
        )).value;

        var password = (<HTMLInputElement>document.getElementById('password'))
            .value;
            
        let session_id = sessionStorage.getItem('session_id') || 'no-session';
        let body = new URLSearchParams();
        body.set('mobile_number', mobile_number);
        body.set('password', password);
        // body.set('session_id', session_id)

        console.log('Api Call : ' + body);

        this.http
            .get('https://workfromhome.world/api/candidate/login?' + body)
            .subscribe((response) => {
                interface ReposnseObject {
                    status: string;
                    status_code : any;
                    isUserLoggedIn: boolean;
                    message : any;
                }
                let json: ReposnseObject = JSON.parse(JSON.stringify(response));
                // console.log(json.isUserLoggedIn);
                console.log(response);
                if (json.status == 'success' && json.status_code != 1300) {
                    this.http
                .get('https://workfromhome.world/api/session/get')
                .subscribe((response) => {
                    interface ReposnseObject {
                        userType: string;
                        isUserLoggedIn: boolean;
                        userId : string;
                    }
                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    console.log(json.isUserLoggedIn);
                    sessionStorage.setItem('isUserLoggedIn', JSON.stringify(json.isUserLoggedIn));
                    sessionStorage.setItem('userType', JSON.stringify(json.userType));
                    sessionStorage.setItem('userId', JSON.stringify(json.userId));
                });
                    this.router.navigate(['/my-profile']);
                } else {
                    alert(json.message)
                    sessionStorage.setItem('isUserLoggedIn', 'false');
                }
            });

        console.log('Ended');
    }

    private async checkIsLoggedInInsideApp() {
        // this.http
        //     .get('http://mitrafintech.com/api/wfh/session')
        //     .subscribe((response) => {
        //         interface ReposnseObject {
        //             status: string;
        //             isUserLoggedIn: boolean;
        //         }
        //         let json: ReposnseObject = JSON.parse(JSON.stringify(response));
        //         console.log(json.isUserLoggedIn);
        //     });

        if (sessionStorage.getItem('isUserLoggedIn') == 'true') {
            this.router.navigate(['/candidate-details']);
        }
    }

    public async registerAccount() {
        let consditions = {
            passwordValid: false,
            emailValid: false,
            mobileNumberValid: false,
        };

        var full_name = (<HTMLInputElement>document.getElementById('full_name'))
            .value;

        var email_id = (<HTMLInputElement>document.getElementById('email_id'))
            .value;

        var register_mobile = (<HTMLInputElement>(
            document.getElementById('register_mobile')
        )).value;

        var register_password = (<HTMLInputElement>(
            document.getElementById('register_password')
        )).value;

        var register_confirm_password = (<HTMLInputElement>(
            document.getElementById('register_confirm_password')
        )).value;

        consditions.emailValid = validateEmail(email_id);
        consditions.passwordValid = validatePassword(register_password, register_confirm_password);
        consditions.mobileNumberValid = validateMobileNumber(register_mobile);
        function validateEmail(email: string) {
            if (
                email.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
            ) {
                return true;
            } else {
                return false;
            }
        }

        function validatePassword(password: any , confirm_password: any) {
            if (password == confirm_password) {
                return true;
            }else{
                return false;
            }
        }
        function validateMobileNumber(mobilenumber:any) {
            if (mobilenumber.match("[6-9]{1}[0-9]{9}")) {
                return true;
            }else{
                return false;
            }
        }

        if (consditions.emailValid == true && consditions.mobileNumberValid == true && consditions.passwordValid == true) {
            
       

        let session_id = sessionStorage.getItem('session_id') || 'no-session';
        let body = new URLSearchParams();
        body.set('name', full_name);
        body.set('email_id', email_id);
        body.set('mobile_number', register_mobile);
        body.set('password', register_password);

        // body.set('password', password);

        this.http
            .get('https://workfromhome.world/api/candidate/signup?' + body)
            .subscribe((response) => {
                interface ReposnseObject {
                    status: string;
                    isUserLoggedIn: boolean;
                }
                let json: ReposnseObject = JSON.parse(JSON.stringify(response));
                // console.log(json.isUserLoggedIn);
                console.log(response);
                if (json.status == 'success') {
                    sessionStorage.setItem('isUserLoggedIn', 'true');
                    this.router.navigate(['/my-profile']);
                } else {
                    sessionStorage.setItem('isUserLoggedIn', 'false');
                }
            });
        }else{}
    }

    onClick() {
        this.postMethod();
    }

}
