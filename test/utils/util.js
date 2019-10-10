// mock data for user authentication
exports.signUpUser = {
  firstname: 'Chris',
  lastname: 'Evans',
  email: 'chris@test.com',
  password: 'Chrisevanstest1!',
  confirmPassword: 'Chrisevanstest1!',
  gender: 'Male',
  jobrole: 'ux designer',
  department: 'design',
  address: 'kampala',
};

exports.signUpUserV2 = {
  firstname: 'Chris',
  lastname: 'Evans',
  email: 'banobe@test.com',
  password: 'Chrisevanstest1!',
  confirmPassword: 'Chrisevanstest1!',
  gender: 'Male',
  jobrole: 'ux designer',
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
  jobrole: 'Backend developer',
  department: 'Engineering',
  address: 'Kigali',
};

exports.badFirstname = {
  firstname: '...',
  lastname: 'Doe',
  email: 'john@test.com',
  password: 'Johndoetest1!',
  confirmPassword: 'Johndoetest1!',
  gender: 'Male',
  jobrole: 'ux designer',
  department: 'design',
  address: 'kampala',
};

exports.badLastname = {
  firstname: 'John',
  lastname: '111',
  email: 'john@test.com',
  password: 'johndoetest1!',
  confirmPassword: 'johndoetest1!',
  gender: 'Male',
  jobrole: 'ux designer',
  department: 'design',
  address: 'kampala',
};

exports.badEmail = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'johntest.com',
  password: 'johndoetest1!',
  confirmPassword: 'johndoetest1!',
  gender: 'Male',
  jobrole: 'ux designer',
  department: 'design',
  address: 'kampala',
};

exports.weakPassword = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@test.com',
  password: 'johndoetest',
  confirmPassword: 'johndoetest',
  gender: 'Male',
  jobrole: 'ux designer',
  department: 'design',
  address: 'kampala',
};

exports.passwordConfirm = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@test.com',
  password: 'Johndoetest!1',
  confirmPassword: 'johndoetest',
  gender: 'Male',
  jobrole: 'ux designer',
  department: 'design',
  address: 'kampala',
};

exports.badGender = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@test.com',
  password: 'Johndoetest1!',
  confirmPassword: 'Johndoetest1!',
  gender: 'none',
  jobrole: 'ux designer',
  department: 'design',
  address: 'kampala',
};

exports.wrongJobRole = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@test.com',
  password: 'Johndoetest1!',
  confirmPassword: 'Johndoetest1!',
  gender: 'Male',
  jobrole: '..111',
  department: 'design',
  address: 'kampala',
};
exports.wrongDepartment = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@test.com',
  password: 'Johndoetest1!',
  confirmPassword: 'Johndoetest1!',
  gender: 'Male',
  jobrole: 'ux designer',
  department: '911',
  address: 'kampala',
};

exports.wrongAddress = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@test.com',
  password: 'Johndoetest1!',
  confirmPassword: 'Johndoetest1!',
  gender: 'Male',
  jobrole: 'ux designer',
  department: 'design',
  address: '8991',
};

// sigin mock data
exports.loginuser = {
  email: 'johndoe@test.com',
  password: 'johndoetest',
};

exports.invalidLoginEmail = {
  email: 'johndo@test.com',
  password: 'johndoetest',
};

exports.badpassword = {
  email: 'johndoe@test.com',
  password: 'johndoe',
};

exports.loginUserV2 = {
  email: 'micheal@test.com',
  password: 'Michealtest1!',
};

// mock data for posting article
exports.article = {
  title: 'Backend development',
  article: 'Do you want to be a backend and developer dont missout on the workshop',
};

exports.badTitle = {
  title: '....555',
  article: 'Do you know',
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

exports.payload = {
  email: 'johndoe@test.com',
  password: 'johndoetest',
};

// mock data for admin
exports.admin = {
  email: 'johndoe@test.com',
  password: 'johndoetest',
  isAdmin: true,
};

exports.notAdmin = {
  email: 'johndoe@test.com',
  password: 'johndoetest',
  isAdmin: false,
};

exports.badJson = {
  email: 'johndoe@test.com',
  password: 'johndoetest',
};
