import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-dashboard-page',
  templateUrl: './employer-dashboard-page.component.html',
  styleUrls: ['./employer-dashboard-page.component.scss']
})
export class EmployerDashboardPageComponent implements OnInit {
    public empDashArray: any;
    public empDasharraySize: any; 

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getJobList();
  }

  getJobList() {
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

                    this.empDashArray = Object.entries(dataJson);

                    this.empDasharraySize = localStorage.getItem('active_jobs');

                    console.log(this.empDashArray[2][1]);  
                    
                    // console.log(responseObj.status);

                });

              }
              
              empidPass(data: any){
                
                console.log(data);
                // localStorage.clear();
                localStorage.setItem('job_id',JSON.stringify(data));
                
              }
}
