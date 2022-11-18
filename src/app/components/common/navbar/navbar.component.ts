import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isUserLoggedIn = false;
    i = 0;

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.router.events.subscribe((val:any)=>{
            if(val.url){

                console.log("Url Change" + this.i+1);
                this.i++;
                console.log(this.isUserLoggedIn);
                let status = sessionStorage.getItem('isUserLoggedIn');
                if(status == "true")
                this.isUserLoggedIn = true;
            }

        });
    }

    switcherClassApplied = false;
    switcherToggleClass() {
        this.switcherClassApplied = !this.switcherClassApplied;
    }

    searchClassApplied = false;
    searchToggleClass() {
        this.searchClassApplied = !this.searchClassApplied;
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

}