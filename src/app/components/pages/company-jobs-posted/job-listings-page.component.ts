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
  }

  loadJobsPosted(){

    // https://workfromhome.world/api/job/list?company_id=8986194738

    let session_id =
                sessionStorage.getItem('mobile_number') || 'no-session';
            session_id = session_id.replace('"', '');

    let body = new URLSearchParams();
    body.set('company_id', session_id);

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
