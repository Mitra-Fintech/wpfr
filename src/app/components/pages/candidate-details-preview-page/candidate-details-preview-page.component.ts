import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-details-preview-page',
  templateUrl: './candidate-details-preview-page.component.html',
  styleUrls: ['./candidate-details-preview-page.component.scss']
})
export class CandidatePreviewPageComponent implements OnInit {

  public objToArray: any;
    public arraySize: any;

    public facebookImg: boolean = true;
    public linkedinImg: boolean = true;
    public instaImg: boolean = true;
    public twitterImg: boolean = true;
    public behanceImg: boolean = true;

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.getJobListing();
    }

    getJobListing() {
        // this.http.get('https://workfromhome.world/api/job/list?company_id=1').subscribe();

        let user_id = sessionStorage.getItem('userId') || 'no-user-id';

        user_id = user_id.replace('"', '').replace('"', '');

        this.http
            .get('https://workfromhome.world/api/candidate/details?id='+user_id)
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

                console.log(this.objToArray[0][1]);

                if(this.objToArray[0][1].facebook == null){
                    this.facebookImg = false;
                }

                if(this.objToArray[0][1].linkedin == null){
                    this.linkedinImg = false;
                }

                if(this.objToArray[0][1].behance == null){
                    this.behanceImg = false;
                }

                if(this.objToArray[0][1].twitter == null){
                    this.twitterImg = false;
                }

                if(this.objToArray[0][1].instagram == null){
                    this.instaImg = false;
                }

                // console.log(responseObj.status);
            });
    }

    idPass(data: any) {
        console.log(data);
        // localStorage.clear();
        localStorage.setItem('job_id', JSON.stringify(data));
    }

}
