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
        if (sessionStorage.getItem('isUserLoggedIn') == '1') {
            console.log('User is logged in');
            this.http
                .get('http://localhost:8000/users/details')
                .subscribe((response) => {
                    interface ReposnseObject {
                        status: boolean,
                        status_code: number,
                        userId: string,
                        data: object
                    }
                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                   console.log(json.data)
                });
        } else {
            this.router.navigate(['/candidate']);
        }
    }
}
