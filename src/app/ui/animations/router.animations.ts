import { trigger, animate, style, group, query, transition } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [

  transition('* => *', [
    query(':enter, :leave', style({ position: 'fixed', opacity: 1 })),
    group([
      query(':enter', [
        style({ width: '100%', opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      query(':leave', [
        style({ width: '100%', opacity: 1 }),
        animate('10ms ease-in-out', style({ opacity: 0 }))],
        { optional: true }),
    ])
  ])

]);
