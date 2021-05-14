import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { users } from '../user-data.db';
import { ExportTableDataStateService } from '../export-state.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() newSearchTerm = '';

  columnsToDisplay: string[] = [
    'firstName',
    'lastName',
    'aadharNumber',
    'email',
    'mobile',
    'dob',
  ];
  recordsPerPage = 20;
  tableDataSource = new MatTableDataSource(users);

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  @ViewChild('exporter', { static: false }) exporterRef: any;

  private _subscriptions: Subscription = new Subscription();

  constructor(private tableDataStateService: ExportTableDataStateService) {
    this._subscriptions.add(
      tableDataStateService.isTableDataExportAllowed$
        .pipe(
          distinctUntilChanged(),
          filter((isAllowed) => !!isAllowed)
        )
        .subscribe(() => this.exportDataToCsvFile())
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.newSearchTerm) {
      this.filterUserData(changes.newSearchTerm.currentValue);
    }
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
  }

  filterUserData(searchTerm: string): void {
    this.tableDataSource.filter = searchTerm;

    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  exportDataToCsvFile(): void {
    this.exporterRef.exportTable('csv');

    setTimeout(() => {
      this.tableDataStateService.changeTableDataExportAllowedState(false);
    }, 0);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
