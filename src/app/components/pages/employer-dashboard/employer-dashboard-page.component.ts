import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-dashboard-page',
  templateUrl: './employer-dashboard-page.component.html',
  styleUrls: ['./employer-dashboard-page.component.scss']
})
export class EmployerDashboardPageComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

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

                if((json.isUserLoggedIn == true ) && json.userType == "company")
                {}else{
                    this.router.navigateByUrl('/company');
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
                if((json.isUserLoggedIn == true ) && json.userType == "company")
                {}else{
                    this.router.navigateByUrl('/company');
                }
            });
    }
}
}
