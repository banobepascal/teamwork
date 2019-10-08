/* eslint-disable radix */
/* eslint-disable consistent-return */
//  eslint-disable consistent-return
//  eslint-disable padded-blocks
//  eslint-disable radix
import _ from 'lodash';
import client from '../helpers/dbConnection';

class Article {
  // view feeds and all articles posted with date
  static async viewFeeds(req, res) {
    try {
      const query = 'SELECT * FROM articles ORDER BY id DESC';
      await client.query(query, (error, result) => {
        if (result.rows < '1') {
          res.status(404).send({
            status: 404,
            error: 'no articles found',
          });
        } else {
          res.status(200).json({
            status: 200,
            message: 'articles retrieved',
            results: result.rows,
          });
        }
      });
    } catch (error) {
      if (error) return res.status(400).json({ error });
    }
  }

  // view specific article
  static async viewSpecific(req, res) {
    const id = parseInt(req.params.id);
    try {
      const query = 'SELECT * FROM articles WHERE id = $1';
      const value = [id];
      await client.query(query, value, (error, result) => {
        if (result.rows < '1') {
          res.status(404).send({
            status: 404,
            error: 'article not found',
          });
        } else {
          res.status(200).json({
            status: 200,
            message: 'article retrieved',
            results: result.rows,
          });
        }
      });
    } catch (error) {
      if (error) return res.status(400).json({ error });
    }
  }

  // view article of a particular category
  static async Ta(req, res) {
    const id = parseInt(req.params.id);
    try {
      const query = 'SELECT * FROM articles WHERE id = $1';
      const value = [id];
      await client.query(query, value, (error, result) => {
        if (result.rows < '1') {
          res.status(404).send({
            status: 404,
            error: 'article not found',
          });
        } else {
          res.status(200).json({
            status: 200,
            message: 'article retrieved',
            results: result.rows,
          });
        }
      });
    } catch (error) {
      if (error) return res.status(400).json({ error });
    }
  }

  // Post article to teamwork
  static async postArticle(req, res) {
    const data = _.pick(req.body, [
      'title', 'article',
    ]);

    try {
      const query = `INSERT INTO articles(title, article)
      VALUES ($1, $2) RETURNING *`;
      const values = [data.title, data.article];
      await client.query(query, values, (error, result) => {
        res.status(201).json({
          status: 201,
          message: 'article successfully created',
          data: {
            results: result.rows[0],
          },
        });
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'an internal error occurred at the server',
      });
    }
  }

  // edit posted article
  static async editArticle(req, res) {
    const id = parseInt(req.params.id);
    const data = _.pick(req.body, [
      'title', 'article',
    ]);

    try {
      const query = 'UPDATE articles SET title = $1, article = $2 WHERE id = $3 RETURNING *';
      const values = [data.title, data.article, id];
      await client.query(query, values, (error, result) => {
        if (result.rows < '1') {
          res.status(404).json({
            status: 404,
            error: 'article not found',
          });
        } else {
          res.status(200).json({
            status: 200,
            message: 'article successfully edited',
            results: result.rows,
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'an internal error occurred at the server',
      });
    }
  }

  // delete posted article
  static async deleteArticle(req, res) {
    const id = parseInt(req.params.id);

    try {
      const query = 'DELETE FROM articles WHERE id = $1';
      const values = [id];
      await client.query(query, values, (error, result) => {
        if (result.rows < '1') {
          res.status(404).send({
            status: 404,
            error: 'article not found',
          });
        } else {
          res.status(200).json({
            status: 204,
            message: 'successfully deleted',
          });
        }
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: 'an internal error occurred at the server',
        });
      }
    }
  }

  // flag article as inaproppiate
  static async flagArticle(req, res) {
    const id = parseInt(req.params.id);
    const { flag } = req.body;

    try {
      const query = 'UPDATE articles SET status = $1 WHERE id = $2 RETURNING *';
      const values = [flag, id];
      await client.query(query, values, (error, result) => {
        if (result.rows < '1') {
          res.status(404).send({
            status: 404,
            error: 'article not found',
          });
        } else {
          return res.status(201).json({
            status: 201,
            message: 'article has been flagged as inapropiate',
            data: {
              results: result.rows,
            },
          });
        }
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: 'an internal error occurred at the server',
        });
      }
    }
  }

  // comment article
  static async commentArticle(req, res) {
    const id = parseInt(req.params.id);
    const { comment } = req.body;

    try {
      const query = `INSERT INTO articles(comments) WHERE id = $2
       VALUES ($1, $2) RETURNING *`;
      const values = [comment, id];
      await client.query(query, values, (error, result) => {
        if (result.rows < '1') {
          res.status(404).send({
            status: 404,
            error: 'article not found',
          });
        } else {
          return res.status(201).json({
            status: 201,
            message: 'comment sent',
            data: {
              results: result.rows,
            },
          });
        }
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: 'an internal error occurred at the server',
        });
      }
    }
  }
}

export default Article;
