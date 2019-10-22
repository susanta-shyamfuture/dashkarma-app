import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './views/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './views/auth/register/register.module#RegisterPageModule' },
  {
    path: 'user',
    loadChildren: () => import('./views/user-tabs/user-tabs.module').then( m => m.UserTabsPageModule),
  },
  {
    path: '**', redirectTo: 'user', pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
