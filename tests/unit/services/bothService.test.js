const sinon = require('sinon');
const { expect } = require('chai');

const bothModel = require('../../../models/bothModel');
const bothService = require('../../../services/bothService');
const productsModel = require('../../../models/productsModel');
const salesModel = require('../../../models/salesModel');


describe('bothServices - Quando for cadastrada uma nova venda e de salesProducts', () => {
  describe('Cadastro de venda e salesProducts com sucesso', () => {
    const salesProducts = [
      { productId: 1, quantity: 1 },
      { productId: 1, quantity: 2 },
    ];

    before(async () => {
      sinon.stub(productsModel, 'getById').resolves({ id: 1, name: 'Martelo de Thor' })
      sinon.stub(salesModel, 'create').resolves({ insertId: 1 });
      sinon.stub(bothModel, 'create').resolves({});
    });

    after(async () => {
      productsModel.getById.restore();
      salesModel.create.restore();
      bothModel.create.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.be.a('object');
    });

    it('Retorna um objeto com a propriedade "ID"', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.have.property('id');
    });

    it('Retorna um objeto com a propriedade "itemsSold"', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.have.property('itemsSold');
    });

    it('itemsSold é uma lista de objetos', async () => {
      const response = await bothService.create(salesProducts);
      expect(response.itemsSold).to.be.a('array');
    });

    it('Os objetos de itemsSold possuem a propriedade "productId"', async () => {
      const response = await bothService.create(salesProducts);
      const { itemsSold } = await response;
      itemsSold.forEach((item) => expect(item).to.have.property('productId'));
    });

    it('Objetos de itemsSold possuem a propriedade "quantity"', async () => {
      const response = await bothService.create(salesProducts);
      const { itemsSold } = await response;
      itemsSold.forEach((item) => expect(item).to.have.property('quantity'));
    });
  });

  describe('Sem o campo "productId" - Cadastro de salesProducts sem sucesso', () => {
    const salesProducts = [
      { quantity: 1 },
      { productId: 1, quantity: 2 },
    ];

    before(async () => {
      sinon.stub(productsModel, 'getById').resolves({ id: 1, name: 'Martelo de Thor' })
      sinon.stub(salesModel, 'create').resolves({});
      sinon.stub(bothModel, 'create').resolves({});
    });

    after(async () => {
      productsModel.getById.restore();
      salesModel.create.restore();
      bothModel.create.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.be.a('object');
    });

    it('Retorna um objeto com a propriedade "code"', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.have.property('code');
    });

    it('Retorna um objeto com a propriedade "message"', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.have.property('message');
    });

    it('Retorna um objeto com a propriedade code com valor 400', async () => {
      const response = await bothService.create(salesProducts);
      expect(response.code).to.equal(400);
    });

    it('Retorna um objeto com a propriedade message com o valor "productId is required"', async () => {
      const response = await bothService.create(salesProducts);
      expect(response.message).to.equal('"productId" is required');
    });
  });

  describe('Sem o Campo "quantity" - Cadastro de salesProducts sem sucesso', () => {
    const salesProducts = [
      { productId: 1 },
      { productId: 1, quantity: 2 },
    ];

    before(async () => {
      sinon.stub(productsModel, 'getById').resolves({ id: 1, name: 'Martelo de Thor' })
      sinon.stub(salesModel, 'create').resolves({});
      sinon.stub(bothModel, 'create').resolves({});
    });

    after(async () => {
      productsModel.getById.restore();
      salesModel.create.restore();
      bothModel.create.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.be.a('object');
    });

    it('Retorna um objeto com a propriedade "code"', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.have.property('code');
    });

    it('Retorna um objeto com a propriedade "message"', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.have.property('message');
    });

    it('Retorna um objeto com a propriedade code com valor 400', async () => {
      const response = await bothService.create(salesProducts);
      expect(response.code).to.equal(400);
    });

    it('Retorna um objeto com a propriedade message com o valor "quantity is required"', async () => {
      const response = await bothService.create(salesProducts);
      expect(response.message).to.equal('"quantity" is required');
    });
  });

  describe('Campo "quantity" menor ou igual a zero - Cadastro de salesProducts sem sucesso', () => {
    const salesProducts = [
      { productId: 1, quantity: 0 },
      { productId: 1, quantity: 2 },
    ];

    before(async () => {
      sinon.stub(productsModel, 'getById').resolves({ id: 1, name: 'Martelo de Thor' })
      sinon.stub(salesModel, 'create').resolves({});
      sinon.stub(bothModel, 'create').resolves({});
    });

    after(async () => {
      productsModel.getById.restore();
      salesModel.create.restore();
      bothModel.create.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.be.a('object');
    });

    it('Retorna um objeto com a propriedade "code"', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.have.property('code');
    });

    it('Retorna um objeto com a propriedade "message"', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.have.property('message');
    });

    it('Retorna um objeto com a propriedade code com valor 422', async () => {
      const response = await bothService.create(salesProducts);
      expect(response.code).to.equal(422);
    });

    it('Retorna um objeto com a propriedade message com valor "quantity must be greater than or equal to 1"', async () => {
      const response = await bothService.create(salesProducts);
      expect(response.message).to.equal('"quantity" must be greater than or equal to 1');
    });
  });

  describe('Produto Inexistente - Cadastro de salesProducts sem sucesso ', () => {
    const salesProducts = [
      { productId: 5, quantity: 0 },
      { productId: 1, quantity: 2 },
    ];

    before(async () => {
      sinon.stub(productsModel, 'getById').resolves([])
      sinon.stub(salesModel, 'create').resolves({});
      sinon.stub(bothModel, 'create').resolves({});
    });

    after(async () => {
      productsModel.getById.restore();
      salesModel.create.restore();
      bothModel.create.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.be.a('object');
    });

    it('Retorna um objeto com a propriedade "code"', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.have.property('code');
    });

    it('Retorna um objeto com a propriedade "message"', async () => {
      const response = await bothService.create(salesProducts);
      expect(response).to.have.property('message');
    });

    it('Retorna um objeto com a propriedade code com valor 404', async () => {
      const response = await bothService.create(salesProducts);
      expect(response.code).to.equal(404);
    });

    it('Retorna um objeto com a propriedade "message" com o valor "Product not found"', async () => {
      const response = await bothService.create(salesProducts);
      expect(response.message).to.equal('Product not found');
    });
  });
});

describe('bothService - Quando for atualizada uma venda', () => {
  describe('Quando for atualizada uma venda com sucesso', () => {
    const salesProducts = [
      { productId: 1, quantity: 10 },
      { productId: 1, quantity: 50 },
    ];

    before(async () => {
      sinon.stub(productsModel, 'getById').resolves([{ id: 1, name: 'Martelo de Thor' }])
      sinon.stub(salesModel, 'getById')
        .resolves([
          { date: "2021-09-09T04:54:29.000Z", productId: 1, quantity: 2 },
          { date: "2021-09-09T04:54:54.000Z", productId: 2, quantity: 2 },
        ]);
      sinon.stub(bothModel, 'update').resolves();
    });

    after(async () => {
      productsModel.getById.restore();
      salesModel.getById.restore();
      bothModel.update.restore();
    });

    it('Retorna um objeto', async () => {
      const id = 1;
      const response = await bothService.update(id, salesProducts);
      expect(response).to.be.a('object');
    });

    it('Retorna um objeto com a propriedade "saleId"', async () => {
      const id = 1;
      const response = await bothService.update(id, salesProducts);
      expect(response).to.have.property('saleId');
    });

    it('Retorna um objeto com a propriedade "itemsUpdated"', async () => {
      const id = 1;
      const response = await bothService.update(id, salesProducts);
      expect(response).to.have.property('itemsUpdated');
    });

    it('itemsUpdated é uma lista de objetos', async () => {
      const id = 1;
      const response = await bothService.update(id, salesProducts);
      expect(response.itemsUpdated).to.be.a('array');
    });

    it('Objetos do itemsSold têm a propriedade "productId"', async () => {
      const id = 1;
      const response = await bothService.update(id, salesProducts);
      const { itemsUpdated } = await response;
      itemsUpdated.forEach((item) => expect(item).to.have.property('productId'));
    });

    it('Objetos do itemsSold têm a propriedade "quantity"', async () => {
      const id = 1;
      const response = await bothService.update(id, salesProducts);
      const { itemsUpdated } = await response;
      itemsUpdated.forEach((item) => expect(item).to.have.property('quantity'));
    });
  });

  describe('Quando tentar atualizar com uma venda inexistente', () => {
    const salesProducts = [
      { productId: 1, quantity: 10 },
      { productId: 1, quantity: 50 },
    ];

    before(async () => {
      sinon.stub(productsModel, 'getById').resolves([{ id: 1, name: 'Martelo de Thor' }])
      sinon.stub(salesModel, 'getById').resolves([]);
      sinon.stub(bothModel, 'update').resolves();
    });

    after(async () => {
      productsModel.getById.restore();
      salesModel.getById.restore();
      bothModel.update.restore();
    });

    it('Retorna um objeto', async () => {
      const id = 5;
      const productId = 1;
      const quantity = 10;
      const response = await bothService.update(id, productId, quantity);
      expect(response).to.be.a('object');
    });

    it('Retorna um objeto com propriedade "code"', async () => {
      const id = 5;
      const productId = 1;
      const quantity = 10;
      const response = await bothService.update(id, productId, quantity);
      expect(response).to.have.property('code');
    });

    it('Retorna um objeto com propriedade "message"', async () => {
      const id = 5;
      const productId = 1;
      const quantity = 10;
      const response = await bothService.update(id, productId, quantity);
      expect(response).to.have.property('message');
    });

    it('Retorna um objeto com propriedade "code" com valor 404', async () => {
      const id = 5;
      const productId = 1;
      const quantity = 10;
      const response = await bothService.update(id, productId, quantity);
      expect(response.code).to.equals(404);
    });

    it('Retorna um objeto com propriedade "message" com valor "Sale not found"', async () => {
      const id = 5;
      const productId = 1;
      const quantity = 10;
      const response = await bothService.update(id, productId, quantity);
      expect(response.message).to.equals('Sale not found');
    });
  });
});