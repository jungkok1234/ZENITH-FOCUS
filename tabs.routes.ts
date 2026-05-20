import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'today',
        loadComponent: () => import('./today/today.page').then(m => m.TodayPage)
      },
      {
        path: 'focusionic',  // <-- CHANGED from 'focus' to 'focusionic'
        loadComponent: () => import('./focusionic/focusionic.page').then(m => m.FocusionicPage)
      },
      {
        path: 'habits',
        loadComponent: () => import('./habits/habits.page').then(m => m.HabitsPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage)
      },
      {
        path: '',
        redirectTo: 'today',
        pathMatch: 'full'
      }
    ]
  }
];