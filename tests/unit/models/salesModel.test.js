const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('salesModel - Quando for cadastrada uma nova venda(Sale)', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Retorna um objeto', async () => {
    const response = await salesModel.create();
    expect(response).to.be.a('object');
  });

  it('Retorna um objeto com a propriedade "insertId"', async () => {
    const response = await salesModel.create();
    expect(response).to.be.a('object');
  });
});

describe('salesModel - Quando forem listadas todas as vendas', () => {
  const sales = [
    [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ]
  ];

  before(async () => {
    sinon.stub(connection, 'execute').resolves(sales);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Retorna uma lista com vendas', async () => {
    const response = await salesModel.getAll();
    expect(response).to.be.a('array');
  });

  it('Retorna uma lista com vendas com propriedade "saleId"', async () => {
    const response = await salesModel.getAll();
    response.forEach((sale) => expect(sale).to.have.property('saleId'));
  });

  it('Retorna um lista com vendas com propriedade "date"', async () => {
    const response = await salesModel.getAll();
    response.forEach((sale) => expect(sale).to.have.property('date'));
  });

  it('Retorna um lista com vendas com propriedade "productId"', async () => {
    const response = await salesModel.getAll();
    response.forEach((sale) => expect(sale).to.have.property('productId'));
  });

  it('Retorna um lista com vendas com propriedade "quantity"', async () => {
    const response = await salesModel.getAll();
    response.forEach((sale) => expect(sale).to.have.property('quantity'));
  });
});

describe('salesModel - Quando for listada uma venda pelo seu "ID"', () => {
  describe('Quando for listada uma venda com sucesso', () => {
    const sales = [
      [
        {
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2
        },
        {
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2
        }
      ]
    ];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(sales);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna uma lista com vendas', async () => {
      const response = await salesModel.getById();
      expect(response).to.be.a('array');
    });

    it('Retorna uma lista com vendas com a propriedade "date"', async () => {
      const response = await salesModel.getById();
      response.forEach((sale) => expect(sale).to.have.property('date'));
    });

    it('Retorna uma lista com vendas com a propriedade "productId"', async () => {
      const response = await salesModel.getById();
      response.forEach((sale) => expect(sale).to.have.property('productId'));
    });

    it('Retorna uma lista com vendas com a propriedade "quantity"', async () => {
      const response = await salesModel.getById();
      response.forEach((sale) => expect(sale).to.have.property('quantity'));
    });
  });
});

describe('Quando uma venda for excluída', () => {
  before(async () => {
    const result = [{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    }]
    sinon.stub(connection, 'execute').resolves(result);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Retorna um objeto', async () => {
    const id = 1;
    const response = await salesModel.exclude(id);
    expect(response).to.be.a('object');
  });

  it('Retorna um objeto com "affectedRows"', async () => {
    const id = 1;
    const response = await salesModel.exclude(id);
    expect(response).to.have.property('affectedRows');
  });

  it('Retorna um objeto com "affectedRows" com valor 1', async () => {
    const id = 1;
    const { affectedRows } = await salesModel.exclude(id);
    expect(affectedRows).to.equals(1);
  });
});
