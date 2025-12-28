import { Routes } from '@angular/router';
import { DiscsListComponent } from './pages/discs-list/discs-list.component';
import { DiscDetailComponent } from './pages/disc-detail/disc-detail.component';

export const routes: Routes = [
    {
      path: '',
      component: DiscsListComponent
    },
    {
      path: 'detail/:id',
      component: DiscDetailComponent
    }
  ];
  