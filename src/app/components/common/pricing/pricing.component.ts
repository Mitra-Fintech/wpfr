import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pricing',
    templateUrl: './pricing.component.html',
    styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
    public showPricingChart = false;

    constructor() {}

    ngOnInit(): void {
        let postajobstatus = sessionStorage.getItem('post-a-job');
        if (postajobstatus == 'true') this.showPricingChart = true;
    }
}
