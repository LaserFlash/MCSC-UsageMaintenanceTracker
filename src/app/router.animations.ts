import {trigger, animate, style, group, query, transition} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('0 => *', [
    group([
      query(':enter', style({ position: 'fixed', width: '100%' })
      , { optional: true }),
      query(':leave', style({position: 'absolute', width: '100%' })
      , { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(0%)'})),
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(-100%)'})),
      ], { optional: true }),
    ])
  ]),
  transition('* => 0', [
    query(':enter', style({ position: 'fixed', width: '100%' })
    , { optional: true }),
    query(':leave', style({position: 'absolute', width: '100%' })
    , { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(0%)'})),
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(100%)'})),
      ], { optional: true }),
    ])
  ]),
  transition('2 => 1', [
    query(':enter', style({ position: 'fixed', width: '100%' })
    , { optional: true }),
    query(':leave', style({position: 'absolute', width: '100%' })
    , { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(0%)'})),
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(100%)'})),
      ], { optional: true }),
    ])
  ]),
  transition('0 => 1', [
    query(':enter', style({ position: 'fixed', width: '100%' })
    , { optional: true }),
    query(':leave', style({position: 'absolute', width: '100%' })
    , { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(0%)'})),
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(100%)'})),
      ], { optional: true }),
    ])
  ]),
  transition('* => 2', [
    group([
      query(':enter', style({ position: 'fixed', width: '100%' })
      , { optional: true }),
      query(':leave', style({position: 'absolute', width: '100%' })
      , { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(0%)'})),
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(-100%)'})),
      ], { optional: true }),
    ])
  ]),
]);
