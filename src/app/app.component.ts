import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from './services/spinner.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Spritelab';
  message: string = '';
  postForm: FormGroup;

  constructor(private datePipe: DatePipe, private _snackBar: MatSnackBar, private http: HttpClient, private dialog: MatDialog, private spinnerService: SpinnerService) {
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
    this.spinnerService.showSpinner();
    this.http.post('https://samplespryte.herokuapp.com/sendGreeting', { name: this.postForm.controls['name'].value, dob: this.datePipe.transform(this.postForm.controls['dob'].value, 'MM-dd-yyyy') }).subscribe((response: any) => {
      this.spinnerService.dismissSpinner();
      this.message = response.message;
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'spinner-dialog.html'
})
export class SpinnerDialog {
  constructor(public dialogRef: MatDialogRef<SpinnerDialog>) { }

}
