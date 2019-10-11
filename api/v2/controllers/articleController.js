/* eslint-disable consistent-return */
/* eslint-disable radix */
import uuidv4 from 'uuidv4';
import _ from 'lodash';
import client from '../helpers/dbConnection';

class Article {
  /**
   * @method viewFeeds
   * @description displays all articles shared or posted in datastructures
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {JSON}  JSON API Response
   */

  static async viewFeeds(req, res) {
    try {
      const query = 'SELECT * FROM articles ORDER BY id DESC';
      client.query(query, (error, result) => {
        if (result.rows < '1') {
          return res.status(404).send({
            status: 404,
            error: 'no articles found',
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'articles retrieved',
          results: result.rows,
        });
      });
    } catch (error) {
      if (error) return res.status(400).json({ error });
    }
  }

  /**
   * @method viewSpecific
   * @description displays a particular article all in the database
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static async viewSpecific(req, res) {
    try {
      const query = 'SELECT * FROM articles WHERE id = $1';
      const value = [req.params.id];
      const result = await client.query(query, value);
      if (result.rows < '1') {
        return res.status(404).send({
          status: 404,
          error: 'article not found',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'article retrieved',
        results: result.rows,
      });
    } catch (error) {
      if (error) return res.status(400).json({ error });
    }
  }

  /**
   * @method postArticle
   * @description registers an article with valid fields in the database
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */

  static async postArticle(req, res) {
    try {
      const createArticle = `INSERT INTO articles(id, authorId, title, article)
      VALUES($1, $2, $3, $4) RETURNING *`;
      const values = [
        uuidv4(),
        req.user.userId,
        req.body.title,
        req.body.article,
      ];
      const { rows } = await client.query(createArticle, values);
      return res.status(201).json({
        status: 201,
        message: 'article successfully created',
        results: rows[0],
      });
    } catch (error) {
      if (error) return res.status(400).json({ error });
    }
  }

  /**
   * @method editArticle
   * @description updates and edits a particular article in the database
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static async editArticle(req, res) {
    const data = _.pick(req.body, ['title', 'article']);

    try {
      const query = 'UPDATE articles SET title = $1, article = $2 WHERE id = $3 RETURNING *';
      const values = [data.title, data.article, req.params.id];
      const result = await client.query(query, values);
      return res.status(200).json({
        status: 200,
        message: 'article successfully edited',
        results: result.rows,
      });
    } catch (error) {
      if (error) return res.status(400).json({ error });
    }
  }

  /**
   * @method commentArticle
   * @description adds a comment to a particular article
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */

  static async commentArticle(req, res) {
    try {
      const createComment = `INSERT INTO comment(id, articleId, authorId, comment)
      VALUES($1, $2, $3, $4) RETURNING *`;
      const values = [uuidv4(), req.params.id, req.user.userId, req.body.comment];
      const result = await client.query(createComment, values);
      return res.status(201).json({
        status: 201,
        message: 'comment sent',
        data: {
          results: result.rows,
        },
      });
    } catch (error) {
      if (error) return res.status(400).json({ error: error.message });
    }
  }

  /**
   * @method deleteArticle
   * @description deletes a particular article all in the database
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */

  static deleteArticle(req, res) {
    try {
      const query = 'DELETE FROM articles WHERE id = $1';
      const values = [req.params.id];
      client.query(query, values, (error, result) => {
        if (error) return res.status(404).json({ error });
        if (result.rows < '1') {
          return res.status(200).json({
            status: 204,
            message: 'successfully deleted',
          });
        }
      });
    } catch (error) {
      if (error) return res.status(404).json({ error });
    }
  }

  /**
   * @method flagArticle
   * @description updates the status of a particular article
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */

  static async flagArticle(req, res) {
    const { flag } = req.body;

    try {
      const query = 'UPDATE articles SET status = $1 WHERE id = $2 RETURNING *';
      const values = [flag, req.params.id];
      client.query(query, values, (error, result) => {
        if (error) {
          return res.status(404).send({
            status: 404,
            error: 'article not found',
          });
        }
        return res.status(201).json({
          status: 201,
          message: 'article has been flagged as inapropiate',
          data: {
            results: result.rows,
          },
        });
      });
    } catch (error) {
      if (error) {
        if (error) return res.status(400).json({ error });
      }
    }
  }

  /**
   * @method specificTag
   * @description displays all article with the requested tag
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */

  static async specificTag(req, res) {
    try {
      const query = `SELECT * from articles WHERE title LIKE '${req.params.title}%'`;
      const result = await client.query(query);
      return res.status(200).json({
        status: 200,
        message: 'article retrieved',
        results: result.rows,
      });
    } catch (error) {
      if (error) return res.status(400).json({ error });
    }
  }
}

export default Article;
