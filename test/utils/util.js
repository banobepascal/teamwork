exports.signUpUser = {
  firstname: 'Chris',
  lastname: 'Evans',
  email: 'chris@test.com',
  password: 'chrisevanstest',
  gender: 'Male',
  jobRole: 'ux designer',
  department: 'design',
  address: 'm',
};

exports.baduser = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@test.com',
  password: 'johndoe',
  gender: 'Male',
  jobRole: 'ux designer',
  department: 'design',
  address: 'm',
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

exports.badlogin = {
  email: '',
  password: '',
};
