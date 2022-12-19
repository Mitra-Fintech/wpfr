import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-bookmark-page',
  templateUrl: './candidate-bookmark-page.component.html',
  styleUrls: ['./candidate-bookmark-page.component.scss']
})
export class CandidateBookmarkPage implements OnInit {

  public user_type: any;
  public canBmked: any = false;
  public bmkArray: any;
  public jobToArray: any;
  public dataArrayLen: any;
  public dataArray:any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getJobDetails();
  }

  

  getJobDetails(){
    
    this.bmkArray = localStorage.getItem('bmk_id');
    this.bmkArray = JSON.parse(this.bmkArray);
    this.dataArrayLen = this.bmkArray.length;

    for(let bid of this.bmkArray){

      this.http
      .get(
          'https://workfromhome.world/api/job/details?job_id=' +bid
      )
      .subscribe((response: any) => {
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

          this.jobToArray = Object.entries(dataJson);
          
          this.dataArray.push(this.jobToArray[0][1]);

          // console.log(this.jobToArray[0][1]);
      });
    }
    console.log(this.dataArray);
    console.log(this.dataArrayLen);

  }

  idPass(data:any){
    console.log(data);
    localStorage.setItem('job_id', JSON.stringify(data));

  }

  remBmk(data: any){
    
  }

}
