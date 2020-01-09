import { HomePageComponent } from './home-page.component';
import { translate } from '@rucken/core';
import { MetaGuard } from '@ngx-meta/core';

export const HOME_PAGE_ROUTES = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [MetaGuard],
    data: {
      name: 'home',
      visible: false,
      meta: {
        title: translate('Home')
      }
    }
  }
];
