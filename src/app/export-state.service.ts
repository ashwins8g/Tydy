import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ExportTableDataStateService {
  private isTableDataExportAllowed = new BehaviorSubject<boolean>(false);
  isTableDataExportAllowed$ = this.isTableDataExportAllowed.asObservable();

  constructor() {}

  changeTableDataExportAllowedState(isAllowed: boolean) {
    this.isTableDataExportAllowed.next(isAllowed);
  }
}
