import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DiscCardComponent } from '../../shared/disc-card/disc-card.component';
import { DiscGridComponent } from '../../shared/disc-grid/disc-grid.component';

import { MusicService } from '../../services/music.service';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-discs-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DiscCardComponent,
    DiscGridComponent
  ],
  templateUrl: './discs-list.component.html',
  styleUrls: ['./discs-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class DiscsListComponent implements OnInit {
  viewMode: 'cards' | 'table' = 'cards';

  loading = true;
  albums: Album[] = [];

  term = 'daft punk';

  constructor(
    private musicService: MusicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAlbums();
  }

  setView(mode: 'cards' | 'table'): void {
    this.viewMode = mode;
  }

  loadAlbums(): void {
    this.loading = true;

    this.musicService.searchAlbums(this.term).subscribe({
      next: (albums: Album[]) => {
        this.albums = albums;
        this.loading = false;
      },
      error: (err: unknown) => {
        console.error(err);
        this.albums = [];
        this.loading = false;
      }
    });
  }

  goToDetail(albumId: number): void {
    this.router.navigate(['/detail', albumId]);
  }
}
