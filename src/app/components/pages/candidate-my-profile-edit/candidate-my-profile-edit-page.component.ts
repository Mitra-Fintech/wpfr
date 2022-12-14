import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
    selector: 'app-candidate-my-profile-edit-page',
    templateUrl: './candidate-my-profile-edit-page.component.html',
    styleUrls: ['./candidate-my-profile-edit-page.component.scss'],
})
export class CandidateMyProfileEdit implements OnInit {
    public isUserLoggedIn = false;
    // public dataFromEdit: any;
    // public empDashArray: any;
    public objToArray: any;

    public previewObjCandidate: any;
    public previewObj: any;

    public skillArray: any[] = [];

    // objToArray: any[] = [];
    values_exp: any[] = [];
    values_edu: any[] = [];

    public count = 0;

    addEdu() {
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

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.candidateDetailsValue();
        this.previewObjCandidate = localStorage.getItem('previewObj_candidate');
        this.previewObjCandidate = JSON.parse(this.previewObjCandidate);

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

    addExp() {
        this.values_exp.push({ value: '' });
    }

    remExp(i: any) {
        this.values_exp.splice(i, 1);
    }

    // addEdu(){
    //     this.values_edu.push({value: ""});
    // }

    remEdu(i: any) {
        this.values_edu.splice(i, 1);
    }

    candidateDetailsValue() {
        let user_id = sessionStorage.getItem('userId') || 'no-user-id';

        user_id = user_id.replace('"', '').replace('"', '');
        user_id = user_id.replace('"', '').replace('"', '');

        this.http
            .get(
                'https://workfromhome.world/api/candidate/details?id=' + user_id
            )
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

    candidateProfilePrev() {
        let full_name = (<HTMLInputElement>(
            document.getElementById('candidate_name')
        )).value;
        let headline = (<HTMLInputElement>(
            document.getElementById('candidate_headline')
        )).value;
        let role = (<HTMLInputElement>document.getElementById('candidate_role'))
            .value;
        let about_me = (<HTMLInputElement>(
            document.getElementById('candidate_about_me')
        )).value;
        let location = (<HTMLInputElement>(
            document.getElementById('candidate_location')
        )).value;
        let email = (<HTMLInputElement>(
            document.getElementById('candidate_email')
        )).value;
        let phone = (<HTMLInputElement>(
            document.getElementById('candidate_phone_number')
        )).value;
        let gender = "nda";
        let skills = (<HTMLInputElement>(
            document.getElementById('CandidateSkills')
        )).value;

        let fb = (<HTMLInputElement>document.getElementById('fbProfile')).value;
        let twitter = (<HTMLInputElement>(
            document.getElementById('tweetProfile')
        )).value;
        let linkedin = (<HTMLInputElement>(
            document.getElementById('linkedinProfile')
        )).value;
        let insta = (<HTMLInputElement>document.getElementById('instaProfile'))
            .value;
        let behance = (<HTMLInputElement>(
            document.getElementById('behanceProfile')
        )).value;

        let user_id = sessionStorage.getItem('userId') || 'no-user-id';

        user_id = user_id.replace('"', '').replace('"', '');
        user_id = user_id.replace('"', '').replace('"', '');

        console.log(user_id);

        let user_type = sessionStorage.getItem('userType') || 'no-user-type';

        user_type = user_type.replace('"', '').replace('"', '');
        user_type = user_type.replace('"', '').replace('"', '');

        console.log(user_type);

   
            this.previewObj = {
                full_name: full_name,
                headline: headline,
                role: role,
                about_me: about_me,
                location: location,
                email: email,
                phone: phone,
                gender: gender,
                skills: skills,
                fb: fb,
                twitter: twitter,
                linkedin: linkedin,
                insta: insta,
                behance: behance,
            };

            this.skillArray = this.previewObj.skills.split(',');
            this.previewObj.skills = this.skillArray;

            localStorage.setItem(
                'previewObj_candidate',
                JSON.stringify(this.previewObj)
            );

            this.http
                .get(
                    'https://workfromhome.world/api/account/update?field=name&value=' +
                        this.previewObj.full_name +
                        '&userId=' +
                        user_id +
                        '&userIdType=id' +
                        '&userType=' +
                        user_type
                )

                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        code: any;
                        // data: object;
                    }

                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json.isUserLoggedIn);
                    // console.log(json.status_code);
                    console.log(json.code);
                });

            this.http
                .get(
                    'https://workfromhome.world/api/account/update?field=mobile_number&value=' +
                        this.previewObj.phone +
                        '&userId=' +
                        user_id +
                        '&userIdType=id' +
                        '&userType=' +
                        user_type
                )

                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        code: any;
                        // data: object;
                    }

                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json.isUserLoggedIn);
                    // console.log(json.status_code);
                    console.log(json.code);
                });

            this.http
                .get(
                    'https://workfromhome.world/api/account/update?field=email_id&value=' +
                        this.previewObj.email +
                        '&userId=' +
                        user_id +
                        '&userIdType=id' +
                        '&userType=' +
                        user_type
                )

                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        code: any;
                        // data: object;
                    }

                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json.isUserLoggedIn);
                    // console.log(json.status_code);
                    console.log(json.code);
                });

            this.http
                .get(
                    'https://workfromhome.world/api/account/update?field=current_role&value=' +
                        this.previewObj.role +
                        '&userId=' +
                        user_id +
                        '&userIdType=id' +
                        '&userType=' +
                        user_type
                )

                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        code: any;
                        // data: object;
                    }

                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json.isUserLoggedIn);
                    // console.log(json.status_code);
                    console.log(json.code);
                });

            this.http
                .get(
                    'https://workfromhome.world/api/account/update?field=location&value=' +
                        this.previewObj.location +
                        '&userId=' +
                        user_id +
                        '&userIdType=id' +
                        '&userType=' +
                        user_type
                )

                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        code: any;
                        // data: object;
                    }

                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json.isUserLoggedIn);
                    // console.log(json.status_code);
                    console.log(json.code);
                });

            this.http
                .get(
                    'https://workfromhome.world/api/account/update?field=about&value=' +
                        this.previewObj.headline +
                        this.previewObj.about_me +
                        '&userId=' +
                        user_id +
                        '&userIdType=id' +
                        '&userType=' +
                        user_type
                )

                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        code: any;
                        // data: object;
                    }

                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json.isUserLoggedIn);
                    // console.log(json.status_code);
                    console.log(json.code);
                });

            this.http
                .get(
                    'https://workfromhome.world/api/account/update?field=linkedin&value=' +
                        this.previewObj.linkedin +
                        '&userId=' +
                        user_id +
                        '&userIdType=id' +
                        '&userType=' +
                        user_type
                )

                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        code: any;
                        // data: object;
                    }

                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json.isUserLoggedIn);
                    // console.log(json.status_code);
                    console.log(json.code);
                });

            this.http
                .get(
                    'https://workfromhome.world/api/account/update?field=twitter&value=' +
                        this.previewObj.twitter +
                        '&userId=' +
                        user_id +
                        '&userIdType=id' +
                        '&userType=' +
                        user_type
                )

                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        code: any;
                        // data: object;
                    }

                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json.isUserLoggedIn);
                    // console.log(json.status_code);
                    console.log(json.code);
                });

                this.http
                .get(
                    'https://workfromhome.world/api/account/update?field=resume&value=' +
                        this.previewObj.headline +
                        '&userId=' +
                        user_id +
                        '&userIdType=id' +
                        '&userType=' +
                        user_type
                )

                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        code: any;
                        // data: object;
                    }

                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json.isUserLoggedIn);
                    // console.log(json.status_code);
                    console.log(json.code);
                });

            this.http
                .get(
                    'https://workfromhome.world/api/account/update?field=behance&value=' +
                        this.previewObj.behance +
                        '&userId=' +
                        user_id +
                        '&userIdType=id' +
                        '&userType=' +
                        user_type
                )

                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        code: any;
                        // data: object;
                    }

                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json.isUserLoggedIn);
                    // console.log(json.status_code);
                    console.log(json.code);
                });

            this.http
                .get(
                    'https://workfromhome.world/api/account/update?field=instagram&value=' +
                        this.previewObj.insta +
                        '&userId=' +
                        user_id +
                        '&userIdType=id' +
                        '&userType=' +
                        user_type
                )

                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        code: any;
                        // data: object;
                    }

                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json.isUserLoggedIn);
                    // console.log(json.status_code);
                    console.log(json.code);
                });

            this.http
                .get(
                    'https://workfromhome.world/api/account/update?field=facebook&value=' +
                        this.previewObj.fb +
                        '&userId=' +
                        user_id +
                        '&userIdType=id' +
                        '&userType=' +
                        user_type
                )

                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        code: any;
                        // data: object;
                    }

                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json.isUserLoggedIn);
                    // console.log(json.status_code);
                    console.log(json.code);
                });

            this.http
                .get(
                    'https://workfromhome.world/api/account/update?field=skills&value=' +
                        this.previewObj.skills +
                        '&userId=' +
                        user_id +
                        '&userIdType=id' +
                        '&userType=' +
                        user_type
                )

                .subscribe((response) => {
                    interface ReposnseObject {
                        status: string;
                        code: any;
                        // data: object;
                    }

                    let json: ReposnseObject = JSON.parse(
                        JSON.stringify(response)
                    );
                    // console.log(json.isUserLoggedIn);
                    // console.log(json.status_code);
                    console.log(json.code);
                });

                this.router.navigate(['/candidate/my-profile'])
        
    }
}
