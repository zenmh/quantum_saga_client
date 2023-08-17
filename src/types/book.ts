type IBook = {
  _id: string;
  title: string;
  genre: string;
  author: string;
  publication_date: string;
  reviews?: {
    email: string;
    comment: string;
  }[];
};

export type { IBook };
