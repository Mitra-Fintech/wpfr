import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-details-page',
  templateUrl: './candidate-details-page.component.html',
  styleUrls: ['./candidate-details-page.component.scss']
})
export class MyProfileCandidatesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public checkIsLoggedIn(){
    if(sessionStorage.getItem('isUserLoggedIn') == 'true'){
      console.log('User is logged in');
    }
  }

}
