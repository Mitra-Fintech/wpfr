import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    public isUserLoggedIn = false;
    public postajob = false;
    i = 0;
    subscription: Subscription = new Subscription();
    everyFiveSeconds: Observable<number> = timer(0, 1000);

    constructor(private http: HttpClient, private router: Router) {}
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

    ngOnInit(): void {
        this.subscription = this.everyFiveSeconds.subscribe(() => {
            this.checkUserType();
        });
        this.router.events.subscribe((val: any) => {
            if (val.url) {
                // console.log("Url Change" + this.i+1);
                // this.i++;
                console.log(this.isUserLoggedIn);
                let status = sessionStorage
                    .getItem('isUserLoggedIn')
                    ?.replace('"', '')
                    .replace('"', '');
                if (status == '1') this.isUserLoggedIn = true;

                console.log(this.isUserLoggedIn);
                let postajobstatus = sessionStorage.getItem('post-a-job');
                if (postajobstatus == 'true') this.postajob = true;
            }
        });

        this.checkUserType();
    }

    switcherClassApplied = false;
    switcherToggleClass() {
        this.switcherClassApplied = !this.switcherClassApplied;
    }

    searchClassApplied = false;
    searchToggleClass() {
        this.searchClassApplied = !this.searchClassApplied;
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }
    logout() {
        sessionStorage.removeItem('isUserLoggedIn');
        sessionStorage.removeItem('session_id');
        sessionStorage.removeItem('userType');
        this.isUserLoggedIn = false;
        sessionStorage.setItem('post-a-job', 'false');
        this.postajob = false;
        this.router.navigate(['/']);
    }

    checkUserType() {
        // console.log
        let str = sessionStorage.getItem('userType') || 'not-set';
        str = str.replace('"', '');
        str = str.replace('"', '');
        console.log(str);

        if (str == 'company') {
            sessionStorage.setItem('post-a-job', 'true');
            this.postajob = true;
            this.isUserLoggedIn = true;
            return true;
        } else if (str == 'candidate') {
            sessionStorage.setItem('post-a-job', 'false');
            this.isUserLoggedIn = true;
            this.postajob = false;
            return true;
        } else {
            sessionStorage.setItem('post-a-job', 'false');
            // this.isUserLoggedIn = true
            // this.postajob = false
            return true;
        }
    }

    openMyProfile() {
        let str = sessionStorage.getItem('userType') || 'not-set';
        str = str.replace('"', '');
        str = str.replace('"', '');
        console.log(str);

        if (str == 'company') {
            this.router.navigate(['/employer/my-profile']);
        } else if (str == 'candidate') {
            this.router.navigate(['/candidate/my-profile']);
        }
    }

    openDashboard() {
        let str = sessionStorage.getItem('userType') || 'not-set';
        str = str.replace('"', '');
        str = str.replace('"', '');
        console.log(str);

        if (str == 'company') {
            this.router.navigate(['/employer/dashboard']);
        } else if (str == 'candidate') {
            this.router.navigate(['/candidate/dashboard']);
        }
    }
    isAccountLoggedIn() {
        let str = sessionStorage.getItem('userType') || 'not-set';
        str = str.replace('"', '');
        str = str.replace('"', '');
        console.log(str);

        if (str == 'company' || str == 'candidate') {
            return true;
        } else {
            return false;
        }
    }
}
