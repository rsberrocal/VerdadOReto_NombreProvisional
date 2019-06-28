import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerdadORetoPage } from './verdad-o-reto.page';

const routes: Routes = [
  {
    path: '',
    component: VerdadORetoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerdadORetoPage]
})
export class VerdadORetoPageModule {}
