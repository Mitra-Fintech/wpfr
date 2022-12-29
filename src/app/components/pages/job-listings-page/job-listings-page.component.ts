import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-job-listings-page',
    templateUrl: './job-listings-page.component.html',
    styleUrls: ['./job-listings-page.component.scss'],
})
export class JobListingsPageComponent implements OnInit {
    public getJsonValue: any;
    public postJsonValue: any;
    public objToArray: any;
    public arraySize: any;
    public latestTrend: string[] = [];


    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.popularSearches();
        this.getJobListing();
    }

    getJobListing() {
        // this.http.get('https://workfromhome.world/api/job/list?company_id=1').subscribe();

        let user_id = sessionStorage.getItem('userId') || 'no-user-id';

        user_id = user_id.replace('"', '').replace('"', '');

        this.http
            .get('https://workfromhome.world/api/job/recent' + '?limit=10')
            
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

                this.objToArray = Object.entries(dataJson);

                this.arraySize = this.objToArray.length;

                console.log(this.objToArray[2][1]);

                // console.log(responseObj.status);
            });
    }

    idPass(data: any) {
        console.log(data);
        // localStorage.clear();
        localStorage.setItem('job_id', JSON.stringify(data));
    }

    searchTerm() {
        let search_var = (<HTMLInputElement>document.getElementById('search_bar')).value;
        
        if(search_var == ''){
            alert('Please enter a search term');
            this.router.navigate(['/jobs/listings']);
        }
        else{
            localStorage.setItem('search_term', search_var);
            this.router.navigate(['/search-result']);
        }
    }
    popularSearches() {
        this.http
        .get('https://workfromhome.world/api/pouplar-search/list')
        .subscribe((response) => {
            interface ReposnseObject {
                data: object;
            }
            interface DataObject {
                term: object;
            }

            interface DataObjects{
                [index: number]: {term: string}
            }
            let json: ReposnseObject = JSON.parse(
                JSON.stringify(response)
            );
            let data: DataObject = JSON.parse(
                JSON.stringify(json.data)
            );
            let datas: DataObjects = JSON.parse(
                JSON.stringify(data)
            )
            console.log(Object.keys(data).length);

            console.log(datas[0].term);
            
            // this.latestTrend = datas;

            for (let index = 0; index < Object.keys(data).length; index++) {
                // const element = array[index];

                this.latestTrend[index] = datas[index].term;
                
            }
           
        });
    }

    fillSearchBox(term:string) {
        // let term:string = "ok";
        (<HTMLInputElement>document.getElementById('search_bar')).value = term;
        this.searchTerm();
    }
}
