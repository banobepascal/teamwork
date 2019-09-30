// mock data for user authentication
exports.signUpUser = {
  firstname: 'Chris',
  lastname: 'Evans',
  email: 'chris@test.com',
  password: 'Chrisevanstest1!',
  confirmPassword: 'Chrisevanstest1!',
  gender: 'Male',
  jobRole: 'ux designer',
  department: 'design',
  address: 'kampala',
};

exports.emailExists = {
  firstname: 'Jessica',
  lastname: 'Jones',
  email: 'jessica@test.com',
  password: 'Jessicatests1!',
  confirmPassword: 'Jessicatests1!',
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

// sigin mock data
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

// mock data for  comment article
exports.goodComment = {
  comment: 'thats awesome',
};

exports.badComment = {
  comment: '',
};

// mock data for flaging article
exports.goodFlag = {
  flag: true,
};

exports.badFlag = {
  flag: 'good',
};
