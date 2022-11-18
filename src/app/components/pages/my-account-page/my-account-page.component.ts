import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-account-page',
    templateUrl: './my-account-page.component.html',
    styleUrls: ['./my-account-page.component.scss'],
})
export class MyAccountPageComponent implements OnInit {
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
        body.set('session_id', session_id)

        console.log('Api Call : ' + body);

        this.http
            .get('/api/candidate/login?' + body)
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
                    this.router.navigate(['/candidate-details']);

                }else{
                    sessionStorage.setItem('isUserLoggedIn', 'false');
                }
            });

        console.log('Ended');
    }

    private async checkIsLoggedInInsideApp() {
        // this.http
        //     .get('/api/session')
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

    onClick() {
        this.postMethod();
    }
}
