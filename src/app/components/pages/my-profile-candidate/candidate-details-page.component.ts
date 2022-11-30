import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-candidate-details-page',
    templateUrl: './candidate-details-page.component.html',
    styleUrls: ['./candidate-details-page.component.scss'],
})
export class MyProfileCandidatesComponent implements OnInit {
    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.checkIsLoggedIn();
    }

    public checkIsLoggedIn() {
        if (sessionStorage.getItem('isUserLoggedIn') == 'true') {
            console.log('User is logged in');
            this.http
                .get('https://workfromhome.world/api/users/details')
                .subscribe((response) => {
                    interface ReposnseObject {
                        xjson: object;
                    }
                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                   console.log(json)
                });
        } else {
            this.router.navigate(['/candidate']);
        }
    }
}
