export interface AuthorModel {
  author: string;
  nationality: string;
  totalBooks: number;
  awardWinner: boolean;
  books?: BookModel[];
  [key: string]: any;
}

export interface BookModel {
  title: string;
  publisher: string;
  date: string;
  pages: number;
}

export const DataSource: AuthorModel[] = [
  {
    nationality: 'American',
    author: 'Rabindra Nath Tagore',
    totalBooks: 2,
    awardWinner: true,
    books: [
      { title: 'ttt', publisher: 'klo', date: '02.36', pages: 1 },
      { title: 'dfg', publisher: 'jk', date: 'dfg', pages: 95 },
    ],
  },
  {
    nationality: 'Belgian',
    author: 'Mulk Raj Anand',
    totalBooks: 1,
    awardWinner: false,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
  {
    nationality: 'British',
    author: 'R K Narayan',
    totalBooks: 3,
    awardWinner: true,
    books: [
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
    ],
  },
  {
    nationality: 'Chinese',
    author: 'Adolf Hitler',
    totalBooks: 2,
    awardWinner: false,
    books: [
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
    ],
  },
  {
    nationality: 'French',
    author: 'J. K. Rowling',
    totalBooks: 1,
    awardWinner: true,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
  {
    nationality: 'German',
    author: 'Gilbert Patten',
    totalBooks: 3,
    awardWinner: true,
    books: [
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
    ],
  },
  {
    nationality: 'Japanese',
    author: 'Akira Toriyama',
    totalBooks: 1,
    awardWinner: false,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
  {
    nationality: 'Spanish',
    author: 'Horatio Alger',
    totalBooks: 2,
    awardWinner: true,
    books: [
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
    ],
  },
  {
    nationality: 'Swedish',
    author: 'Stephen King',
    totalBooks: 5,
    awardWinner: true,
    books: [
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
    ],
  },
  {
    nationality: 'German-Swiss',
    author: 'Paulo Coelho',
    totalBooks: 1,
    awardWinner: true,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
  {
    nationality: 'British/Canadian',
    author: 'Jirō Akagawa',
    totalBooks: 2,
    awardWinner: false,
    books: [
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
    ],
  },
  {
    nationality: 'Brazilian',
    author: 'Jeffrey Archer',
    totalBooks: 3,
    awardWinner: true,
    books: [
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
    ],
  },
  {
    nationality: 'American',
    author: "Louis L'Amour",
    totalBooks: 1,
    awardWinner: true,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
  {
    nationality: 'South African/British',
    author: 'René Goscinny',
    totalBooks: 2,
    awardWinner: false,
    books: [
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
    ],
  },
  {
    nationality: 'Spanish',
    author: 'Edgar Wallace',
    totalBooks: 1,
    awardWinner: false,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
  {
    nationality: 'Swedish',
    author: 'Janet Dailey',
    totalBooks: 3,
    awardWinner: true,
    books: [
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
      { title: '', publisher: '', date: '', pages: 1 },
    ],
  },
  {
    nationality: 'Japanese',
    author: 'Jin Yong',
    totalBooks: 4,
    awardWinner: false,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
  {
    nationality: 'Swedish',
    author: 'Frédéric Dard',
    totalBooks: 5,
    awardWinner: true,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
  {
    nationality: 'American',
    author: 'Roald Dahl',
    totalBooks: 3,
    awardWinner: true,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
  {
    nationality: 'Swedish',
    author: 'John Grisham',
    totalBooks: 1,
    awardWinner: false,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
  {
    nationality: 'Japanese',
    author: 'Zane Grey',
    totalBooks: 2,
    awardWinner: false,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
  {
    nationality: 'American',
    author: 'Irving Wallace',
    totalBooks: 1,
    awardWinner: true,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
  {
    nationality: 'Swedish',
    author: 'J. R. R. Tolkien',
    totalBooks: 2,
    awardWinner: false,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
  {
    nationality: 'American',
    author: 'Masashi Kishimoto',
    totalBooks: 1,
    awardWinner: true,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
  {
    nationality: 'Japanese',
    author: 'Gosho Aoyama',
    totalBooks: 2,
    awardWinner: true,
    books: [{ title: '', publisher: '', date: '', pages: 1 }],
  },
];
