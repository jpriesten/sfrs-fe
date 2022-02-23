import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'component-remote-pagination',
  templateUrl: './remote-pagination.component.html',
  styleUrls: ['./remote-pagination.component.scss'],
})
export class RemotePaginationComponent implements OnInit {
  @Input() maxItemsList: number[] = [];
  @Input() maxItems = 50;
  @Input() data: any = {};

  @Output() onSelectionChanged = new EventEmitter();
  @Output() onNextPage = new EventEmitter();
  @Output() onPreviousPage = new EventEmitter();

  public previousMarkers: string[] = [];
  public nextClickCount = 0;

  constructor() {}

  ngOnInit(): void {}

  selectionChanged(maxItems: number) {
    this.onSelectionChanged.emit(maxItems);
  }

  nextPage(marker?: string) {
    this.nextClickCount++;
    marker ? this.previousMarkers.push(marker) : '';
    let nextPageData = { maxItems: this.maxItems, marker };
    this.onNextPage.emit(nextPageData);
  }

  previousPage() {
    if (this.nextClickCount > 1) {
      let previousPageData = {
        maxItems: this.maxItems,
        marker: this.previousMarkers[this.previousMarkers.length - 2],
      };
      this.onPreviousPage.emit(previousPageData);
    } else this.onPreviousPage.emit({ maxItems: this.maxItems });
    this.nextClickCount--;
    this.previousMarkers.pop();
  }
}
