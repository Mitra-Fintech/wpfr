import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-listings-page',
  templateUrl: './job-listings-page.component.html',
  styleUrls: ['./job-listings-page.component.scss']
})
export class JobListingsPageComponent implements OnInit {
  
  public getJsonValue: any;
  public postJsonValue: any;
  public objToArray: any;
  public arraySize: any; 

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
                    
                    // localStorage.setItem('job_listing_data',JSON.stringify(dataJson));

                    this.objToArray = Object.entries(dataJson);

                    this.arraySize = this.objToArray.length

                    console.log(this.objToArray[2][1]);  
                    
                    // console.log(responseObj.status);

                });

              }
              
              idPass(data: any){
                
                console.log(data);
                // localStorage.clear();
                localStorage.setItem('job_id',JSON.stringify(data));
                
              }

}
