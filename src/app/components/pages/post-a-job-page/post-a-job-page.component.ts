import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
    selector: 'app-post-a-job-page',
    templateUrl: './post-a-job-page.component.html',
    styleUrls: ['./post-a-job-page.component.scss']
})
export class PostAJobPageComponent implements OnInit, OnDestroy {
    public isUserLoggedIn = false;
    

    editor: any;
    html: any;

    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        this.editor = new Editor();
        let postajobstatus = sessionStorage.getItem('post-a-job');

        if(postajobstatus != "true"){
            this.router.navigate(['/company'], {
                skipLocationChange: false,
            });
        }
    }

    // make sure to destory the editor
    ngOnDestroy(): void {
        this.editor.destroy();
    }

}