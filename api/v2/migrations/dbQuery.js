const users = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        gender VARCHAR(100) NOT NULL,
        jobRole VARCHAR(100) NOT NULL,
        department VARCHAR(100) NOT NULL,
        address VARCHAR(100) NOT NULL,
        isAdmin BOOLEAN DEFAULT false
    );`;

const authentication = `
    CREATE TABLE IF NOT EXISTS authentication (
        authId INT REFERENCES users(id),
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );`;

const articles = `
    CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        authorId INT REFERENCES users(id),
        title TEXT NOT NULL,
        article TEXT NOT NULL,
        comments JSONB[],
        status BOOLEAN DEFAULT false,
        createdOn timestamp (0) without time zone default now(),
        updatedOn timestamp (0) without time zone default now()
);`;

const comment = `
    CREATE TABLE IF NOT EXISTS comment (
        id SERIAL PRIMARY KEY,
        authorId INT  REFERENCES users (id),
        comment TEXT NOT NULL,
        status BOOLEAN DEFAULT false,
        createdOn timestamp (0) without time zone default now()
    )`;

const dropTables = `
        DROP TABLE IF EXISTS users cascade;
        DROP TABLE IF EXISTS authentication cascade;
        DROP TABLE IF EXISTS articles cascade;
        DROP TABLE IF EXISTS comment cascade;
`;

export default `${users}${authentication}${articles}${comment}`;
export { dropTables };
