import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-listings-page',
  templateUrl: './job-listings-page.component.html',
  styleUrls: ['./job-listings-page.component.scss']
})
export class JobListingsPageComponent implements OnInit {

  public getJsonValue: any;
  public postJsonValue: any;

  constructor(private http: HttpClient) {  }

  ngOnInit(): void {
    this.getMethod();
  }

  public getMethod() {
    this.http.get('https://workfromhome.world/api/job/list?company_id=1').subscribe();
  }

}
