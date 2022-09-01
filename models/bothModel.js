const connection = require('./connection');

const create = async (idSale, idProduct, amount) => {
  const [response] = await connection
    .execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [idSale, idProduct, amount],
  );
  return response;
};

const exclude = async (id) => {
  const [response] = await connection
  .execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id],
);
  return response;
};

const update = async (id, idProduct, amount) => {
  const [response] = await connection
  .execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [amount, id, idProduct],
  );
  return response;
};

module.exports = { create, exclude, update };