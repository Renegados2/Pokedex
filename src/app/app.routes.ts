import { Routes } from '@angular/router';
import { Home } from './view/home/home';
import { Details } from './view/details/details';
import { Data } from './view/details/components/data/data';
import { Forms } from './view/details/components/forms/forms';
import { Info } from './view/details/components/info/info';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'details/:id',
    component: Details,
    children: [
      {
        path: '',
        redirectTo: 'data',
        pathMatch: 'full'
      },
      {
        path: 'data',
        component: Data,
      },
      {
        path: 'forms',
        component: Forms,
      },
      {
        path: 'info',
        component: Info,
      },
    ],
  },
];
