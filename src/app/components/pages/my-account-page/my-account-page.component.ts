import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-my-account-page',
  templateUrl: './my-account-page.component.html',
  styleUrls: ['./my-account-page.component.scss']
})


export class MyAccountPageComponent implements OnInit {

  public getJsonValue: any; 
  public postJsonvalue: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.postMethod(); 
  }
  private async postMethod() { 
      const header = new HttpHeaders ({
        contentType: 'application/x-www-form-urlencoded'
      })
      let body = {
        "mobile_number" : "dummy",
        "password" : "dummy",
      }
      
      console.log("Api Call")

      // this.http.get('http://api.mitrafintech.com/wfh/session').subscribe((data) => {
      //   console.log(data); 
      //   // this.postJsonValue = data; 
      // });

    const response = await window.fetch('http://api.mitrafintech.com/wfh/candidate/login', {
    // learn more about this API here: https://graphql-pokemon2.vercel.app/
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(body),
  })
  console.log(response.text)

      console.log("Ended")
    }

     onClick(){
     this.postMethod()
    }
}
