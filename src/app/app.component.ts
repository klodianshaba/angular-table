import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../table/table.component';
import { MatButton } from '@angular/material/button';
import { TableTemplateDirective } from '../table/table-template.directive';
import { CustomizeComponent } from './components/customize/customize.component';
import { MatIcon } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { MatRipple } from '@angular/material/core';
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
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
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

  constructor() {}
}
