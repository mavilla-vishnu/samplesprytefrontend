import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerDialog } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private dialog: MatDialog) { }

  showSpinner(): void {
    const dialogRef = this.dialog.open(SpinnerDialog, {
      width: '200px'
    });
  }

  dismissSpinner(){
    this.dialog.closeAll();
  }
}
