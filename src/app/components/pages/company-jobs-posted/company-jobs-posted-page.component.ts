// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-job-listings-page',
//   templateUrl: './job-listings-page.component.html',
//   styleUrls: ['./job-listings-page.component.scss']
// })
// export class CompanyJobListingsPageComponent implements OnInit {

//   constructor(private http: HttpClient, private router: Router) {}

//   ngOnInit(): void {
//     this.loadJobsPosted();
//   }

//   loadJobsPosted(){

//     // https://workfromhome.world/api/job/list?company_id=8986194738

//     let userId =
//                 sessionStorage.getItem('userId') || 'no-session';
//                 userId = userId.replace('"', '');
//                 userId = userId.replace('"', '');

//     let body = new URLSearchParams();
//     body.set('company_id', userId);

//     this.http
//     .get('https://workfromhome.world/api/job/list?' + body)
//     .subscribe((response) => {
//         interface ReposnseObject {
//             status: string;
//             status_code: any;
//             isUserLoggedIn: boolean;
//             message: any;
//             data:object
//         }
//         let json: ReposnseObject = JSON.parse(JSON.stringify(response));
//         // console.log(json.isUserLoggedIn);
//         console.log(response);
//     })
//   }

// }
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'
       


@Component({
  selector: 'app-company-jobs-posted-page',
  templateUrl: './company-jobs-posted-page.component.html',
  styleUrls: ['./company-jobs-posted-page.component.scss']
})
export class CompanyJobListingsPageComponent implements OnInit {

  public getJsonValue: any;
  public postJsonValue: any;
  public final_array: any;

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
                      
                    this.final_array = Object.entries(dataJson);

                    console.log(this.final_array[0][1]);  
                    // console.log(responseObj.status);

                });
  }

}



