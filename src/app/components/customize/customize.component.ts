import { Component, input } from '@angular/core';
import { Table, TableActionItemMetaData, TableExtendableTypes } from '../../../table/table.component';
import { MatButton } from '@angular/material/button';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { AuthorModel } from '../../models/author-model';
import { MatDialog } from '@angular/material/dialog';
import { AddColumnComponent } from '../add-column/add-column.component';
import { AddColumnDataModel } from '../../models/add-column-data-model';
import { AddRowComponent } from '../add-row/add-row.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddRowDataModel } from '../../models/add-row-data-model';

@Component({
  selector: 'app-customize',
  standalone: true,
  imports: [
    MatButton,
    MatCheckbox,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSlideToggle,
    MatRadioGroup,
    MatRadioButton,
  ],
  templateUrl: './customize.component.html',
  styleUrl: './customize.component.scss',
})
export class CustomizeComponent {
  table = input.required<Table<AuthorModel>>();
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  allowExpanationChange() {
    this.table().columns[0].expandable = this.table().expandable.allow;
    this.table().refresh();
  }
  expandableTemplateChange(expandableType: TableExtendableTypes) {
    if (expandableType === TableExtendableTypes.template)
      this.table().templates.expandableTemplate = 'booksCustomTemplate';
    if (expandableType === TableExtendableTypes.table) this.table().templates.expandableTemplate = 'booksTableTemplate';
    this.table().refresh();
  }
  actionChange(event: MatCheckboxChange, action: TableActionItemMetaData) {
    action.display = () => event.checked;
    this.table().refresh();
  }
  addRow(): void {
    const row = { ...this.table().dataSource[0] };
    for (let key in row) {
      row[key] = undefined;
    }
    const data: AddRowDataModel = {
      columns: this.table().columns,
      author: row,
    };
    const dialogRef = this.dialog.open(AddRowComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.table().dataSource.unshift(result);
        this.table().pagination.totalCount = this.table().dataSource.length;
        this.table().refresh();
      }
    });
  }
  addColumn() {
    const addColumnData: AddColumnDataModel = { name: '' };
    const dialogRef = this.dialog.open(AddColumnComponent, {
      data: addColumnData,
    });
    dialogRef.afterClosed().subscribe(column => {
      if (column) {
        if (!this.table().columns.find(item => item.field === column.field)) {
          this.table().dataSource.map(data => (data[column.field] = Math.random().toString(36).slice(2, 7)));
          this.table().columns.push(column);
          this.table().refresh();
        } else this.columnExistsNotification(column.field);
      }
    });
  }

  columnExistsNotification(column: string) {
    this.snackBar.open('Column ' + column + ' already exists', 'Close', {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  protected readonly TableExtendableTypes = TableExtendableTypes;
}
