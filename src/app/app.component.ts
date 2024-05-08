import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {
  Table,
  TableColumnFieldTypes,
  TableComponent,
  TableExtendableTypes,
  TableOperationTypes,
} from '../table/table.component';
import { MatButton } from '@angular/material/button';
import { TableTemplateDirective } from '../table/table-template.directive';
import { CustomizeComponent } from './components/customize/customize.component';
import { DataSource, AuthorModel } from './models/author-model';
import { MatIcon } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { MatRipple } from '@angular/material/core';

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
})
export class AppComponent {
  title = 'angular-table';
  private booksTable = new Table({
    dataSource: [],
    dataSourceProperty: 'books',
    pagination: { allow: false },
    columns: [
      {
        display: true,
        label: 'Title',
        field: 'title',
        sortable: true,
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
  public table = new Table<AuthorModel>({
    dataSource: [],
    templates: { columnsTemplate: 'authorsTableTemplate', expandableTemplate: 'booksCustomTemplate' },
    operation: { type: TableOperationTypes.datasource, endpoint: '/search' },
    selection: { allow: true, subscribe: () => {} },
    pagination: {
      totalCount: DataSource.length,
      size: 12,
    },
    expandable: { allow: true, type: TableExtendableTypes.template },
    ordering: { boundary: false },
    columns: [
      {
        display: true,
        label: 'Author',
        field: 'author',
        fieldType: { field: TableColumnFieldTypes.input, type: 'text' },
        selection: true,
        sortable: true,
        template: true,
        expandable: true,
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
          click: (row: AuthorModel, parentRow, index) => {},
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

  constructor() {
    this.loadData();
  }

  loadData() {
    this.table.dataSource = DataSource;
    this.table.expandRow(this.table.dataSource[0]);
  }
}
