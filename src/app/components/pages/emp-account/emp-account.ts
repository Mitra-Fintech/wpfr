import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../common/navbar/navbar.component';

@Component({
    selector: 'app-emp-account',
    templateUrl: './emp-account.html',
    styleUrls: ['./emp-account.scss'],
})
export class EmployLoginComponent implements OnInit {
    @ViewChild(NavbarComponent) navabar: any;
    public getJsonValue: any;
    public postJsonvalue: any;
    public checkForError: any;
    constructor(private http: HttpClient, private router: Router) {}
    // ngAfterViewInit(): void {
    //     // throw new Error('Method not implemented.');
    //     this.navabar.checkUserType();
    // }

    ngOnInit(): void {
        this.checkIsLoggedIn();
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
                        this.router.navigateByUrl('/candidate/my-dashboard');
                    }else if((json.isUserLoggedIn == true ) && json.userType == "company")
                    {
                        this.router.navigateByUrl('/emoployer/my-dashboard');
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
                    if((json.isUserLoggedIn == true ) && json.userType == "candidate")
                    {
                        this.router.navigateByUrl('/candidate/my-dashboard');
                    }else if((json.isUserLoggedIn == true ) && json.userType == "company")
                    {
                        this.router.navigateByUrl('/employer/my-dashboard');
                    }
                });
        }
    }
    public async registerAccount() {
        console.log('Registering')
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
        consditions.passwordValid = validatePassword(
            register_password,
            register_confirm_password
        );
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

        function validatePassword(password: any, confirm_password: any) {
            if (password == confirm_password) {
                return true;
            } else {
                return false;
            }
        }
        function validateMobileNumber(mobilenumber: any) {
            if (mobilenumber.match('[6-9]{1}[0-9]{9}')) {
                return true;
            } else {
                return false;
            }
        }

        if (
            consditions.emailValid == true &&
            consditions.mobileNumberValid == true &&
            consditions.passwordValid == true
        ) {
            let session_id =
                sessionStorage.getItem('session_id') || 'no-session';
            session_id = session_id.replace('"', '');
            sessionStorage.setItem('mobile_number', register_mobile);

            let body = new URLSearchParams();
            body.set('name', full_name);
            body.set('email_id', email_id);
            body.set('mobile_number', register_mobile);
            body.set('password', register_password);
            body.set('session_id', session_id.replace('"', ''));

            // body.set('password', password);

            this.http
                .get('https://workfromhome.world/api/company/signup?' + body)
                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        isUserLoggedIn: boolean;
                    }
                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json.isUserLoggedIn);
                    console.log("hello");
                    console.log(response);
                    
                    this.checkForError = Object.entries(response);
                    console.log(this.checkForError);

                    if(this.checkForError[1][1] == 1300){
                        window.alert(this.checkForError[2][1]);
                    }

                    if (json.status == 'success') {
                        let session_id =
                            sessionStorage.getItem('session_id') || '';
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
                        // this.router.navigate(['/']);
                        this.router.navigate(['/verify-otp'], {
                            skipLocationChange: false,
                        });
                    } else {
                        sessionStorage.setItem('isUserLoggedIn', 'false');
                    }
                });
        } else {
            console.log('No session');
            console.log(consditions)
        }
    }

    onClick() {
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
        let session_id =
            sessionStorage
                .getItem('session_id')
                ?.replace('"', '')
                .replace('"', '') || 'no-session';
        let body = new URLSearchParams();
        body.set('mobile_number', mobile_number);
        body.set('password', password);
        body.set('session_id', session_id);

        console.log('Api Call : ' + body);

        this.http
            .get('https://workfromhome.world/api/company/login?' + body)
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
                    this.router.navigate(['/employer/my-dashboard']);
                    // window.location.reload();
                } else {
                    alert(json.message);
                    sessionStorage.setItem('isUserLoggedIn', 'false');
                }
            });

        console.log('Ended');
    }
}
