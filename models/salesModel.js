const connection = require('./connection');

const generate = (sales) => ({
  saleId: sales.id,
  date: sales.date,
  productId: sales.product_id,
  quantity: sales.quantity,
});

const generateById = (sales) => ({
  date: sales.date,
  productId: sales.product_id,
  quantity: sales.quantity,
});

const getById = async (id) => {
  const [response] = await connection.execute(
    `
    SELECT sale.id, sale.date, sale_product.product_id, sale_product.quantity
    FROM StoreManager.sales AS sale
    INNER JOIN StoreManager.sales_products AS sale_product
    ON sale.id = sale_product.sale_id
    WHERE sale.id = ?
    ORDER BY sale.id ASC, sale_product.product_id
  `,
    [id],
  );
  return response.map(generateById);
};

const getAll = async () => {
  const [response] = await connection.execute(
    `
    SELECT sale.id, sale.date, sale_product.product_id, sale_product.quantity
    FROM StoreManager.sales
    AS sale
    INNER JOIN StoreManager.sales_products
    AS sale_product
    ON sale.id = sale_product.sale_id
    ORDER BY sale.id ASC, sale_product.product_id
  `,
  );
  return response.map(generate);
};

const create = async () => {
  const [response] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (NOW())');
  return response;
};

const exclude = async (id) => {
  const [response] = await connection
    .execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  return response;
};

module.exports = { getById, getAll, create, exclude };