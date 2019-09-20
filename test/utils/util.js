// mock data for user authentication
exports.signUpUser = {
  firstname: 'Chris',
  lastname: 'Evans',
  email: 'chris@test.com',
  password: 'chrisevanstest',
  gender: 'Male',
  jobRole: 'ux designer',
  department: 'design',
  address: 'kampala',
};

exports.emailExists = {
  firstname: 'Jessica',
  lastname: 'Jones',
  email: 'jessica@test.com',
  password: 'jessicatests',
  gender: 'female',
  jobRole: 'Backend developer',
  department: 'Engineering',
  address: 'Kigali',
};

exports.baduser = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@test.com',
  password: 'johndoe',
  gender: 'Male',
  jobRole: 'ux designer',
  department: 'design',
  address: 'kampala',
};

exports.loginuser = {
  email: 'johndoe@test.com',
  password: 'johndoetest',
};

exports.bademail = {
  email: 'johndo@test.com',
  password: 'johndoetest',
};

exports.badpassword = {
  email: 'johndoe@test.com',
  password: 'johndoe',
};

// mock data for posting article
exports.article = {
  title: 'Backend development',
  article: 'Do you want to be a backend and developer dont missout on the workshop',
};

exports.badArticle = {
  title: 'Back',
  article: 'Do you know',
};

// mock data for edit article
