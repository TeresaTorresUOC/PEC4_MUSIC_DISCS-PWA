import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

import { MusicService } from '../../services/music.service';
import { Album } from '../../models/album.model';

type Track = { trackId: number; name: string; durationMs?: number };

@Component({
  selector: 'app-disc-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './disc-detail.component.html',
  styleUrl: './disc-detail.component.scss'
})
export class DiscDetailComponent implements OnInit {
  loading = true;
  showDetails = false;

  album: Album | null = null;
  tracks: Track[] = [];

 
  popularity = 0;
  rating = 0;

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!id || Number.isNaN(id)) {
      this.loading = false;
      this.album = null;
      this.tracks = [];
      return;
    }

    this.loading = true;

    this.musicService.getAlbumDetail(id).subscribe({
      next: (res: { album: Album | null; tracks: Track[] }) => {
        this.album = res.album;
        this.tracks = res.tracks;

        this.popularity = this.randomInt(40, 100);
        this.rating = this.randomInt(1, 5);

        this.loading = false;
      },
      error: (err: unknown) => {
        console.error(err);
        this.album = null;
        this.tracks = [];
        this.loading = false;
      }
    });
  }

  back() {
    this.location.back();
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  private randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
