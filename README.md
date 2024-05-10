# Angular Table

Reusable and fully customizable table

## Quick Links

[Live](https://klodianshaba.github.io/angular-table/)

## Defining Table

Simply define a table by using Table instance or implementing TableConfig\
Required properties are dataSource and columns, each other optional property overwrites the default implementation

```typescript
table = new Table<DataSourceModel>({
  dataSource: [],
  columns: [],
});

or

table: TableConfig<DataSourceModel> = {
  dataSource: [],
  columns: [],
};
```

### Columns

```typescript
table = new Table<DataSourceModel>({
  ...,
  columns: [
    {
      display: true,
      label: 'Author',
      field: 'author',
      sortable: true,
      template: true,
    },
    {
      display: true,
      label: 'Nationality',
      field: 'nationality',
      template: true,
      sortable: true,
    },
    {
      display: true,
      label: 'Total books',
      field: 'totalBooks',
      sortable: true,
    },
    {
      display: true,
      label: 'Award winner',
      field: 'awardWinner',
      template: true,
    },
  ],
});
```

### Actions

```typescript
table = new Table<DataSourceModel>({
  ...,
  actions: {
    items: [
      {
        label: 'Edit',
        icon: 'edit',
        color: 'warn',
        click: (row: DataSourceModel, parentRow, index) => {
          this.editRow(row, index);
        },
        display: (row: DataSourceModel) => true,
      },
      {
        label: 'Delete',
        icon: 'delete',
        color: 'warn',
        click: (row: DataSourceModel, parentRow, index) => {
          this.deleteRow(row, index);
        },
        display: (row: DataSourceModel) => true,
      },
    ],
  }
});
```

### Pagination

```typescript
table = new Table<DataSourceModel>({
  ...,
  pagination: {
    totalCount: DataSource.length,
    size: 20,
  }
});
```

### Selection 

```typescript
table = new Table<DataSourceModel>({
  ...,
  selection: {
    allow: true,
    subscribe: () => {}
  }
});
```

### Expandable Template

```typescript
table = new Table<DataSourceModel>({
  ...,
  expandable: {
    allow: true,
    type: TableExtendableTypes.template,
  }
});
```

### Expandable Table 

```typescript
table = new Table<DataSourceModel>({
  ...,
  expandable: {
    allow: true,
    type: TableExtendableTypes.table,
  },
  table: new Table<DataSourceModel>({
    dataSource: [],
    columns: []
  })
});
```

### Ordering 

```typescript
table = new Table<DataSourceModel>({
  ...,
  ordering: {
    allow: true,
    boundary: false,
    template: true
  }
});
```

### Templates 

```typescript
table = new Table<DataSourceModel>({
  ...,
  templates: {
    columnsTemplate: 'authorsTableTemplate',
    expandableTemplate: 'booksCustomTemplate',
    dragPreviewTemplate: 'authorsPreviewTemplate',
  }
});
```

### Operation 

```typescript
table = new Table<DataSourceModel>({
  ...,
  operation: {
    type: TableOperationTypes.http,
    endpoint: '/author'
  }
});
```

## Displaying Table

```angular17html
<app-table [table]="table"></app-table>
```

### Custom Columns Template

```angular17html
<app-table [table]="table">
    ...,
    <ng-template tableTemplate="authorsTableTemplate" let-column let-row="row" let-index="index">
        @switch (column.field) {
            @case ('author') {
                <a href="javascript:" (click)="editRow(row, index)">{{ row[column.field] }}</a>
            }
            @case ('nationality') {
                <img ngSrc="favicon.ico" width="25" height="25"/>
                <span> {{ row[column.field] }}</span>
            }
            @case ('awardWinner') {
                @if (row[column.field]) {
                    <mat-icon>done</mat-icon>
                } @else {
                    <mat-icon>clear</mat-icon>
                }
            }
        }
    </ng-template>
</app-table>
```

### Custom Expandable Template

```angular17html
<app-table [table]="table">
    ...,
    <ng-template tableTemplate="booksCustomTemplate" let-row let-index="index">
        @for (book of row.books; track book) {
            <div matRipple>
                <strong> {{ book.title }}</strong>
            </div>
        } @empty {
            {{ row.author }} doesn't have books yet!
        }
    </ng-template>
</app-table>
```

### Custom Preview Template

```angular17html
<app-table [table]="table">
    ...,
    <ng-template tableTemplate="authorsPreviewTemplate" let-row let-index="index">
        {{ row.author }}
    </ng-template>
</app-table>
```

## Manipulating Table

```typescript
this.table.dataSource = dataSource;
this.table.actions.allow = true; // allow actions
this.table.columns[0].display = true; // display column
this.table.pagination.allow = true; // allow pagination
this.table.pagination.totalCount = dataSource.length; // data source total count
this.table.pagination.size = 10; // page size
this.table.ordering.allow = true; // allow ordering
this.table.expandable.allow = true; // allow expandable
this.table.expandable.multiple = true; // multiple expand
this.table.selection.allow = true; // allow selection
this.table.selection.multiple = true; // multiple select
this.table.dataSource.splice(0, 1); // delete row
this.table.dataSource.unshift(rowData); // add row
...
```
