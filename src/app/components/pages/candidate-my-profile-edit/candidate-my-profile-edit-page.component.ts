import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
    selector: 'app-candidate-my-profile-edit-page',
    templateUrl: './candidate-my-profile-edit-page.component.html',
    styleUrls: ['./candidate-my-profile-edit-page.component.scss']
})
export class CandidateMyProfileEdit implements OnInit {
    public isUserLoggedIn = false;
    // public dataFromEdit: any;
    // public empDashArray: any;
    public objToArray: any;
    // objToArray: any[] = [];
    values_exp : any[] = [];
    values_edu : any[] = [];
    
    public count=0;

    addEdu(){
        this.values_edu.push(this.count++);
        console.log(this.count);
    }

    // editor: any;
    // html: any;

    // toolbar: Toolbar = [
    //     ['bold', 'italic'],
    //     ['underline', 'strike'],
    //     ['code', 'blockquote'],
    //     ['ordered_list', 'bullet_list'],
    //     [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    //     ['link', 'image'],
    //     ['text_color', 'background_color'],
    //     ['align_left', 'align_center', 'align_right', '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        '],
    // ];



    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        this.candidateDetailsValue();
        // this.autoCapitalize();
        // this.editor = new Editor();
        // let postajobstatus = sessionStorage.getItem('post-a-job');

        // if(postajobstatus == "true"){
        //     this.router.navigate(['/company'], {
        //         skipLocationChange: false,
        //     });
        // }
    }

  

    // make sure to destory the editor
    // ngOnDestroy(): void {
    //     // this.editor.destroy();
    // }

    

    // createJob(){

    //     let title = (<HTMLInputElement>document.getElementById('title')).value;
    //     let description = (<HTMLInputElement>document.getElementById('description')).value;
    //     let category_id = (<HTMLInputElement>document.getElementById('category_id')).value;
    //     let type_id = (<HTMLInputElement>document.getElementById('type_id')).value;
    //     let tags = (<HTMLInputElement>document.getElementById('tags')).value;
    //     let gender = (<HTMLInputElement>document.getElementById('gender')).value;
    //     let salary_type = (<HTMLInputElement>document.getElementById('salary_type')).value;
    //     let minimum_salary = (<HTMLInputElement>document.getElementById('minimum_salary')).value;
    //     let maximum_salary = (<HTMLInputElement>document.getElementById('maximum_salary')).value;
    //     let experience = (<HTMLInputElement>document.getElementById('experience')).value;
    //     let career_level = (<HTMLInputElement>document.getElementById('career_level')).value;
    //     let qualification = (<HTMLInputElement>document.getElementById('qualification')).value;
    //     let introduction_video_url = (<HTMLInputElement>document.getElementById('introduction_video_url')).value || "null";
    //     let deadline = (<HTMLInputElement>document.getElementById('deadline')).value;
    //     // let friendly_address = (<HTMLInputElement>document.getElementById('friendly_address')).value;
    //     // let location = (<HTMLInputElement>document.getElementById('location')).value;
       
    //     // let otp = (<HTMLInputElement>document.getElementById('otp')).value;

    //     let session_id =
    //     sessionStorage.getItem('session_id') || 'no-session';
    // session_id = session_id.replace('"', '');
        
    //     let body = new URLSearchParams();

    //     body.set('title', title);
    //     body.set('description', description);
    //     body.set('category_id', category_id)
    //     body.set('type_id',type_id)
    //     body.set('tags', tags)
    //     body.set('gender', gender)
    //     body.set('salary_type', salary_type)
    //     body.set('minimum_salary', minimum_salary)
    //     body.set('maximum_salary', maximum_salary)
    //     body.set('experience', experience)
    //     body.set('career_level', career_level)
    //     body.set('qualification', qualification)
    //     body.set('introduction_video_url', introduction_video_url)
    //     body.set('deadline', deadline)
    //     body.set('friendly_address', "null")
    //     body.set('location', "null")
    //     body.set('session_id', session_id.replace('"', ''));
    

    //     this.http
    //     .get('https://workfromhome.world/api/job/post?' + body)
    //     .subscribe((response) => {
    //         interface ReposnseObject {
    //             status: string;
    //             status_code: any;
    //             data: object;
    //         }  
    //         interface DataObject {
    //             job_created: boolean
    //         }
    //         let json: ReposnseObject = JSON.parse(JSON.stringify(response));
    //         let DataJson: DataObject = JSON.parse(JSON.stringify(json.data));
    //         // console.log(json.isUserLoggedIn);
    //         console.log(DataJson.job_created);

    //         if(DataJson.job_created){
    //             alert('Job Posted successfully')
    //             this.router.navigate(['/job-listings'], {
    //                                 skipLocationChange: false,})
    //         }
    //         else{
    //             alert('Something went wrong')
    //         }
    //     })

    // }

    addExp(){
        this.values_exp.push({value: ""});
    }

    remExp(i:any){
        this.values_exp.splice(i,1);
    }

    
    // addEdu(){
    //     this.values_edu.push({value: ""});
    // }
    
   

    remEdu(i:any){
        this.values_edu.splice(i,1);
    }

    candidateDetailsValue(){
        let user_id = sessionStorage.getItem('userId') || 'no-user-id';

        user_id = user_id.replace('"', '').replace('"', '');

        this.http
            .get('https://workfromhome.world/api/candidate/details?id='+user_id)
            .subscribe((response) => {
                interface ResponseObject {
                    status: string;
                    code: any;
                    data: Object;
                    // session_id: string;
                }

                interface DataArrayObject {
                    // job_title: string;
                    array: Object;
                }

                let responseObj: ResponseObject = JSON.parse(
                    JSON.stringify(response)
                );

                let dataJson: DataArrayObject = JSON.parse(
                    JSON.stringify(responseObj.data)
                );

                // localStorage.setItem('job_listing_data',JSON.stringify(dataJson));

                this.objToArray = Object.entries(dataJson);

                // this.arraySize = this.objToArray.length;

                console.log(this.objToArray);
                // console.log("hello");

                // console.log(responseObj.status);
            });
    }
    



}