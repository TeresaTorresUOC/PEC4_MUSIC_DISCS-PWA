import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Album } from '../../models/album.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-disc-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './disc-card.component.html',
  styleUrl: './disc-card.component.scss',
})
export class DiscCardComponent {
  @Input({ required: true }) album!: Album;
  @Output() open = new EventEmitter<number>();

  onOpen() {
    this.open.emit(this.album.id);
  }
}
