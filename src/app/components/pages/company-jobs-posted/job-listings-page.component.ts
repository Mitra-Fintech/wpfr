import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-listings-page',
  templateUrl: './job-listings-page.component.html',
  styleUrls: ['./job-listings-page.component.scss']
})
export class CompanyJobListingsPageComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadJobsPosted();
  }

  loadJobsPosted(){

    // https://workfromhome.world/api/job/list?company_id=8986194738

    let userId =
                sessionStorage.getItem('userId') || 'no-session';
                userId = userId.replace('"', '');
                userId = userId.replace('"', '');

    let body = new URLSearchParams();
    body.set('company_id', userId);

    this.http
    .get('https://workfromhome.world/api/job/list?' + body)
    .subscribe((response) => {
        interface ReposnseObject {
            status: string;
            status_code: any;
            isUserLoggedIn: boolean;
            message: any;
            data:object
        }
        let json: ReposnseObject = JSON.parse(JSON.stringify(response));
        // console.log(json.isUserLoggedIn);
        console.log(response);
    })
  }

}
