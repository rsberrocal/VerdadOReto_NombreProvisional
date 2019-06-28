import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'users', loadChildren: './users/users.module#UsersPageModule' },
  { path: 'pruebas', loadChildren: './pruebas/pruebas.module#PruebasPageModule' },
  { path: 'verdad-o-reto', loadChildren: './verdad-o-reto/verdad-o-reto.module#VerdadORetoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
