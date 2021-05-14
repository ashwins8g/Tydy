import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  typeAheadFormControl: FormControl = new FormControl('');

  @Output() newSearchTerm = new EventEmitter<string>();

  private _subscriptions: Subscription = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.initialiseTypeAheadSearch();
  }

  initialiseTypeAheadSearch(): void {
    this._subscriptions.add(
      this.typeAheadFormControl.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          map((searchTerm) => String(searchTerm).trim().toLowerCase())
        )
        .subscribe((newSearchTerm) => this.searchFor(newSearchTerm))
    );
  }

  searchFor(searchTerm: string): void {
    this.newSearchTerm.emit(searchTerm);
  }

  clearSearch(): void {
    this.typeAheadFormControl.setValue('');
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
