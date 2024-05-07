import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableTemplate]',
  standalone: true,
})
export class TableTemplateDirective {
  constructor(public readonly template: TemplateRef<any>) {
    this.tableTemplate = 'columnsTemplate';
  }

  @Input('tableTemplate') tableTemplate: string;
}
