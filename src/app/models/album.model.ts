export interface Album {
    id: number;                 // collectionId
    title: string;              // collectionName
    artist: string;             // artistName
    artwork: string;            // artworkUrl100
    releaseDate?: string;
    trackCount?: number;
    genre?: string;
  }
  