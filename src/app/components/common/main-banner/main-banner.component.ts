import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main-banner',
    templateUrl: './main-banner.component.html',
    styleUrls: ['./main-banner.component.scss'],
})
export class MainBannerComponent implements OnInit {
    public postajob = false;

    constructor() {}

    ngOnInit(): void {
        let postajobstatus = sessionStorage.getItem('post-a-job');
        if (postajobstatus == 'true') {
            this.postajob = true;
        }
    }
}
