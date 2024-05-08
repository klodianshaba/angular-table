import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { overwriteObject } from './utills/table-utils';
import { MatRippleModule, ThemePalette } from '@angular/material/core';
import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TableTemplateDirective } from './table-template.directive';
import { takeUntil } from 'rxjs/operators';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { CdkHeaderCell, CdkTable, CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

const api = '/api';

export interface TableConfig<T> {
  detectChanges?: Subject<boolean>; // event emitter to detect changes manually
  selectionChanged?: Subject<any>; // event emitter when selection of rows change
  sortingChanged?: Subject<Sort>; // event emitter when sort of a column change
  paginationChanged?: Subject<PageEvent>; // event emitter when page changed
  orderingChanged?: Subject<any[]>; // event emitter when order changed by drag&drop
  dataSource: T[]; // data source of the table
  columns: TableColumnMetaData[]; // columns of the table that will be displayed
  dataSourceProperty?: string; // this is used for nested tables when you want to refer to a nested property of parent dataSource
  templates?: TableTemplatesMetaData; // templates of table custom columns template & row expandable template
  tableId?: string; // table identifier id
  operation?: TableOperationMetaData; // operation configuration
  selection?: TableSelectionMetaData; // selection configuration
  sorting?: TableSortingMetaData; // sorting configuration
  pagination?: TablePaginationMetaData; // pagination configuration
  actions?: TableActionMetaData; // actions configuration
  ordering?: TableOrderingMetaData; // ordering configuration
  ripple?: TableRippleRowMetaData; // ripple configuration
  expandable?: TableExtendableMetaData; // expandable configuration
  table?: Table<T>; // nested table for each row of parent table
  selectionModel?: SelectionModel<T>; // selection model
  actionsSelectionModel?: SelectionModel<T>; // actions selection model
  expandableRenderingSelectionModel?: SelectionModel<T>; // expandable rendering selection model
  expandableSelectionModel?: SelectionModel<T>; // expandable selection model
  expandableRenderingTimeout?: any; // expandable rendering timeout
  parentElement?: any; // parent element of row
}

export enum TableActionTypes {
  speedDial = 'speedDial',
  menu = 'menu',
}

export enum TableColumnFieldTypes {
  input = 'input',
  toggle = 'toggle',
}

export enum TableExtendableTypes {
  table = 'table',
  template = 'template',
}

export enum TableOperationTypes {
  http = 'http',
  datasource = 'datasource',
}

export interface TableOperationMetaData {
  type?: keyof typeof TableOperationTypes;
  uri?: string;
  endpoint?: string;
  searchCriteria?: object;
}

export interface TableRippleRowMetaData {
  allow?: boolean;
}

export interface TableTemplatesMetaData {
  columnsTemplate?: string;
  expandableTemplate?: string;
}

export interface TableOrderingMetaData {
  allow?: boolean;
  boundary?: boolean;
  dragPreviewCssClass?: string;
  subscribe?: (ordered: any[]) => void;
}

export interface TableExtendableMetaData {
  allow?: boolean;
  multiple?: boolean;
  type?: keyof typeof TableExtendableTypes;
}

export interface TableSelectionMetaData {
  allow?: boolean;
  multiple?: boolean;
  cssClass?: string;
  subscribe?: (selected: any[]) => void;
}

export interface TableSortingMetaData {
  allow?: boolean;
  subscribe?: (sort: Sort) => void;
  sort?: Sort;
}

export class TablePaginationMetaData {
  allow?: boolean;
  id?: string;
  disabled?: boolean;
  hidePageSize?: boolean;
  showFirstLastButtons?: boolean;
  itemsPerPageLabel?: string;
  firstPageLabel?: string;
  lastPageLabel?: string;
  nextPageLabel?: string;
  previousPageLabel?: string;
  currentPage?: number;
  totalCount?: number;
  size?: number;
  options?: number[];
  cssClass?: string;
  subscribe?: (page: PageEvent) => void;

  constructor(config: TablePaginationMetaData = {}) {
    this.allow = true;
    this.disabled = false;
    this.currentPage = 0;
    this.totalCount = 0;
    this.options = [5, 10, 15, 20];
    this.size = 10;
    this.cssClass = 'table-pagination';
    this.showFirstLastButtons = true;
    this.hidePageSize = false;
    this.itemsPerPageLabel = 'Items per page';
    this.firstPageLabel = 'first page';
    this.lastPageLabel = 'Last page';
    this.nextPageLabel = 'Next page';
    this.previousPageLabel = 'Previous page';
    Object.assign(this, config);
  }
}

export class TableColumnMetaData {
  id?: (data: any) => any;
  label: string;
  field: string;
  fieldType?: TableColumnFieldTypeMetaData;
  display: boolean;
  text?: (data: any) => Observable<string>;
  template?: boolean;
  selection?: boolean;
  sortable?: boolean;
  expandable?: boolean;
  cssClass?: string;

  constructor(config: TableColumnMetaData = { label: '', field: '', display: true }) {
    this.template = false;
    this.label = '';
    this.field = '';
    this.display = true;
    Object.assign(this, config);
  }
}

export interface TableColumnFieldTypeMetaData {
  field: TableColumnFieldTypes;
  type?: string;
}

export interface TableActionMetaData {
  allow?: boolean;
  type?: keyof typeof TableActionTypes;
  multiple?: boolean;
  items?: TableActionItemMetaData[];
}

export interface TableActionItemMetaData {
  label: string;
  icon?: string;
  color?: ThemePalette;
  click?: (element: any, parentElement: any, index?: number) => void;
  hover?: (element: any, parentElement: any, index?: number) => void;
  display?: (element: any, parentElement: any, index?: number) => boolean;
}

export class Table<T> implements Required<TableConfig<T>> {
  detectChanges: Subject<boolean> = new Subject<boolean>();
  selectionChanged: Subject<any> = new Subject<any>();
  sortingChanged: Subject<Sort> = new Subject<Sort>();
  paginationChanged: Subject<PageEvent> = new Subject<PageEvent>();
  orderingChanged: Subject<any[]> = new Subject<any[]>();
  dataSource: T[] = [];
  dataSourceProperty: string = '';
  columns: TableColumnMetaData[] = [];
  templates: TableTemplatesMetaData = {
    columnsTemplate: 'columnsTemplate',
    expandableTemplate: 'expandableTemplate',
  };
  tableId: string = 'table';
  actions: TableActionMetaData = {
    allow: true,
    type: TableActionTypes.speedDial,
    multiple: false,
    items: [],
  };
  operation: TableOperationMetaData = {
    type: TableOperationTypes.http,
    uri: api,
    endpoint: undefined,
    searchCriteria: {},
  };
  selection: TableSelectionMetaData = {
    allow: false,
    multiple: true,
    cssClass: 'table-row-selected',
  };
  pagination: TablePaginationMetaData = new TablePaginationMetaData();
  sorting: TableSortingMetaData = {
    allow: true,
    subscribe: undefined,
    sort: undefined,
  };
  ripple: TableRippleRowMetaData = { allow: true };
  ordering: TableOrderingMetaData = {
    allow: true,
    boundary: true,
    dragPreviewCssClass: 'table-drag-preview',
  };
  expandable: TableExtendableMetaData = {
    allow: false,
    multiple: false,
    type: TableExtendableTypes.table,
  };
  table: Table<T> = null;
  selectionModel = new SelectionModel<any>(true, []);
  actionsSelectionModel = new SelectionModel<any>(true, []);
  expandableRenderingSelectionModel = new SelectionModel<any>(true, []);
  expandableSelectionModel = new SelectionModel<any>(true, []);
  expandableRenderingTimeout: any;
  parentElement: any;

  constructor(
    config: TableConfig<T>,
    private http: HttpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }))
  ) {
    this.dataSource = config.dataSource;
    this.columns = config.columns;
    if (config?.dataSourceProperty) this.dataSourceProperty = config.dataSourceProperty;
    if (config?.templates) this.templates = overwriteObject(config.templates, this.templates);
    if (config?.table) this.table = config.table;
    if (config?.tableId) this.tableId = config.tableId;
    if (config?.actions) this.actions = overwriteObject(config.actions, this.actions);
    if (config?.operation) this.operation = overwriteObject(config.operation, this.operation);
    if (config?.expandable) this.expandable = overwriteObject(config.expandable, this.expandable);
    if (config?.ordering) this.ordering = overwriteObject(config.ordering, this.ordering);
    if (config?.selection) this.selection = overwriteObject(config.selection, this.selection);
    if (config?.pagination) this.pagination = overwriteObject(config.pagination, this.pagination);
    if (config?.sorting) this.sorting = overwriteObject(config.sorting, this.sorting);
    if (config?.ripple) this.ripple = overwriteObject(config.ripple, this.ripple);
    if (config?.selectionModel) this.selectionModel = config.selectionModel;
    if (config?.actionsSelectionModel) this.actionsSelectionModel = config.actionsSelectionModel;
    if (config?.expandableRenderingSelectionModel)
      this.expandableRenderingSelectionModel = config.expandableRenderingSelectionModel;
    if (config?.expandableSelectionModel) this.expandableSelectionModel = config.expandableSelectionModel;
    if (config?.expandableRenderingTimeout) this.expandableRenderingTimeout = config.expandableRenderingTimeout;
    if (config?.detectChanges) this.detectChanges = config.detectChanges;
    if (config?.selectionChanged) this.selectionChanged = config.selectionChanged;
    if (config?.sortingChanged) this.sortingChanged = config.sortingChanged;
    if (config?.paginationChanged) this.paginationChanged = config.paginationChanged;
    if (config?.orderingChanged) this.orderingChanged = config.orderingChanged;
    if (config?.parentElement) this.parentElement = config.parentElement;
  }

  refresh(): void {
    this.detectChanges.next(true);
  }

  getNestedTable(element: any): Table<any> {
    this.table.parentElement = element;
    if (this.table.dataSourceProperty) {
      if (element[this.table.dataSourceProperty]) {
        this.table.dataSource = element[this.table.dataSourceProperty];
      } else {
        this.table.dataSource = [];
      }
    }
    return new Table<any>(this.table);
  }

  hasNestedTable(): boolean {
    return !!this.table?.table;
  }

  getDataSource(): any[] {
    switch (true) {
      case this.isOperationHttp():
        return this.dataSource;
      case this.isOperationDatasource():
        return this.getCurrentDataSource();
      default:
        return this.dataSource;
    }
  }

  private getCurrentDataSource(): any[] {
    const displayingDatasource = [].concat(this.dataSource);
    if (this.sorting.sort) {
      if (this.sorting.sort.direction) {
        displayingDatasource.sort((a, b) => {
          if (typeof a[this.sorting.sort.active] === 'number') {
            return this.sorting.sort.direction === 'asc'
              ? a[this.sorting.sort.active] - b[this.sorting.sort.active]
              : b[this.sorting.sort.active] - a[this.sorting.sort.active];
          } else if (typeof a[this.sorting.sort.active] === 'string') {
            if (this.sorting.sort.direction === 'asc') {
              if (a[this.sorting.sort.active] > b[this.sorting.sort.active]) return 1;
              if (a[this.sorting.sort.active] < b[this.sorting.sort.active]) return -1;
              return 0;
            } else {
              if (b[this.sorting.sort.active] > a[this.sorting.sort.active]) return 1;
              if (b[this.sorting.sort.active] < a[this.sorting.sort.active]) return -1;
              return 0;
            }
          } else {
            return 0;
          }
        });
      }
    }
    if (this.pagination.allow)
      return displayingDatasource.slice(
        this.pagination.currentPage * this.pagination.size,
        this.pagination.currentPage * this.pagination.size + this.pagination.size
      );
    else return displayingDatasource;
  }

  getDisplayedColumns(): string[] {
    return this.columns.filter(column => column.display).map(column => column.field);
  }

  onStartedDraggingRow(): void {
    document.body.classList.add('dragging');
  }

  onEndedDraggingRow(): void {
    document.body.classList.remove('dragging');
  }

  isOperationHttp(): boolean {
    return this.operation.type === TableOperationTypes.http;
  }

  isOperationDatasource(): boolean {
    return this.operation.type === TableOperationTypes.datasource;
  }

  isExpandableTemplate(): boolean {
    return this.expandable.type === TableExtendableTypes.template;
  }

  isExpandableTable(): boolean {
    return this.expandable.type === TableExtendableTypes.table;
  }

  sortData(sort: Sort): void {
    this.sorting.sort = sort;
    this.sortingChanged.next(sort);
    if (this.sorting?.subscribe) this.sorting.subscribe(sort);
    if (this.isOperationHttp()) {
      if (this.operation.endpoint) this.loadRequiredDatasource();
    }
  }

  pageData(page: PageEvent): void {
    this.pagination.currentPage = page.pageIndex;
    this.pagination.size = page.pageSize;
    this.pagination.totalCount = page.length;
    this.paginationChanged.next(page);
    if (this.pagination?.subscribe) this.pagination.subscribe(page);
    if (this.isOperationHttp()) {
      if (this.operation.endpoint) this.loadRequiredDatasource();
    }
  }

  private loadRequiredDatasource(): void {
    const payload = {
      skip: this.pagination.currentPage * this.pagination.size,
      take: this.pagination.size,
      sort: this.sorting.sort,
      searchCriteria: this.operation.searchCriteria,
    };
    this.http.post<any>(this.operation.uri + this.operation.endpoint, payload).subscribe(result => {
      if (result) {
        this.dataSource = result;
      }
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
    if (this.ordering?.subscribe) this.ordering.subscribe(this.dataSource);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  areAllSelected(): boolean {
    const numSelected = this.selectionModel.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  selectAllToggle(): void {
    if (this.areAllSelected()) {
      this.selectionModel.clear();

      this.selectionChanged.next(this.selectionModel.selected);
      if (this.selection?.subscribe) this.selection.subscribe(this.selectionModel.selected);
      return;
    }
    if (this.selection.multiple) {
      this.selectionModel.select(...this.dataSource);
      this.selectionChanged.next(this.selectionModel.selected);
      if (this.selection?.subscribe) this.selection.subscribe(this.selectionModel.selected);
    }
  }

  selectAll(): void {
    if (this.selection.multiple) {
      this.dataSource.forEach(row => this.selectRow(row, true));
    }
  }

  deselectAll(): void {
    this.dataSource.forEach(row => this.selectRow(row, false, true));
  }

  selectRow(element: any, forceSelect: boolean = false, forceDeselect: boolean = false): void {
    if (!this.selection.multiple) this.selectionModel.clear();
    if (!forceSelect && !forceDeselect) {
      this.selectionModel.toggle(element);
    } else if (forceSelect && !forceDeselect) {
      this.selectionModel.select(element);
    } else if (!forceSelect && forceDeselect) {
      this.selectionModel.deselect(element);
    } else {
      this.selectionModel.toggle(element);
    }
    this.selectionChanged.next(this.selectionModel.selected);
    if (this.selection?.subscribe) this.selection.subscribe(this.selectionModel.selected);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any, field?: string): string {
    if (!row) {
      return `${this.areAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selectionModel.isSelected(row) ? 'deselect' : 'select'} row ${field + 1}`;
  }

  areAllExpanded(): boolean {
    const numSelected = this.expandableSelectionModel.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  expandAll(): void {
    if (this.expandable.multiple) {
      this.dataSource.forEach(row => this.expandRow(row, true));
    }
  }

  collapseAll(): void {
    this.dataSource.forEach(row => this.expandRow(row, false, true));
  }

  expandAllToggle(): void {
    this.dataSource.forEach(row => this.expandRow(row));
  }

  expandRow(element: any, forceExpand: boolean = false, forceCollapse: boolean = false): void {
    clearTimeout(this.expandableRenderingTimeout);
    const isSelected: boolean = this.expandableSelectionModel.isSelected(element);
    if (!isSelected && !forceCollapse) this.expandableRenderingSelectionModel.select(element);
    this.expandableRenderingTimeout = setTimeout(() => {
      this.expandableRenderingSelectionModel.clear();
      this.expandableRenderingSelectionModel.select(...this.expandableSelectionModel.selected);
      this.detectChanges.next(true);
    }, 225);
    this.expandableSelection(this.expandableSelectionModel, element, forceExpand, forceCollapse);
  }

  private expandableSelection(
    selectionModel: SelectionModel<any>,
    element: any,
    forceExpand: boolean = false,
    forceCollapse: boolean = false
  ): void {
    if (!this.expandable.multiple) {
      const isSelected: boolean = selectionModel.isSelected(element);
      selectionModel.clear();
      isSelected ? selectionModel.deselect(element) : selectionModel.select(element);
    } else {
      if (!forceCollapse && !forceExpand) {
        selectionModel.toggle(element);
      } else if (forceCollapse && !forceExpand) {
        selectionModel.deselect(element);
      } else if (!forceCollapse && forceExpand) {
        selectionModel.select(element);
      } else {
        selectionModel.toggle(element);
      }
    }
    this.detectChanges.next(true);
  }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('tableExpandAnimation', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('* => expanded', [
        style({ height: '0px', minHeight: '0' }),
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '*' })),
      ]),
      transition('* => collapsed', [
        style({ height: '*', minHeight: '0' }),
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '0px' })),
      ]),
      transition(':enter', [
        style({ height: '0px', minHeight: '0' }),
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '*' })),
      ]),
    ]),
    trigger('tableAnimation', [
      transition(':enter', [
        style({ opacity: '0', transform: 'translateX(50px)' }),
        animate(200, style({ opacity: '1', transform: 'translateX(0px)' })),
      ]),
      transition(':leave', [
        style({ opacity: '1', transform: 'translateX(0px)' }),
        animate(200, style({ opacity: '0', transform: 'translateX(50px)' })),
      ]),
    ]),
  ],
  imports: [
    CdkTable,
    MatSort,
    CdkDropList,
    CdkHeaderCell,
    CommonModule,
    CdkTableModule,
    MatRippleModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    DragDropModule,
    TableTemplateDirective,
  ],
})
export class TableComponent implements AfterViewInit, OnDestroy {
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() sortingChanged: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() paginationChanged: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() orderingChanged: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Input() set table(tableModel: Table<any>) {
    if (tableModel) {
      this._table = tableModel;
      this.initSubscribes(this.table);
    }
  }

  get table(): Table<any> {
    return this._table;
  }

  @Input() set tableConfig(tableConfig: TableConfig<any>) {
    if (tableConfig) {
      this._table = new Table<any>(tableConfig);
      this.initSubscribes(this.table);
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ContentChildren(TableTemplateDirective) tableTemplates: QueryList<ElementRef>;
  private _table: Table<any> = new Table<any>({
    dataSource: [],
    columns: [],
  });
  private _templates: any[] = [];
  public togStatus: boolean = true;
  private unSubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.unSubscribe.next(true);
    this.unSubscribe.complete();
  }

  ngAfterViewInit(): void {
    this.refreshPaginatorLabel();
    this._templates = this.tableTemplates.toArray();
  }

  initSubscribes(table: Table<any>): void {
    table.detectChanges.pipe(takeUntil(this.unSubscribe)).subscribe(changes => {
      if (changes) this.cdr.markForCheck();
    });
    table.selectionChanged.pipe(takeUntil(this.unSubscribe)).subscribe(selection => {
      if (selection) this.selectionChanged.emit(selection);
    });
    table.sortingChanged.pipe(takeUntil(this.unSubscribe)).subscribe(sorting => {
      if (sorting) this.sortingChanged.emit(sorting);
    });
    table.paginationChanged.pipe(takeUntil(this.unSubscribe)).subscribe(pagination => {
      if (pagination) this.paginationChanged.emit(pagination);
    });
    table.orderingChanged.pipe(takeUntil(this.unSubscribe)).subscribe(ordering => {
      if (ordering) this.orderingChanged.emit(ordering);
    });
    if (table.hasNestedTable()) {
      this.initSubscribes(table.getNestedTable({}));
    }
  }

  getTemplate(templateProperty: string): TemplateRef<any> {
    return this._templates.find(template => template?.tableTemplate === templateProperty)?.template;
  }

  refreshPaginatorLabel(): void {
    if (this.table.pagination.itemsPerPageLabel)
      this.paginator._intl.itemsPerPageLabel = this.table.pagination.itemsPerPageLabel;
    if (this.table.pagination.firstPageLabel)
      this.paginator._intl.firstPageLabel = this.table.pagination.firstPageLabel;
    if (this.table.pagination.lastPageLabel) this.paginator._intl.lastPageLabel = this.table.pagination.lastPageLabel;
    if (this.table.pagination.nextPageLabel) this.paginator._intl.nextPageLabel = this.table.pagination.nextPageLabel;
    if (this.table.pagination.previousPageLabel)
      this.paginator._intl.previousPageLabel = this.table.pagination.previousPageLabel;
  }
}
