import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Album } from '../../models/album.model';

@Component({
  selector: 'app-disc-grid',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './disc-grid.component.html',
  styleUrl: './disc-grid.component.scss',
})
export class DiscGridComponent implements OnChanges {
  @Input({ required: true }) albums: Album[] = [];
  @Output() open = new EventEmitter<number>();

  displayedColumns: string[] = ['title', 'artist'];
  dataSource = new MatTableDataSource<Album>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['albums']) {
      this.dataSource.data = this.albums ?? [];
    }
  }

  onRowClick(row: Album) {
    this.open.emit(row.id);
  }
}
