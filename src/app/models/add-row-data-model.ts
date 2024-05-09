import { TableColumnMetaData } from '../../table/table.component';
import { AuthorModel } from './author-model';

export interface AddRowDataModel {
  columns: TableColumnMetaData[];
  author: AuthorModel;
  id?: number;
}
