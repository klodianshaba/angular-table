import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Table, TableComponent } from '../table/table.component';
import { TableColumnFieldTypes, TableExtendableTypes } from '../table/models';
import { MatButton } from '@angular/material/button';
import { TableTemplateDirective } from '../table/table-template.directive';
import { CustomizeComponent } from './components/customize/customize.component';
import { DataSource, AuthorModel } from './models/author-model';
import { MatIcon } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { MatRipple } from '@angular/material/core';
import { AddRowDataModel } from './models/add-row-data-model';
import { AddRowComponent } from './components/add-row/add-row.component';
import { MatDialog } from '@angular/material/dialog';
import { bounceIn, staggerNestedAnimations, zoomIn } from 'ngxa';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCheckbox,
    FormsModule,
    TableComponent,
    MatButton,
    TableTemplateDirective,
    CustomizeComponent,
    MatIcon,
    NgOptimizedImage,
    MatRipple,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    zoomIn({ stateChangeExpressions: ':enter', timings: '1s', direction: 'Up' }),
    bounceIn({ stateChangeExpressions: ':enter', timings: '1s', direction: 'Down' }),
    bounceIn({ stateChangeExpressions: ':enter', timings: '1s', direction: 'Left' }),
    staggerNestedAnimations({
      triggerName: 'stagger',
      stateChangeExpressions: ':enter',
      timings: '300ms',
      nestedAnimations: 'none',
    }),
  ],
})
export class AppComponent {
  title = 'angular-table';
  booksTable = new Table({
    dataSource: [],
    dataSourceProperty: 'books',
    templates: {
      columnsTemplate: 'booksTableTemplate',
      dragPreviewTemplate: 'booksPreviewTemplate',
    },
    ordering: {
      template: true,
    },
    pagination: {
      allow: false,
    },
    columns: [
      {
        display: true,
        label: 'Title',
        field: 'title',
        sortable: true,
        template: true,
      },
      {
        display: true,
        label: 'Publisher',
        field: 'publisher',
      },
      {
        display: true,
        label: 'Date',
        field: 'date',
      },
      {
        display: true,
        label: 'Pages',
        field: 'pages',
      },
    ],
  });
  table = new Table<AuthorModel>({
    dataSource: [],
    templates: {
      columnsTemplate: 'authorsTableTemplate',
      expandableTemplate: 'booksCustomTemplate',
      dragPreviewTemplate: 'authorsPreviewTemplate',
    },
    selection: {
      allow: true,
    },
    pagination: {
      totalCount: DataSource.length,
      size: 12,
    },
    expandable: {
      allow: true,
      type: TableExtendableTypes.template,
    },
    ordering: {
      boundary: false,
      template: true,
    },
    columns: [
      {
        display: true,
        label: 'Author',
        field: 'author',
        fieldType: { field: TableColumnFieldTypes.input, type: 'text' },
        sortable: true,
        template: true,
      },
      {
        display: true,
        label: 'Nationality',
        field: 'nationality',
        fieldType: { field: TableColumnFieldTypes.input, type: 'text' },
        template: true,
        sortable: true,
      },
      {
        display: true,
        label: 'Total books',
        field: 'totalBooks',
        fieldType: { field: TableColumnFieldTypes.input, type: 'number' },
        sortable: true,
      },
      {
        display: true,
        label: 'Award winner',
        field: 'awardWinner',
        fieldType: { field: TableColumnFieldTypes.toggle },
        template: true,
      },
    ],
    actions: {
      items: [
        {
          label: 'Edit',
          icon: 'edit',
          color: 'warn',
          click: (row: AuthorModel, parentRow, index) => {
            this.editRow(row, index);
          },
          display: () => true,
        },
        {
          label: 'Delete',
          icon: 'delete',
          color: 'warn',
          click: (row: AuthorModel, parentRow, index) => {
            this.table.dataSource.splice(index, 1);
            this.table.pagination.totalCount = this.table.dataSource.length;
          },
          display: () => true,
        },
      ],
    },
    table: this.booksTable,
  });

  constructor(public dialog: MatDialog) {
    this.loadData();
  }

  loadData() {
    this.table.dataSource = DataSource;
    this.table.expandRow(this.table.dataSource[0]);
  }
  editRow(row: AuthorModel, index: number): void {
    const data: AddRowDataModel = {
      columns: this.table.columns,
      author: { ...row },
      id: index + 1,
    };
    const dialogRef = this.dialog.open(AddRowComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Object.keys(result).forEach(key => {
          this.table.dataSource[index][key] = result[key];
        });
        this.table.refresh();
      }
    });
  }
}
