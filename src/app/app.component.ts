import { Component } from '@angular/core';
import { ExportTableDataStateService } from './export-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  newSearchTerm = '';

  constructor(private tableDataService: ExportTableDataStateService) {}

  handleSearchTerm(searchTerm: string): void {
    this.newSearchTerm = searchTerm;
  }

  emitExportEvent(): void {
    this.tableDataService.changeTableDataExportAllowedState(true);
  }
}
