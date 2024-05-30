import { Component, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { AddColumnDataModel } from '../../models/add-column-data-model';
import { of } from 'rxjs';
import { TableColumnFieldTypes, TableColumnMetaData } from '../../../table/models';

export interface DialogDataModel {}

@Component({
  selector: 'app-add-column',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatDialogActions,
    FormsModule,
    MatButton,
    MatInput,
    MatDialogClose,
    MatLabel,
  ],
  templateUrl: './add-column.component.html',
  styleUrl: './add-column.component.scss',
})
export class AddColumnComponent {
  @ViewChild('matFormField') matFormFields: MatFormField;
  constructor(
    public dialogRef: MatDialogRef<AddColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddColumnDataModel
  ) {}
  addColumn() {
    if (this.matFormFields._formFieldControl.ngControl.valid) {
      const column: TableColumnMetaData = {
        display: true,
        label: this.data.name.charAt(0).toUpperCase() + this.data.name.slice(1),
        field: this.data.name,
        fieldType: { field: TableColumnFieldTypes.input, type: 'text' },
        sortable: true,
        template: false,
        text: row => of(row[this.data.name]),
      };
      this.dialogRef.close(column);
    } else this.matFormFields._formFieldControl.ngControl.control.markAsTouched();
  }
}
