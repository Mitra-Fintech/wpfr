
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'forgot-password-ui',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss'],
})

export class ForgotPasswordComponent implements OnInit {
    constructor(private http: HttpClient, private router: Router) {}
    
    ngOnInit(): void {
    
    }

    forgotVerify() {
        
    }

}