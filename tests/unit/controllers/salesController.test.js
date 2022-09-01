const sinon = require('sinon');
const { expect } = require('chai');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');

describe('salesController - Quando forem listadas todas as vendas', () => {
  const req = {};
  const res = {};

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
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getAll').resolves(sales);
  })

  after(async () => {
    salesService.getAll.restore();
  });

  it('Retorna json com lista de todas as vendas', async () => {
    await salesController.getAll(req, res);
    expect(res.json.calledWith(sales)).to.be.true;
  });

  it('Retorna status 200', async () => {
    await salesController.getAll(req, res);
    expect(res.status.calledWith(200)).to.be.true;
  });
});

describe('"salesController" - Quando for listada uma venda pelo seu "ID"', () => {
  describe('Ao listar uma venda com SUCESSO', () => {
    const req = {};
    const res = {};

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
      req.params = sinon.stub().returns(1);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves(sales);
    })

    after(async () => {
      salesService.getById.restore();
    });

    it('Retorna um json com lista de vendas relacionada a venda pesquisada', async () => {
      await salesController.getById(req, res);
      expect(res.json.calledWith(sales)).to.be.true;
    });

    it('Retorna status 200', async () => {
      await salesController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });
  });
  describe('Quando tentar listar uma venda inexistente', () => {
    const req = {};
    const res = {};

    const error = { message: 'Sale not found' };

    before(async () => {
      req.params = sinon.stub().returns(5);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves({
        code: 404,
        message: error,
      });
    })

    after(async () => {
      salesService.getById.restore();
    });

    it('Retorna json com uma lista de vendas relacionada a venda pesquisada', async () => {
      await salesController.getById(req, res);
      expect(res.json.calledWith({ message: error })).to.be.true;
    });

    it('Retorna status 404', async () => {
      await salesController.getById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
  });
});

describe('"salesController" - Quando uma venda for deletada com sucesso', () => {
  describe('Quando uma venda for deletada com sucesso', () => {
    const req = {};
    const res = {};

    before(async () => {
      req.params = sinon.stub().returns(1);
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      sinon.stub(salesService, 'exclude').resolves(true);
    })

    after(async () => {
      salesService.exclude.restore();
    });

    it('A função end é chamada', async () => {
      await salesController.exclude(req, res);
      expect(res.end.called).to.be.true;
    });

    it('Retorna status 204', async () => {
      await salesController.exclude(req, res);
      expect(res.status.calledWith(204)).to.be.true;
    });
  });

  describe('Quando tantar deletar uma venda inexistente', () => {
    const req = {};
    const res = {};

    const error = { message: 'Sale not found' };

    before(async () => {
      req.params = sinon.stub().returns(5);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'exclude').resolves({
        code: 404,
        message: error,
      });
    })

    after(async () => {
      salesService.exclude.restore();
    });

    it('Retorna json com messagem de erro "Sale not found"', async () => {
      await salesController.exclude(req, res);
      expect(res.json.calledWith({ message: error })).to.be.true;
    });

    it('Retorna status 404', async () => {
      await salesController.exclude(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
  });
});