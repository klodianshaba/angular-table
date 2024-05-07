import { Component, Inject, ViewChildren } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { AddRowDataModel } from '../../models/add-row-data-model';
import { TableColumnFieldTypes } from '../../../table/table.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-add-row',
  standalone: true,
  imports: [
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatDialogActions,
    FormsModule,
    MatInput,
    MatDialogClose,
    MatLabel,
    MatSlideToggle,
  ],
  templateUrl: './add-row.component.html',
  styleUrl: './add-row.component.scss',
})
export class AddRowComponent {
  @ViewChildren('matFormField') matFormFields: MatFormField[];
  constructor(
    public dialogRef: MatDialogRef<AddRowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddRowDataModel
  ) {}
  addRow() {
    const invalid = this.matFormFields.some(field => field._formFieldControl.ngControl.invalid);

    if (!invalid) this.dialogRef.close(this.data.author);
    else this.matFormFields.forEach(field => field._formFieldControl.ngControl.control.markAsTouched());
  }

  protected readonly TableColumnFieldTypes = TableColumnFieldTypes;
}
