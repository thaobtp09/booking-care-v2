const db = require('../db');

exports.create = async (data, client = db) => {
  const result = await client.query(
    `
    INSERT INTO patients (
      full_name,
      gender,
      date_of_birth,
      phone,
      email,
      address
    )
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *
    `,
    [
      data.full_name,
      data.gender,
      data.date_of_birth,
      data.phone,
      data.email,
      data.address
    ]
  );

  return result.rows[0];
};
