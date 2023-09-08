type IBook = {
  id: string;
  title: string;
  genre: string;
  author: string;
  publication_date: string;
  reviews?: {
    email: string;
    comment: string;
  }[];
  updated_at?: string;
  wishlist?: string[];
  read_soon?: string[];
  currently_reading?: string[];
  finished?: string[];
};

export type { IBook };
