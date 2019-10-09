const users = `
    CREATE TABLE IF NOT EXISTS users(
        id UUID PRIMARY KEY,
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

const articles = `
    CREATE TABLE IF NOT EXISTS articles (
        id UUID PRIMARY KEY,
        authorId UUID NOT NULL,
        title TEXT NOT NULL,
        article TEXT NOT NULL,
        status BOOLEAN DEFAULT false,
        createdOn timestamp (0) without time zone default now(),
        updatedOn timestamp (0) without time zone default now(),
        FOREIGN KEY (authorId) REFERENCES users (id)
);`;

const comment = `
    CREATE TABLE IF NOT EXISTS comment (
        id UUID PRIMARY KEY,
        articleId UUID NOT NULL,
        authorId UUID NOT NULL,
        comment TEXT NOT NULL,
        status BOOLEAN DEFAULT false,
        createdOn timestamp (0) without time zone default now(),
        FOREIGN KEY (articleId) REFERENCES articles (id),
        FOREIGN KEY (authorId) REFERENCES users (id)
    )`;

const dropTables = `
        DROP TABLE IF EXISTS users cascade;
        DROP TABLE IF EXISTS authentication cascade;
        DROP TABLE IF EXISTS articles cascade;
        DROP TABLE IF EXISTS comment cascade;
`;

export default `${users}${articles}${comment}`;
export { dropTables };
