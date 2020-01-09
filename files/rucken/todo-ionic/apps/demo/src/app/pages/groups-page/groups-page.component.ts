import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BindIoInner } from 'ngx-bind-io';
import { environment } from '../../../environments/environment';

@BindIoInner()
@Component({
  selector: 'groups-page',
  templateUrl: './groups-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsPageComponent {
  apiUrl = environment.apiUrl;
  title$: Observable<string>;
  constructor(
    public activatedRoute: ActivatedRoute
  ) {
    this.title$ = activatedRoute.data.pipe(
      map(data => data && data.meta && data.meta.title)
    );
  }
}
