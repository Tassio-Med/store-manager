const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModel');
const bothModel = require('../../../models/bothModel');
const salesService = require('../../../services/salesService');

describe('salesService - Quando todas as vendas forem listadas', () => {
  const sales = [
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
  ];

  before(async () => {
    sinon.stub(salesModel, 'getAll').resolves(sales);
  });

  after(async () => {
    salesModel.getAll.restore();
  });

  it('Retorna uma lista com as vendas', async () => {
    const response = await salesService.getAll();
    expect(response).to.be.a('array');
  });

  it('Retorna um lista com vendas com a propriedade "saleId"', async () => {
    const response = await salesService.getAll();
    response.forEach((sale) => expect(sale).to.have.property('saleId'));
  });

  it('Retorna um lista de vendas com a propriedade "date"', async () => {
    const response = await salesService.getAll();
    response.forEach((sale) => expect(sale).to.have.property('date'));
  });

  it('Retorna um lista de vendas com a propriedade "productId"', async () => {
    const response = await salesService.getAll();
    response.forEach((sale) => expect(sale).to.have.property('productId'));
  });

  it('Retorna um lista de vendas com a propriedade "quantity"', async () => {
    const response = await salesService.getAll();
    response.forEach((sale) => expect(sale).to.have.property('quantity'));
  });
});

describe('Quando uma venda for listada pelo "ID"', async () => {
  describe('Quando uma venda for listada com Sucesso', () => {
    const sales = [
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
    ];

    before(async () => {
      sinon.stub(salesModel, 'getById').resolves(sales);
    });

    after(async () => {
      salesModel.getById.restore();
    });

    it('Retorna uma lista com vendas', async () => {
      const response = await salesService.getById();
      expect(response).to.be.a('array');
    });

    it('Retorna uma lista de vendas com a propriedade "date"', async () => {
      const response = await salesService.getById();
      response.forEach((sale) => expect(sale).to.have.property('date'));
    });

    it('Retorna uma lista de vendas com a propriedade "productId"', async () => {
      const response = await salesService.getById();
      response.forEach((sale) => expect(sale).to.have.property('productId'));
    });

    it('Retorna uma lista de vendas com a propriedade "quantity"', async () => {
      const response = await salesService.getById();
      response.forEach((sale) => expect(sale).to.have.property('quantity'));
    });
  });
  describe('Quando for listado um produto inexistente', () => {
    before(async () => {
      sinon.stub(salesModel, 'getById').resolves([]);
    });

    after(async () => {
      salesModel.getById.restore();
    });

    it('Retorna um objeto', async () => {
      const id = 5;
      const response = await salesService.getById(id);
      expect(response).to.be.a('object');
    });
    it('Retorna objeto com a propriedade "code"', async () => {
      const id = 5;
      const response = await salesService.getById(id);
      expect(response).to.have.property('code');
    });
    it('Retornar objeto com a propriedade "code" com o valor 404', async () => {
      const id = 5;
      const response = await salesService.getById(id);
      expect(response.code).to.equal(404);
    });
    it('Retornar objeto com a propriedade "message"', async () => {
      const id = 5;
      const response = await salesService.getById(id);
      expect(response).to.have.property('message');
    });
    it('Retornar objeto com a propriedade "message" com o valor "Sale not found"', async () => {
      const id = 5;
      const response = await salesService.getById(id);
      expect(response.message).to.equal('Sale not found');
    });
  });
});

describe('salesService - Quando uma venda for  excluída', () => {
  describe('Quando uma venda for excluída com SUCESSO', () => {
    before(async () => {
      sinon.stub(salesModel, 'exclude').resolves({});
      sinon.stub(bothModel, 'exclude').resolves({});
    });

    after(async () => {
      salesModel.exclude.restore();
      bothModel.exclude.restore();
    });

    it('Retonar um Booleano', async () => {
      const id = 2;
      const response = await salesService.exclude(id);
      expect(response).to.be.a('boolean');
    });
    it('Retona um Booleano com valor "TRUE"', async () => {
      const id = 2;
      const response = await salesService.exclude(id);
      expect(response).to.be.true;
    });
  });

  describe('Quando tentar excluir uma venda inexistente', () => {
    before(async () => {
      sinon.stub(salesModel, 'exclude').resolves({});
      sinon.stub(bothModel, 'exclude').resolves({});
    });

    after(async () => {
      salesModel.exclude.restore();
      bothModel.exclude.restore();
    });

    it('Retona um objeto', async () => {
      const id = 5;
      const response = await salesService.exclude(id);
      expect(response).to.be.a('object');
    });
    it('Retona objeto com a propriedade "code"', async () => {
      const id = 5;
      const response = await salesService.exclude(id);
      expect(response).to.have.property('code');
    });
    it('Retona objeto com a propriedade "message"', async () => {
      const id = 5;
      const response = await salesService.exclude(id);
      expect(response).to.have.property('message');
    });
    it('Retona objeto com a propriedade "code" com  valor 404', async () => {
      const id = 5;
      const response = await salesService.exclude(id);
      expect(response.code).to.equals(404);
    });
    it('Retona objeto com a propriedade "message" com o valor "Sale not found"', async () => {
      const id = 5;
      const response = await salesService.exclude(id);
      expect(response.message).to.equals('Sale not found');
    });
  });
});