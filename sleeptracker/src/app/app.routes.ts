import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    children: [
      {
        path: 'track',
        loadComponent: () => import('./track/track.page').then( m => m.TrackPage)
      },
      {
        path: 'history',
        loadComponent: () => import('./history/history.page').then( m => m.HistoryPage)
      },
      {
        path: 'menu',
        loadComponent: () => import('./menu/menu.page').then( m => m.MenuPage)
      },
      {
        path: '',
        redirectTo: 'home/track',
        pathMatch: 'full',
      }, 
    ]
  },
  {
    path: '',
    redirectTo: 'home/track',
    pathMatch: 'full',
  },  
];
