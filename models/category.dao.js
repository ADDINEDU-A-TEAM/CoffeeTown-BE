const myDataSource = require('../models/index');

// 카테고리 + 상품

const list = (async () => {
  return await myDataSource.query(
    `SELECT mc.menuCategory_id AS category_id, mc.menuCategory_name AS category_name,
    JSON_ARRAYAGG(
    JSON_OBJECT('category_id', mc.menuCategory_id, 'product_id', p.product_id, 'product_name', p.product_name, 'product_price', p.product_price, 'product_ea', p.product_ea, 'product_image', p.product_image)
    ) AS product
    FROM menuCategory mc
    JOIN product p ON mc.menuCategory_id = p.menuCategory_id
    GROUP BY mc.menuCategory_id, mc.menuCategory_name;`);
});

//검색기능
const search = async (item) => {
  return await myDataSource.query(
    `SELECT mc.menuCategory_id AS category_id, mc.menuCategory_name AS category_name,
    JSON_ARRAYAGG(
    JSON_OBJECT('category_id', mc.menuCategory_id, 'product_id', p.product_id, 'product_name', p.product_name, 'product_price', p.product_price, 'product_ea', p.product_ea, 'product_image', p.product_image)
    ) AS product
    FROM menuCategory mc
    JOIN product p ON mc.menuCategory_id = p.menuCategory_id
     WHERE MATCH product_name  AGAINST('${item}*' IN BOOLEAN MODE)
    GROUP BY mc.menuCategory_id, mc.menuCategory_name
   ; `
  );
};

module.exports = {
  list,
  search,
};
