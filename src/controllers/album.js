const db = require('../db/index');

exports.createAlbum = async (req, res) => {
  console.log('I am adding albums to the database')
  console.log(req.artistId)
  const artistId = req.artistId;
  const { name, year } = req.body;

  try {
    const {rows: [album]} = await db.query(
      `INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *`,
      [name, year, artistId]
    );
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getAllAlbums = async (_, res) => {
  try {
    const { rows: album } = await db.query('SELECT * FROM albums');
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getAlbumById = async (req, res) => {
  try {
    const { albumId } = req.params;
    const {
      rows: [album],
    } = await db.query(`SELECT * FROM albums WHERE id = $1`, [albumId]);

    if (!album) {
      res.status(404).json({ message: `album ${albumId} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updateAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const { name, year } = req.body;
    const {
      rows: [album],
    } = await db.query(
      `UPDATE Albums SET name = $1, year = $2 WHERE id = $3 RETURNING *`,
      [name, year, albumId]
    );

    if (!album) {
      res.status(404).json({ message: `album ${albumId} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteAlbumById = async (req, res) => {
  try {
    const { albumId } = req.params;
    const { rows: [ album ]} = await db.query(`DELETE FROM Albums WHERE id = $1 RETURNING *`, [
      albumId
    ]);
  
    if (!album) {
      res.status(404).json({ message: `album ${albumId} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
}
