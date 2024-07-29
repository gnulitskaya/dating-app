import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService {

  constructor(
    private _breakpointObserver: BreakpointObserver
  ) {}

  isMobileDevice$(): Observable<boolean> {
    return this._breakpointObserver.observe('(max-width: 768px)').pipe(
      map(({ matches }) => matches)
    );
  }

  isDesktopDevice$(): Observable<boolean> {
    return this._breakpointObserver.observe('(min-width: 992px)').pipe(
      map(({ matches }) => matches)
    );
  }
}
