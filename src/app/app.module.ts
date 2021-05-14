import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// custom components
import { UserTableComponent } from './user-table/user-table.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

// custom modules
import { MaterialModule } from './material.module';
import { MatTableExporterModule } from 'mat-table-exporter';

// custom service
import { ExportTableDataStateService } from './export-state.service';

const components = [AppComponent, UserTableComponent, SearchBarComponent];

const modules = [
  AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  MatTableExporterModule,
];

const services = [ExportTableDataStateService];

@NgModule({
  declarations: [...components],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ...modules,
  ],
  providers: [...services],
  bootstrap: [AppComponent],
})
export class AppModule {}
