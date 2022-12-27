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
  public recentJobsLimitArray: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getJobListing();

  }

  getJobListing() {
    // this.http.get('https://workfromhome.world/api/job/list?company_id=1').subscribe();

    let user_id = sessionStorage.getItem('userId') || 'no-user-id';

        user_id = user_id.replace('"', '').replace('"', '');

        this.http
            .get('https://workfromhome.world/api/job/list' + '?company_id=' + user_id)
            .subscribe((response) => {
                interface ResponseObject {
                    status: string;
                    code: any;
                    data: Object;
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
                
                if(this.recentJobs.length == 0) {
                    // this.empDasharraySize = 0;
                }
                
                else if(this.recentJobs.length == 1) {
                    this.recentJobsLimitArray.push(this.recentJobs[0]);
                }
                
                else{
                    for(let i = 0; i < 2; i++) {
                        this.recentJobsLimitArray.push(this.recentJobs[i]);
                    }
                }

                // this.empDasharraySize = localStorage.getItem('active_jobs');
                
                // this.empDasharraySize = this.empDashArray.length;
                // console.log(this.empDashArray[2][1]);

                // console.log(responseObj.status);
            });

              }

              rJobidPass(data: any){
                console.log(data);
                // localStorage.clear();
                localStorage.setItem('job_id',JSON.stringify(data));
              }

}
