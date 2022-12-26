import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-details-page',
  templateUrl: './company-details-page.component.html',
  styleUrls: ['./company-details-page.component.scss']
})
export class MyCompanyDetailsPageComponent implements OnInit {
  public recentJobs: any;
  public recentJobsSize: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getJobListing();

  }

  getJobListing() {
    // this.http.get('https://workfromhome.world/api/job/list?company_id=1').subscribe();

    let user_id = sessionStorage.getItem('userId') || 'no-user-id';

    user_id = user_id.replace('"', '').replace('"', '');

    this.http
                .get('https://workfromhome.world/api/job/recent' + '?limit=2')
                .subscribe((response) => {

                    interface ResponseObject {
                        status: string;
                        code: any;
                        data : Object;
                        // session_id: string;
                    }

                    interface DataArrayObject {
                        // job_title: string;
                        array: Object;
                        

                    }

                    let responseObj: ResponseObject = JSON.parse(
                        JSON.stringify(response)
                    );

                    let dataJson: DataArrayObject = JSON.parse(
                        JSON.stringify(responseObj.data)
                    );
                    
                    // localStorage.setItem('job_listing_data',JSON.stringify(dataJson));

                    this.recentJobs = Object.entries(dataJson);

                    this.recentJobsSize = this.recentJobs.length

                    console.log(this.recentJobs[2][1]);  
                    
                    // console.log(responseObj.status);

                });

              }

              rJobidPass(data: any){
                console.log(data);
                // localStorage.clear();
                localStorage.setItem('job_id',JSON.stringify(data));
              }

}
