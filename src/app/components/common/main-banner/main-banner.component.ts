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
    public latestTrend: string[] = [];

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        this.popularSearches();
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

}
