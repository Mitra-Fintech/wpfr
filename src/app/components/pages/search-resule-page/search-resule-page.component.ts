import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-search-resule-page',
    templateUrl: './search-resule-page.component.html',
    styleUrls: ['./search-resule-page.component.scss'],
})
export class SearchResultPageComponent implements OnInit {
    public getJsonValue: any;
    public postJsonValue: any;
    public objToArray: any;
    public arraySize: any;
    public search_item: any;

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.getSearchResult();
    }

    getSearchResult() {
        // this.http.get('https://workfromhome.world/api/job/list?company_id=1').subscribe();

        this.search_item = localStorage.getItem('search_term') || 'no-seach-term';

        this.search_item = this.search_item.replace('"', '').replace('"', '');

        this.http
            .get('https://workfromhome.world/api/job/search?term=' + this.search_item)
            
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
}
