import { Routes } from '@angular/router';
import { HealinesComponent } from './healines/healines.component';

export const routes: Routes = [
  { path: '', redirectTo: 'headlines/home', pathMatch: 'full' }, // Redirect empty path to headlines/home
  { path: 'headlines/:selectedTab', component: HealinesComponent },
];
