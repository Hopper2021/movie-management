const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const query = `SELECT * FROM "genres" ORDER BY "name" ASC;`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all genres', err);
      res.sendStatus(500)
    })
});

router.get('/details/:id', (req, res) => {
  const sqlText = `
  SELECT ARRAY_AGG("genres"."name") AS "genres" FROM "genres" 
  JOIN "movies_genres" ON "genres"."id" = "movies_genres"."genre_id"
  WHERE "movie_id" = $1`;
  pool.query(sqlText, [req.params.id])
    .then(result => {
      res.send(result.rows[0].genres)
      console.log('Results from api/genres/details/id: ', result.rows);
    }) .catch(error => {
      res.sendStatus(500);
      console.log('Error in fetching Movie Details from Server: ', error);
    })
})

module.exports = router;