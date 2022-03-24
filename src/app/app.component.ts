import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Spritelab';
  message:string='';
  postForm: FormGroup;

  constructor(private _snackBar: MatSnackBar, private http: HttpClient) {
    this.postForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {

  }

  sendData() {
    if (this.postForm.invalid) {
      this._snackBar.open('Please enter valid data', 'OK');
      return;
    }

    this.http.post('https://samplespryte.herokuapp.com/sendGreeting', this.postForm.value).subscribe((response:any)=>{
      this.message=response.message;
    });

  }

}
