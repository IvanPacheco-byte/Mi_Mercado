import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'despensa',
    loadComponent: () => import('./pages/pantry/pantry.page').then((m) => m.PantryPage),
  },
  {
    path: 'vencimientos',
    loadComponent: () => import('./pages/expiry/expiry.page').then((m) => m.ExpiryPage),
  },
  {
    path: 'compras',
    loadComponent: () => import('./pages/shopping/shopping.page').then((m) => m.ShoppingPage),
  },
  {
    path: 'recetas',
    loadComponent: () => import('./pages/recipes/recipes.page').then((m) => m.RecipesPage),
  },
  {
    path: 'notificaciones',
    loadComponent: () => import('./pages/notifications/notifications.page').then((m) => m.NotificationsPage),
  },
  {
    path: 'notificaciones/:id',
    loadComponent: () =>
      import('./pages/notifications/notification-detail.page').then((m) => m.NotificationDetailPage),
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];
