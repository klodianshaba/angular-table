import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatRipple } from '@angular/material/core';
import { bounceIn, staggerNestedAnimations, swing, zoomIn } from 'ngxa';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MatButton, RouterLink, NgOptimizedImage, MatRipple],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  animations: [
    bounceIn({ stateChangeExpressions: ':enter', timings: '1s', direction: 'Right' }),
    bounceIn({ stateChangeExpressions: ':enter', timings: '1s', direction: 'Left' }),
    bounceIn({ stateChangeExpressions: ':enter', timings: '1s', direction: 'Down' }),
    zoomIn({ stateChangeExpressions: ':enter', timings: '1s', direction: 'Down' }),
    swing({ stateChangeExpressions: ':enter', timings: '1s' }),
    staggerNestedAnimations({
      triggerName: 'stagger',
      stateChangeExpressions: ':enter',
      timings: '300ms',
      nestedAnimations: 'none',
    }),
  ],
})
export class WelcomeComponent {}
