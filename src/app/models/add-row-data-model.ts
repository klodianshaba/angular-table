import { AuthorModel } from './author-model';
import { TableColumnMetaData } from '../../table/models';

export interface AddRowDataModel {
  columns: TableColumnMetaData[];
  author: AuthorModel;
  id?: number;
}
