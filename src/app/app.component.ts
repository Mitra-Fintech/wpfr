import { Component } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd } from '@angular/router';
import {
    Location,
    LocationStrategy,
    PathLocationStrategy,
} from '@angular/common';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
    ],
})
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
        let session_id = sessionStorage.getItem('session_id');

        if (session_id == null) {
            console.log('No Session ID');
            this.http
                .get('http://api.mitrafintech.com/wfh/session?new=true')
                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        session_id: string;
                    }
                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    console.log(json);
                    sessionStorage.setItem('session_id', json.session_id);
                });
        } else {

            this.http
                .get('http://api.mitrafintech.com/wfh/session?new=false&session_id=' + session_id)
                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        isUserLoggedIn: boolean;
                    }
                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    console.log(json.isUserLoggedIn);
                    sessionStorage.setItem('isUserLoggedIn', JSON.stringify(json.isUserLoggedIn));
                });
        }
    }
}
