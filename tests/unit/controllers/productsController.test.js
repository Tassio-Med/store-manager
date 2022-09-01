const sinon = require('sinon');
const { expect } = require('chai');
const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

const products = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const product = { id: 1, name: 'Martelo de Thor' };

describe('Quado forem chamadas as funções do "productsController"', () => {
  describe('Quando for chamada a função "getAll"', () => {
    before(async () => {
      sinon.stub(productsService, 'getAll').resolves(products);
    });

    after(async () => { productsService.getAll.restore(); });

    it('Retorna um json com os objetos dos produtos', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getAll(req, res);

      expect(res.json.calledWith(products)).to.be.true;
    })

    it('Retorna um status 200', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    })
  });

  describe('Quando chamada a função "getById"', () => {
    describe('Quando buscar por um produto existente', () => {
      before(async () => {
        sinon.stub(productsService, 'getById').resolves(product);
      });

      after(async () => { productsService.getById.restore(); });

      it('Retorna um json com os objetos dos produtos', async () => {
        const req = {};
        const res = {};

        req.params = sinon.stub().returns(1);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsController.getById(req, res);

        expect(res.json.calledWith(product)).to.be.true;
      })

      it('Retorna um status com 200', async () => {
        const req = {};
        const res = {};
        req.params = sinon.stub().returns(1);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsController.getById(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      })

    });

    describe('Quando buscar por um produto não existente', () => {
      before(async () => {
        sinon.stub(productsService, 'getById').resolves(false);
      });

      after(async () => { productsService.getById.restore(); });

      it('Retorna um status 404', async () => {
        const req = {};
        const res = {};
        req.params = sinon.stub().returns(4);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsController.getById(req, res);
        expect(res.status.calledWith(404)).to.be.true;
      })

      it('Retorna um json com uma mensgem de erro "Product not found"', async () => {
        const req = {};
        const res = {};

        req.params = sinon.stub().returns(1);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsController.getById(req, res);
        const error = {
          message: "Product not found",
        }
        expect(res.json.calledWith(error)).to.be.true;
      })
    });
  });

  describe('Quando for chamada a função create', () => {
    describe('Produto cadastrado com sucesso', () => {
      const res = {};
      const req = {};

      before(async () => {
        req.body = {
          name: 'Armadura do Homem de Ferro'
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'create')
          .resolves({ id: 4, name: 'Armadura do Homem de Ferro' });
      })

      after(async () => {
        productsService.create.restore();
      });

      it('Retorna status 201', async () => {
        await productsController.create(req, res);
        expect(res.status.calledWith(201)).to.be.true;
      });

      it('Retorna um json com o produto cadastro', async () => {
        await productsController.create(req, res);
        expect(res.json.calledWith({ id: 4, name: 'Armadura do Homem de Ferro' })).to.be.true;
      });
    });

    describe('Nome inválido - Produto cadastrado sem sucesso', () => {
      const res = {};
      const req = {};

      before(async () => {
        req.body = sinon.stub().returns('');
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'create')
          .resolves({ code: 400, message: '"name" is required' });
      })

      after(async () => { productsService.create.restore() });

      it('Retorna um status 400', async () => {
        await productsController.create(req, res);
        expect(res.status.calledWith(400)).to.be.true;
      });

      it('Retorna um json com objeto com a propriedade "message"', async () => {
        await productsController.create(req, res);
        expect(res.json.calledWith({ message: '"name" is required' })).to.be.true;
      });
    });

    describe('Nome não é definido - Produto cadastrado sem sucesso ', () => {
      const res = {};
      const req = {};
      const message = '"name" length must be at least 5 characters long';

      before(async () => {
        req.body = sinon.stub().returns();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'create')
          .resolves({ code: 422, message });
      })

      after(async () => { productsService.create.restore() });

      it('Retorna status 422', async () => {
        await productsController.create(req, res);
        expect(res.status.calledWith(422)).to.be.true;
      });

      it('Retorna um json com objeto com "message"', async () => {
        await productsController.create(req, res);
        expect(res.json.calledWith({ message })).to.be.true;
      });
    });
  });

  describe('Quando for chamada a função update', () => {
    describe('Produto atualizado com sucesso', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.params = sinon.stub().returns(1)
        req.body = sinon.stub().returns('Martelo do Batman');
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'update').resolves({ id: 1, name: 'Martelo do Batman' });
      })

      after(async () => {
        productsService.update.restore();
      });

      it('Retorna um status com o valor de 200', async () => {
        await productsController.update(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Retorna um json com o produto atualizado', async () => {
        await productsController.update(req, res);
        const product = { id: 1, name: 'Martelo do Batman' }
        expect(res.json.calledWith(product)).to.be.true;
      });
    });

    describe('Produto não encontrado - Atualização de produto sem sucesso', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.params = sinon.stub().returns(5)
        req.body = sinon.stub().returns('Martelo do Batman');
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'update').resolves({
          code: 404,
          message: 'Product not found',
        });
      })

      after(async () => {
        productsService.update.restore();
      });

      it('Retorna um json com a propriedade "message" com erro "Product not found"', async () => {
        await productsController.update(req, res);
        const error = { message: 'Product not found' };
        expect(res.json.calledWith(error)).to.be.true;
      });

      it('Retorna status 404', async () => {
        await productsController.update(req, res);
        expect(res.status.calledWith(404)).to.be.true;
      });
    });

    describe('Nome Não definido - Atualização de produto sem sucesso', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.params = sinon.stub().returns(5)
        req.body = sinon.stub().returns();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'update').resolves({
          code: 400,
          message: '"name" is required',
        });
      })

      after(async () => {
        productsService.update.restore();
      });

      it('Retorna status 400', async () => {
        await productsController.update(req, res);
        expect(res.status.calledWith(400)).to.be.true;
      });

      it('Retorna um json com a propriedade "message" com erro "name is required"', async () => {
        await productsController.update(req, res);
        const error = { message: '"name" is required' };
        expect(res.json.calledWith(error)).to.be.true;
      });
    });

    describe('Propriedade "name" se encontra vazia - Atualização de produto sem sucesso', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.params = sinon.stub().returns(5)
        req.body = sinon.stub().returns('');
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'update').resolves({
          code: 400,
          message: '"name" is required',
        });
      })

      after(async () => {
        productsService.update.restore();
      });

      it('Retorna um json com a propriedade "message" com erro "name is required"', async () => {
        await productsController.update(req, res);
        const error = { message: '"name" is required' };
        expect(res.json.calledWith(error)).to.be.true;
      });

      it('Retorna status com valor 400', async () => {
        await productsController.update(req, res);
        expect(res.status.calledWith(400)).to.be.true;
      });

    });

    describe('Propriedade "name" menor que 5 caracteres - Atualização de produto sem sucesso ', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.params = sinon.stub().returns(5)
        req.body = sinon.stub().returns();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'update').resolves({
          code: 422,
          message: '"name" length must be at least 5 characters long',
        });
      })

      after(async () => {
        productsService.update.restore();
      });

      it('Retorna status 422', async () => {
        await productsController.update(req, res);
        expect(res.status.calledWith(422)).to.be.true;
      });

      it('Retorna um json com o propriedade "message" com erro "name length must be at least 5 characters long"', async () => {
        await productsController.update(req, res);
        const error = { message: '"name" length must be at least 5 characters long' };
        expect(res.json.calledWith(error)).to.be.true;
      });
    });
  });

  describe('Ao chamar a função "exclude"', () => {
    describe('Produto excluido com sucesso', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.params = sinon.stub().returns(1)
        res.status = sinon.stub().returns(res);
        res.end = sinon.stub().returns();

        sinon.stub(productsService, 'exclude').resolves(true);
      })

      after(async () => {
        productsService.exclude.restore();
      });

      it('Retorna status 204', async () => {
        await productsController.exclude(req, res);
        expect(res.status.calledWith(204)).to.be.true;
      });
      it('A função "end" é chamada', async () => {
        await productsController.exclude(req, res);
        expect(res.end.called).to.be.true;
      });
    });

    describe('Produto não excluido com sucesso', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.params = sinon.stub().returns(5)
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'exclude').resolves({
          code: 404,
          message: 'Product not found',
        });
      })

      after(async () => {
        productsService.exclude.restore();
      });

      it('Retorna um json com mensagem de erro "Product not found"', async () => {
        await productsController.exclude(req, res);
        expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;
      });

      it('Retorna status 404', async () => {
        await productsController.exclude(req, res);
        expect(res.status.calledWith(404)).to.be.true;
      });
    });
  });

  describe('Quando for chamada a função getByName', () => {
    describe('Busca feita com sucesso', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.query = sinon.stub().returns('Martelo');
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'getByName').resolves([{
          id: 1,
          name: 'Martelo de Thor',
        }]);
      })

      after(async () => {
        productsService.getByName.restore();
      });

      it('Quando retornar um json com lista de produto(s)', async () => {
        await productsController.getByName(req, res);
        const response = [{
          id: 1,
          name: 'Martelo de Thor',
        }]
        expect(res.json.calledWith(response)).to.be.true;
      });

      it('Retorna status 200', async () => {
        await productsController.getByName(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });
    });

    describe('Nenhum produto encontrado - Busca feita sem sucesso - ', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.query = sinon.stub().returns('Espada');
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'getByName').resolves([]);
      })

      after(async () => {
        productsService.getByName.restore();
      });

      it('Retorna status 200', async () => {
        await productsController.getByName(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Retorna um json com lista vazia', async () => {
        await productsController.getByName(req, res);
        const response = [];
        expect(res.json.calledWith(response)).to.be.true;
      });
    });

    describe('Nenhuma busca foi definida - Busca feita sem sucesso', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.query = sinon.stub().returns();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'getByName').resolves(products);
      })

      after(async () => {
        productsService.getByName.restore();
      });

      it('Retorna um json com lista de todos os produtos cadastros', async () => {
        await productsController.getByName(req, res);
        expect(res.json.calledWith(products)).to.be.true;
      });

      it('Retorna status 200', async () => {
        await productsController.getByName(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });
    });
  });
});