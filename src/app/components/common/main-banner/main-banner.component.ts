import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main-banner',
    templateUrl: './main-banner.component.html',
    styleUrls: ['./main-banner.component.scss'],
})
export class MainBannerComponent implements OnInit {
    public postajob = true;

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        // this.searchTerm();
        let postajobstatus = sessionStorage.getItem('post-a-job');

        if (postajobstatus == 'true') {
            this.postajob = false;
        }
    }

    searchTerm() {
        let search_var = (<HTMLInputElement>document.getElementById('search_bar')).value;
        
        if(search_var == ''){
            alert('Please enter a search term');
            this.router.navigate(['/']);
        }
        else{
            localStorage.setItem('search_term', search_var);
            this.router.navigate(['/search-result']);
        }
    }
}
