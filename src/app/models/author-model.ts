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
    totalBooks: 10,
    awardWinner: true,
    books: [
      { title: 'Don Quixote', publisher: 'Bonnier Books', date: '5/8/2022', pages: 95 },
      { title: 'Jane Eyre', publisher: 'Pearson', date: '9/25/2000', pages: 105 },
      { title: 'Moby Dick', publisher: 'Scholastic', date: '8/12/2021', pages: 200 },
      { title: 'Little Women', publisher: 'Simon and Schuster', date: '12/7/2015', pages: 240 },
      { title: 'Oliver Twist', publisher: 'Macmillan Publishers', date: '5/8/2012', pages: 50 },
      { title: 'Dracula', publisher: 'Penguin Random House', date: '7/27/2001', pages: 180 },
      { title: 'War and Peace', publisher: 'HarperCollins', date: '5/23/2022', pages: 300 },
      { title: 'Ulysses', publisher: 'Bonnier Books', date: '9/14/2022', pages: 450 },
      { title: 'Black Beauty', publisher: 'Bonnier Books', date: '5/16/2022', pages: 600 },
      { title: 'Lord Jim', publisher: 'HarperCollins', date: '6/29/2022', pages: 235 },
    ],
  },
  {
    nationality: 'Belgian',
    author: 'Mulk Raj Anand',
    totalBooks: 1,
    awardWinner: false,
    books: [{ title: 'Lord Jim', publisher: 'HarperCollins', date: '6/29/2022', pages: 235 }],
  },
  {
    nationality: 'British',
    author: 'R K Narayan',
    totalBooks: 3,
    awardWinner: true,
    books: [
      { title: 'Ulysses', publisher: 'Bonnier Books', date: '9/14/2022', pages: 450 },
      { title: 'Black Beauty', publisher: 'Bonnier Books', date: '5/16/2022', pages: 600 },
      { title: 'Lord Jim', publisher: 'HarperCollins', date: '6/29/2022', pages: 235 },
    ],
  },
  {
    nationality: 'Chinese',
    author: 'Adolf Hitler',
    totalBooks: 2,
    awardWinner: false,
    books: [
      { title: 'War and Peace', publisher: 'HarperCollins', date: '5/23/2022', pages: 300 },
      { title: 'Ulysses', publisher: 'Bonnier Books', date: '9/14/2022', pages: 450 },
    ],
  },
  {
    nationality: 'French',
    author: 'J. K. Rowling',
    totalBooks: 4,
    awardWinner: true,
    books: [
      { title: 'Don Quixote', publisher: 'Bonnier Books', date: '5/8/2022', pages: 95 },
      { title: 'Little Women', publisher: 'Simon and Schuster', date: '12/7/2015', pages: 240 },
      { title: 'Oliver Twist', publisher: 'Macmillan Publishers', date: '5/8/2012', pages: 50 },
      { title: 'Dracula', publisher: 'Penguin Random House', date: '7/27/2001', pages: 180 },
    ],
  },
  {
    nationality: 'German',
    author: 'Gilbert Patten',
    totalBooks: 3,
    awardWinner: true,
    books: [
      { title: 'Little Women', publisher: 'Simon and Schuster', date: '12/7/2015', pages: 240 },
      { title: 'Oliver Twist', publisher: 'Macmillan Publishers', date: '5/8/2012', pages: 50 },
      { title: 'Dracula', publisher: 'Penguin Random House', date: '7/27/2001', pages: 180 },
    ],
  },
  {
    nationality: 'Japanese',
    author: 'Akira Toriyama',
    totalBooks: 1,
    awardWinner: false,
    books: [{ title: 'Oliver Twist', publisher: 'Macmillan Publishers', date: '5/8/2012', pages: 50 }],
  },
  {
    nationality: 'Spanish',
    author: 'Horatio Alger',
    totalBooks: 4,
    awardWinner: true,
    books: [
      { title: 'Jane Eyre', publisher: 'Pearson', date: '9/25/2000', pages: 105 },
      { title: 'Moby Dick', publisher: 'Scholastic', date: '8/12/2021', pages: 200 },
      { title: 'Little Women', publisher: 'Simon and Schuster', date: '12/7/2015', pages: 240 },
      { title: 'Oliver Twist', publisher: 'Macmillan Publishers', date: '5/8/2012', pages: 50 },
    ],
  },
  {
    nationality: 'Swedish',
    author: 'Stephen King',
    totalBooks: 5,
    awardWinner: true,
    books: [
      { title: 'Moby Dick', publisher: 'Scholastic', date: '8/12/2021', pages: 200 },
      { title: 'Little Women', publisher: 'Simon and Schuster', date: '12/7/2015', pages: 240 },
      { title: 'Oliver Twist', publisher: 'Macmillan Publishers', date: '5/8/2012', pages: 50 },
      { title: 'Dracula', publisher: 'Penguin Random House', date: '7/27/2001', pages: 180 },
      { title: 'War and Peace', publisher: 'HarperCollins', date: '5/23/2022', pages: 300 },
    ],
  },
  {
    nationality: 'German-Swiss',
    author: 'Paulo Coelho',
    totalBooks: 1,
    awardWinner: true,
    books: [{ title: 'Little Women', publisher: 'Simon and Schuster', date: '12/7/2015', pages: 240 }],
  },
  {
    nationality: 'British/Canadian',
    author: 'Jirō Akagawa',
    totalBooks: 2,
    awardWinner: false,
    books: [
      { title: 'Oliver Twist', publisher: 'Macmillan Publishers', date: '5/8/2012', pages: 50 },
      { title: 'Dracula', publisher: 'Penguin Random House', date: '7/27/2001', pages: 180 },
    ],
  },
  {
    nationality: 'Brazilian',
    author: 'Jeffrey Archer',
    totalBooks: 3,
    awardWinner: true,
    books: [
      { title: 'Little Women', publisher: 'Simon and Schuster', date: '12/7/2015', pages: 240 },
      { title: 'Oliver Twist', publisher: 'Macmillan Publishers', date: '5/8/2012', pages: 50 },
      { title: 'Dracula', publisher: 'Penguin Random House', date: '7/27/2001', pages: 180 },
    ],
  },
  {
    nationality: 'American',
    author: "Louis L'Amour",
    totalBooks: 1,
    awardWinner: true,
    books: [{ title: 'Moby Dick', publisher: 'Scholastic', date: '8/12/2021', pages: 200 }],
  },
  {
    nationality: 'South African/British',
    author: 'René Goscinny',
    totalBooks: 3,
    awardWinner: false,
    books: [
      { title: 'Don Quixote', publisher: 'Bonnier Books', date: '5/8/2022', pages: 95 },
      { title: 'Jane Eyre', publisher: 'Pearson', date: '9/25/2000', pages: 105 },
      { title: 'Moby Dick', publisher: 'Scholastic', date: '8/12/2021', pages: 200 },
    ],
  },
  {
    nationality: 'Spanish',
    author: 'Edgar Wallace',
    totalBooks: 1,
    awardWinner: false,
    books: [{ title: 'Moby Dick', publisher: 'Scholastic', date: '8/12/2021', pages: 200 }],
  },
  {
    nationality: 'Swedish',
    author: 'Janet Dailey',
    totalBooks: 3,
    awardWinner: true,
    books: [
      { title: 'Don Quixote', publisher: 'Bonnier Books', date: '5/8/2022', pages: 95 },
      { title: 'Jane Eyre', publisher: 'Pearson', date: '9/25/2000', pages: 105 },
      { title: 'Moby Dick', publisher: 'Scholastic', date: '8/12/2021', pages: 200 },
    ],
  },
  {
    nationality: 'Japanese',
    author: 'Jin Yong',
    totalBooks: 4,
    awardWinner: false,
    books: [
      { title: 'Don Quixote', publisher: 'Bonnier Books', date: '5/8/2022', pages: 95 },
      { title: 'Jane Eyre', publisher: 'Pearson', date: '9/25/2000', pages: 105 },
      { title: 'Moby Dick', publisher: 'Scholastic', date: '8/12/2021', pages: 200 },
      { title: 'Moby Dick', publisher: 'Scholastic', date: '8/12/2021', pages: 200 },
    ],
  },
  {
    nationality: 'Swedish',
    author: 'Frédéric Dard',
    totalBooks: 1,
    awardWinner: true,
    books: [{ title: 'Jane Eyre', publisher: 'Pearson', date: '9/25/2000', pages: 105 }],
  },
  {
    nationality: 'American',
    author: 'Roald Dahl',
    totalBooks: 1,
    awardWinner: true,
    books: [{ title: 'Don Quixote', publisher: 'Bonnier Books', date: '5/8/2022', pages: 95 }],
  },
  {
    nationality: 'Swedish',
    author: 'John Grisham',
    totalBooks: 1,
    awardWinner: false,
    books: [{ title: 'Don Quixote', publisher: 'Bonnier Books', date: '5/8/2022', pages: 95 }],
  },
  {
    nationality: 'Japanese',
    author: 'Zane Grey',
    totalBooks: 2,
    awardWinner: false,
    books: [
      { title: 'Dracula', publisher: 'Penguin Random House', date: '7/27/2001', pages: 180 },
      { title: 'War and Peace', publisher: 'HarperCollins', date: '5/23/2022', pages: 300 },
    ],
  },
  {
    nationality: 'American',
    author: 'Irving Wallace',
    totalBooks: 2,
    awardWinner: true,
    books: [
      { title: 'Dracula', publisher: 'Penguin Random House', date: '7/27/2001', pages: 180 },
      { title: 'War and Peace', publisher: 'HarperCollins', date: '5/23/2022', pages: 300 },
    ],
  },
  {
    nationality: 'Swedish',
    author: 'J. R. R. Tolkien',
    totalBooks: 2,
    awardWinner: false,
    books: [
      { title: 'Dracula', publisher: 'Penguin Random House', date: '7/27/2001', pages: 180 },
      { title: 'War and Peace', publisher: 'HarperCollins', date: '5/23/2022', pages: 300 },
    ],
  },
  {
    nationality: 'American',
    author: 'Masashi Kishimoto',
    totalBooks: 2,
    awardWinner: true,
    books: [
      { title: 'Little Women', publisher: 'Simon and Schuster', date: '12/7/2015', pages: 240 },
      { title: 'Oliver Twist', publisher: 'Macmillan Publishers', date: '5/8/2012', pages: 50 },
    ],
  },
  {
    nationality: 'Japanese',
    author: 'Gosho Aoyama',
    totalBooks: 2,
    awardWinner: true,
    books: [
      { title: 'Little Women', publisher: 'Simon and Schuster', date: '12/7/2015', pages: 240 },
      { title: 'Oliver Twist', publisher: 'Macmillan Publishers', date: '5/8/2012', pages: 50 },
    ],
  },
];
