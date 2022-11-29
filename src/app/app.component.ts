import { Component, NgModule } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd } from '@angular/router';
import {
    Location,
    LocationStrategy,
    PathLocationStrategy,
    HashLocationStrategy
} from '@angular/common';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
        },
    ],
    
})

// @NgModule({
//     declarations: [AppComponent],
//     imports: [BrowserModule],
//     providers: [
//         {
//             provide: LocationStrategy, 
//             useClass: HashLocationStrategy
//         }
//     ],
//     bootstrap: [AppComponent],
// })

export class AppComponent {
    location: any;
    routerSubscription: any;

    constructor(private router: Router, private http: HttpClient) {}

    ngOnInit() {
        this.recallJsFuntions();
        this.checkIsLoggedIn();
    }

    recallJsFuntions() {
        this.routerSubscription = this.router.events
            .pipe(
                filter(
                    (event) =>
                        event instanceof NavigationEnd ||
                        event instanceof NavigationCancel
                )
            )
            .subscribe((event) => {
                this.location = this.router.url;
                if (!(event instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0);
            });
    }

    private async checkIsLoggedIn() {
        let isUserLoggedIn = sessionStorage.getItem('isUserLoggedIn');

        if (isUserLoggedIn == null) {
            console.log('No Session ID');
            this.http
                .get('https://workfromhome.world/api/session/create')
                .subscribe((response) => {
                    interface ReposnseObject {
                        userType: string;
                        isUserLoggedIn: boolean;
                        userId : string;
                    }
                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    console.log(json);
                    sessionStorage.setItem('isUserLoggedIn', JSON.stringify(json.isUserLoggedIn));
                    sessionStorage.setItem('userType', JSON.stringify(json.userType));
                    sessionStorage.setItem('userId', JSON.stringify(json.userId));
                });
        } else {

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
        }
    }
}
