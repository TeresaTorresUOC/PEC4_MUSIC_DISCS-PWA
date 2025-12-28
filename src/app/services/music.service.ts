import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Album } from '../models/album.model';

type ItunesSearchResponse = {
  resultCount: number;
  results: any[];
};

type ItunesLookupResponse = {
  resultCount: number;
  results: any[];
};

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private readonly baseUrl = 'https://itunes.apple.com';

  constructor(private http: HttpClient) {}

  
  searchAlbums(term: string, limit = 20): Observable<Album[]> {
    const params = new HttpParams()
      .set('term', term)
      .set('entity', 'album')
      .set('limit', limit);

    return this.http
      .get<ItunesSearchResponse>(`${this.baseUrl}/search`, { params })
      .pipe(
        map((res) =>
          (res.results ?? []).map((a) => ({
            id: a.collectionId,
            title: a.collectionName,
            artist: a.artistName,
            artwork: a.artworkUrl100,
            releaseDate: a.releaseDate,
            trackCount: a.trackCount,
            genre: a.primaryGenreName,
          }))
        )
      );
  }


  getAlbumDetail(id: number): Observable<{
    album: Album | null;
    tracks: { trackId: number; name: string; durationMs?: number }[];
  }> {
    const params = new HttpParams().set('id', id).set('entity', 'song');

    return this.http
      .get<ItunesLookupResponse>(`${this.baseUrl}/lookup`, { params })
      .pipe(
        map((res) => {
          const results = res.results ?? [];

          const albumRaw = results.find((r) => r.wrapperType === 'collection');
          const tracksRaw = results.filter((r) => r.wrapperType === 'track');

          const album: Album | null = albumRaw
            ? {
                id: albumRaw.collectionId,
                title: albumRaw.collectionName,
                artist: albumRaw.artistName,
                artwork: albumRaw.artworkUrl100,
                releaseDate: albumRaw.releaseDate,
                trackCount: albumRaw.trackCount,
                genre: albumRaw.primaryGenreName,
              }
            : null;

          const tracks = tracksRaw.map((t) => ({
            trackId: t.trackId,
            name: t.trackName,
            durationMs: t.trackTimeMillis,
          }));

          return { album, tracks };
        })
      );
  }
}
