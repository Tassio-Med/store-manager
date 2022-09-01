const sinon = require('sinon');
const { expect } = require('chai');
const bothService = require('../../../services/bothService');
const bothController = require('../../../controllers/bothController');

describe('Quando chamada a função create "bothController"', () => {
  describe('Produto cadastrado com sucesso', () => {
    const res = {};
    const req = {};

    before(async () => {
      req.body = [ { productId: 1, quantity: 1 }, { productId: 2, quantity: 5 } ];
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(bothService, 'create')
        .resolves({
          id: 3,
          itemsSold: [ { productId: 1, quantity: 1 }, { productId: 2, quantity: 5 } ]
        });
    })

    after(async () => {
      bothService.create.restore();
    });

    it('Retornar uma lista "itemsSold" com os produtos vendidos e json com ID da venda', async () => {
      await bothController.create(req, res);
      const jsonResult = {
        id: 3,
        itemsSold: [ { productId: 1, quantity: 1 }, { productId: 2, quantity: 5 } ]
      };
      expect(res.json.calledWith(jsonResult)).to.be.true;
    });

    it('Retornar status 201', async () => {
      await bothController.create(req, res);
      expect(res.status.calledWith(201)).to.be.true;
    });

  });

  describe('Campo "productId" não encontrado - Produto cadastrado sem sucesso', () => {
    const res = {};
    const req = {};

    before(async () => {
      const body = [ { quantity: 1 }, { productId: 2, quantity: 5 } ];

      req.body = sinon.stub().returns(body);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(bothService, 'create')
        .resolves({
          code: 400,
          message: '"productId" is required',
        });
    })

    after(async () => {
      bothService.create.restore();
    });

    it('Retornar json com "message" "productId is required"', async () => {
      await bothController.create(req, res);
      const jsonResult = { message: '"productId" is required' };
      expect(res.json.calledWith(jsonResult)).to.be.true;
    });

    it('Retornar status 400', async () => {
      await bothController.create(req, res);
      expect(res.status.calledWith(400)).to.be.true;
    });
  });

  describe('Campo "quantity" não encontrado - Produto cadastrado sem sucesso, ', () => {
    const res = {};
    const req = {};

    before(async () => {
      const body = [ { productId: 1 }, { productId: 2, quantity: 5 } ];
      req.body = sinon.stub().returns(body);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(bothService, 'create')
        .resolves({
          code: 400,
          message: '"quantity" is required',
        });
    })

    after(async () => {
      bothService.create.restore();
    });

    it('Retornar um status 400', async () => {
      await bothController.create(req, res);
      expect(res.status.calledWith(400)).to.be.true;
    });

    it('Retornar um json com o ""message"" "quantity is required"', async () => {
      await bothController.create(req, res);
      const jsonResult = { message: '"quantity" is required' };
      expect(res.json.calledWith(jsonResult)).to.be.true;
    });
  });

  describe('Valor de "quantity" menor ou igual a 0(zero) - Produto cadastrado sem sucesso', () => {
    const res = {};
    const req = {};

    before(async () => {
      const body = [ { productId: 1, quantity: 0 }, { productId: 2, quantity: 5 } ];
      req.body = sinon.stub().returns(body);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(bothService, 'create')
        .resolves({
          code: 422,
          message: '"quantity" must be greater than or equal to 1',
        });
    })

    after(async () => {
      bothService.create.restore();
    });

    it('Retornar json com "message" "quantity is required"', async () => {
      await bothController.create(req, res);
      const jsonResult = { message: '"quantity" must be greater than or equal to 1' };
      expect(res.json.calledWith(jsonResult)).to.be.true;
    });

    it('Retornar status 422', async () => {
      await bothController.create(req, res);
      expect(res.status.calledWith(422)).to.be.true;
    });
  });

  describe(' Produto inexistente - Produto cadastrado sem sucesso', () => {
    const res = {};
    const req = {};

    before(async () => {
      const body = [ { productId: 5, quantity: 0 }, { productId: 2, quantity: 5 } ];
      req.body = sinon.stub().returns(body);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(bothService, 'create')
        .resolves({
          code: 404,
          message: '"Product" not found',
        });
    });

    after(async () => {
      bothService.create.restore();
    });

    it('Retornar um status 404', async () => {
      await bothController.create(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });

    it('Retornar json com o "message" "Product not found"', async () => {
      await bothController.create(req, res);
      const jsonResult = { message: '"Product" not found' };
      expect(res.json.calledWith(jsonResult)).to.be.true;
    });
  });
});

describe('bothController - Quando for chamada a função "update"', () => {
  describe('Vendas atualizadas com sucesso', () => {
    const req = {};
    const res = {};

    before(async () => {
      const body = [ { productId: 1, quantity: 10 }, { productId: 2, quantity: 50 } ];
      req.params = sinon.stub().returns(1);
      req.body = sinon.stub().returns(body);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(bothService, 'update')
        .resolves({
          saleId: 1,
          itemsUpdated: [ { productId: 1, quantity: 10 }, { productId: 2, quantity: 50 } ]
        });
    });

    after(async () => {
      bothService.update.restore();
    });

    it('Retorna json com uma lista das vendas atualizadas', async () => {
      await bothController.update(req, res);
      const response = {
        saleId: 1,
        itemsUpdated: [ { productId: 1, quantity: 10 }, { productId: 2, quantity: 50 } ]
      };
      expect(res.json.calledWith(response)).to.be.true;
    });

    it('Retorna status com valor 200', async () => {
      await bothController.update(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });
  });

  describe('Venda inexistente - Vendas atualizadas sem sucesso', () => {
    const req = {};
    const res = {};

    before(async () => {
      const body = [ { productId: 1, quantity: 10 }, { productId: 2, quantity: 50 } ];
      req.params = sinon.stub().returns(1);
      req.body = sinon.stub().returns(body);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(bothService, 'update')
        .resolves({
          code: 404,
          message: 'Sale not found',
        });
    });

    after(async () => {
      bothService.update.restore();
    });

    it('Retorna json com mensagem de erro "Sale not found"', async () => {
      await bothController.update(req, res);
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;
    });

    it('Retorna status com valor 404', async () => {
      await bothController.update(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
  });

  describe('Sem o campo "productId" - Produto cadastrado sem sucesso', () => {
    const res = {};
    const req = {};

    before(async () => {
      const body = [ { quantity: 1 }, { productId: 2, quantity: 5 } ];
      req.params = sinon.stub().returns(1);
      req.body = sinon.stub().returns(body);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(bothService, 'update')
        .resolves({
          code: 400,
          message: '"productId" is required',
        });
    })

    after(async () => {
      bothService.update.restore();
    });

    it('Retornar json com o "message" "productId is required"', async () => {
      await bothController.update(req, res);
      const jsonResult = { message: '"productId" is required' };
      expect(res.json.calledWith(jsonResult)).to.be.true;
    });

    it('Retornar status 400', async () => {
      await bothController.update(req, res);
      expect(res.status.calledWith(400)).to.be.true;
    });
  });

  describe('Sem o campo "quantity" - Produto cadastrado sem sucesso', () => {
    const res = {};
    const req = {};

    before(async () => {
      const body = [ { productId: 1 }, { productId: 2, quantity: 5 } ];
      req.params = sinon.stub().returns(1);
      req.body = sinon.stub().returns(body);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(bothService, 'update')
        .resolves({
          code: 400,
          message: '"quantity" is required',
        });
    })

    after(async () => {
      bothService.update.restore();
    });

    it('Retornar json com o "message" "quantity is required"', async () => {
      await bothController.update(req, res);
      const jsonResult = { message: '"quantity" is required' };
      expect(res.json.calledWith(jsonResult)).to.be.true;
    });

    it('Retornar status 400', async () => {
      await bothController.update(req, res);
      expect(res.status.calledWith(400)).to.be.true;
    });
  });

  describe('Valor de "quantity" menor ou igual a 0(zero) - Produto cadastrado sem sucesso', () => {
    const res = {};
    const req = {};

    before(async () => {
      const body = [ { productId: 1, quantity: 0 }, { productId: 2, quantity: 5 } ];
      req.params = sinon.stub().returns(1);
      req.body = sinon.stub().returns(body);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(bothService, 'update')
        .resolves({
          code: 422,
          message: '"quantity" must be greater than or equal to 1',
        });
    })

    after(async () => {
      bothService.update.restore();
    });

    it('Retornar json com o "message" "quantity is required"', async () => {
      await bothController.update(req, res);
      const jsonResult = { message: '"quantity" must be greater than or equal to 1' };
      expect(res.json.calledWith(jsonResult)).to.be.true;
    });

    it('Retornar status 422', async () => {
      await bothController.update(req, res);
      expect(res.status.calledWith(422)).to.be.true;
    });
  });

  describe('Produto inexistente - Produto cadastrado sem sucesso', () => {
    const res = {};
    const req = {};

    before(async () => {
      const body = [ { productId: 5, quantity: 0 }, { productId: 2, quantity: 5 } ];
      req.params = sinon.stub().returns(1);
      req.body = sinon.stub().returns(body);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(bothService, 'update')
        .resolves({
          code: 404,
          message: '"Product" not found',
        });
    });

    after(async () => {
      bothService.update.restore();
    });

    it('Retornar json com "message" "Product not found"', async () => {
      await bothController.update(req, res);
      const jsonResult = { message: '"Product" not found' };
      expect(res.json.calledWith(jsonResult)).to.be.true;
    });

    it('Retornar status 404', async () => {
      await bothController.update(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
  });
});
