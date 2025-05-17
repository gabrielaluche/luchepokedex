import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent implements OnInit, OnDestroy {
  debounce = new Subject<any>();
  @Output() typing = new EventEmitter<string>();
  @Input() value: string = "charmander";

  ngOnInit(): void {
    this.debounce.pipe(debounceTime(100)).subscribe((filter: any) => {
      this.typing.emit(filter.value);
    });
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }
}
