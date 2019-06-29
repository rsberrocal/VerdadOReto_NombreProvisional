import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'users', loadChildren: './pages//users/users.module#UsersPageModule' },
  { path: 'pruebas', loadChildren: './pages/pruebas/pruebas.module#PruebasPageModule' },
  { path: 'verdad-o-reto', loadChildren: './pages//verdad-o-reto/verdad-o-reto.module#VerdadORetoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
