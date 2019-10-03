import users from './users';

const author = users.find((user) => user.id);

const comments = [
  {
    comment_id: 1,
    authorId: author.id,
    comment: 'good article',
  },
  {
    comment_id: 2,
    authorId: author.id + 1,
    comment: 'awesome article',
  },
];

export default comments;
