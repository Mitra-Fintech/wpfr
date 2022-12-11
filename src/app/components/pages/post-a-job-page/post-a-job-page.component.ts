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

    createJob(){
        let title = (<HTMLInputElement>document.getElementById('title')).value;
        let description = (<HTMLInputElement>document.getElementById('description')).value;
        let category_id = (<HTMLInputElement>document.getElementById('category_id')).value;
        let type_id = (<HTMLInputElement>document.getElementById('type_id')).value;
        let tags = (<HTMLInputElement>document.getElementById('tags')).value;
        let gender = (<HTMLInputElement>document.getElementById('gender')).value;
        let salary_type = (<HTMLInputElement>document.getElementById('salary_type')).value;
        let minimum_salary = (<HTMLInputElement>document.getElementById('minimum_salary')).value;
        let maximum_salary = (<HTMLInputElement>document.getElementById('maximum_salary')).value;
        let experience = (<HTMLInputElement>document.getElementById('experience')).value;
        let career_level = (<HTMLInputElement>document.getElementById('career_level')).value;
        let qualification = (<HTMLInputElement>document.getElementById('qualification')).value;
        let introduction_video_url = (<HTMLInputElement>document.getElementById('introduction_video_url')).value;
        let deadline = (<HTMLInputElement>document.getElementById('deadline')).value;
        let friendly_address = (<HTMLInputElement>document.getElementById('friendly_address')).value;
        let location = (<HTMLInputElement>document.getElementById('location')).value;
       
        // let otp = (<HTMLInputElement>document.getElementById('otp')).value;

        let session_id =
        sessionStorage.getItem('session_id') || 'no-session';
    session_id = session_id.replace('"', '');
        
        let body = new URLSearchParams();

        body.set('title', title);
        body.set('description', description);
        body.set('category_id', category_id)
        body.set('type_id',type_id)
        body.set('tags', tags)
        body.set('gender', gender)
        body.set('salary_type', salary_type)
        body.set('minimum_salary', minimum_salary)
        body.set('maximum_salary', maximum_salary)
        body.set('experience', experience)
        body.set('career_level', career_level)
        body.set('qualification', qualification)
        body.set('introduction_video_url', introduction_video_url)
        body.set('deadline', deadline)
        body.set('friendly_address', friendly_address)
        body.set('location', location)
        body.set('session_id', session_id.replace('"', ''));
    

        this.http
        .get('https://workfromhome.world/api/job/post?' + body)
        .subscribe((response) => {
            interface ReposnseObject {
                status: string;
                status_code: any;
                data: object;
            }  
            interface DataObject {
                job_created: boolean
            }
            let json: ReposnseObject = JSON.parse(JSON.stringify(response));
            let DataJson: DataObject = JSON.parse(JSON.stringify(json.data));
            // console.log(json.isUserLoggedIn);
            console.log(DataJson.job_created);

            if(DataJson.job_created){
                this.router.navigate(['/jobs-posted'], {
                                    skipLocationChange: false,})
            }
        })

    }

}