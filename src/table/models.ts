import { Observable, Subject } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { ThemePalette } from '@angular/material/core';
import { Table } from './table.component';

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
  dragPreviewTemplate?: string;
}

export interface TableOrderingMetaData {
  allow?: boolean;
  boundary?: boolean;
  template?: boolean;
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
  sortable?: boolean;
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
