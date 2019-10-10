import users from './users';

const author = users.find((user) => user.email);

const articles = [
  {
    id: 1,
    createdOn: 'September 17, 2019 8:36 PM',
    title: 'Frontend',
    article: 'Do you want to be a front end developer',
    authorId: author.email,
    status: true,
    comments: [],
  },
  {
    id: 2,
    createdOn: 'September 18, 2019 8:36 PM',
    title: 'Backend',
    article: 'Do you want to be a Backend developer',
    authorId: author.email,
    status: false,
    comments: [],
  },
  {
    id: 3,
    createdOn: 'September 19, 2019 8:36 PM',
    title: 'Food',
    article: 'Come join master chef and experience the best dishes',
    authorId: author.email,
    status: false,
    comments: [],
  },
  {
    id: 4,
    createdOn: 'September 20, 2019 8:36 PM',
    title: 'Freelancing',
    article: 'Do you want to become a top class freelancer',
    authorId: author.email,
    status: false,
    comments: [],
  },
];

export default articles;
