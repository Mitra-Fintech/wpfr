
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'
       


@Component({
  selector: 'app-employer-shortlist-page',
  templateUrl: './employer-shortlist-page.component.html',
  styleUrls: ['./employer-shortlist-page.component.scss']
})
export class EmployerCandidateShortlisted implements OnInit {

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
    let user_type = sessionStorage.getItem('userType') || 'no-user-type';

    user_type = user_type.replace('"', '').replace('"', '');
    user_type = user_type.replace('"', '').replace('"', '');

    user_id = user_id.replace('"', '').replace('"', '');
    user_id = user_id.replace('"', '').replace('"', '');

    if(user_type == 'not-set'){
      this.router.navigate(['/employer']);
    }

    else{
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

                    this.arraySize = this.objToArray.length;

                    // console.log(this.objToArray[2][1]);
                    
                    
                    localStorage.setItem('active_jobs', JSON.stringify(this.arraySize));
                  
                  
                });
              }

              }
              
              idPass(data: any){
                
                console.log(data);
                // localStorage.clear();
                localStorage.setItem('job_id',JSON.stringify(data));
                
              }
    
              searchTerm() {
                let search_var = (<HTMLInputElement>document.getElementById('search_bar')).value;
        
                  if(search_var == ''){
                      alert('Please enter a search term');
                      this.router.navigate(['/jobs/posted']);
                  }
                  else{
                      localStorage.setItem('search_term', search_var);
                      this.router.navigate(['/search-result']);
                  }
              }

}



