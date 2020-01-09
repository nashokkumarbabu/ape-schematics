import { translate } from '@rucken/core';
import { ProjectsFrameComponent } from './projects-frame.component';
import { MetaGuard } from '@ngx-meta/core';

export const PROJECTS_FRAME_ROUTES = [
  {
    path: '',
    component: ProjectsFrameComponent,
    canActivate: [MetaGuard],
    data: {
      name: 'projects',
      meta: {
        title: translate('Projects'),
        description: translate('Projects frame')
      }
    }
  }
];
