const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');


describe('Quando forem chamadas as funções do productsService', () => {

  describe('Buscando todos os produtos cadastrados', () => {
    before(async () => {
      const products = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];
      sinon.stub(productsModel, 'getAll').resolves(products);
    });

    after(async () => {
      productsModel.getAll.restore();
    });

    it('Retorna uma lista de produtos', async () => {
      const response = await productsService.getAll();
      expect(response).to.be.a('array');
    });

    it('Retorna todos os produtos', async () => {
      const response = await productsService.getAll();
      expect(response.length).to.be.equals(3);
    });

    it('produto tem "id" e "name"', async () => {
      const response = await productsService.getAll();
      response.forEach((product) => {
        expect(product).to.have.property('id');
        expect(product).to.have.property('name');
      })
    });
  });

  describe('Buscando um produtos cadastrado por ID', () => {
    describe('Buscando por um produto existente no banco de dados', () => {
      before(async () => {
        const product = [{ id: 1, name: 'Martelo de Thor' }];
        sinon.stub(productsModel, 'getById').resolves(product);
      });

      after(async () => {
        productsModel.getById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await productsService.getById(1);
        expect(response).to.be.a('object');
      });
      it('Retorna um objeto com "ID" e "NAME"', async () => {
        const response = await productsService.getById(1);
        expect(response).to.have.property('id');
        expect(response).to.have.property('name');
      });
      it('Retorna um objeto com "ID" igual a 1', async () => {
        const response = await productsService.getById(1);
        expect(response.id).to.be.equals(1);
      });
    });

    describe('Buscando por um produto não existente no banco de dados', () => {
      before(async () => {
        const product = [];
        sinon.stub(productsModel, 'getById').resolves(product);
      });

      after(async () => {
        productsModel.getById.restore();
      });

      it('Retorna um booleano', async () => {
        const response = await productsService.getById(4);
        expect(response).to.be.a('boolean');
      });

      it('Retorna um false', async () => {
        const response = await productsService.getById(4);
        expect(response).to.be.false;
      });
    });
  });

  describe('Cadastrando um novo Produto', () => {
    describe('Passando um nome válido', () => {
      before(async () => {
        const product = [
          { id: 1, name: 'Martelo de Thor' },
        ];
        sinon.stub(productsModel, 'create').resolves(product);
      });

      after(async () => {
        productsModel.create.restore();
      });

      it('Retorna um Objeto', async () => {
        const response = await productsService.create({ name: 'Armadura do Homem de Ferro' });
        expect(response).to.be.a('object');
      });
      it('Retorna um Objeto com ID', async () => {
        const response = await productsService.create({ name: 'Armadura do Homem de Ferro' });
        expect(response).to.have.property('id');
      });
      it('Retorna um Objeto com NAME', async () => {
        const response = await productsService.create({ name: 'Armadura do Homem de Ferro' });
        expect(response).to.have.property('name');
      });
    });

    describe('Passando um nome inválido', () => {
      before(async () => {
        const product = [];
        sinon.stub(productsModel, 'create').resolves(product);
      });

      after(async () => {
        productsModel.create.restore();
      });
      it('Retorna um objeto se o nome for uma string vazia', async () => {
        const response = await productsService.create('');
        expect(response).to.be.a('object');
      });
      it('Retorna um objeto que tem um code se o nome for uma string vazia', async () => {
        const response = await productsService.create('');
        expect(response).to.have.property('code');
      });
      it('Retorna um objeto que tem um MESSAGE se o nome for uma string vazia', async () => {
        const response = await productsService.create('');
        expect(response).to.have.property('message');
      });

      it('Retorna um objeto se o nome não for definido', async () => {
        const response = await productsService.create();
        expect(response).to.be.a('object');
      });
      it('Retorna um objeto que tem um code se o nome não for definido', async () => {
        const response = await productsService.create();
        expect(response).to.have.property('code');
      });
      it('Retorna um objeto que tem um MESSAGE se o nome não for definido', async () => {
        const response = await productsService.create();
        expect(response).to.have.property('message');
      });
    });
  });

  describe('Atualizando produtos', () => {
    describe('Atualizando produtos com SUCESSO', () => {
      before(async () => {
        const product = [{ id: 1, name: 'Martelo do Batman' }];
        sinon.stub(productsModel, 'update').resolves(product);
      });

      after(async () => {
        productsModel.update.restore();
      });
      it('Retorna um objeto', async () => {
        const id = 1;
        const newName = 'Martelo do Batman';
        const response = await productsService.update(id, newName);
        expect(response).to.be.a('object');
      });
      it('Retorna um objeto com a propriedade "ID"', async () => {
        const id = 1;
        const newName = 'Martelo do Batman';
        const response = await productsService.update(id, newName);
        expect(response).to.have.property('id');
      });
      it('Retorna um objeto com a propriedade "name"', async () => {
        const id = 1;
        const newName = 'Martelo do Batman';
        const response = await productsService.update(id, newName);
        expect(response).to.have.property('name');
      });
    });

    describe('Produtos atualizados sem SUCESSO', () => {
      before(async () => {
        const product = [];
        sinon.stub(productsModel, 'update').resolves(product);
      });

      after(async () => {
        productsModel.update.restore();
      });
      it('Retorna um produto', async () => {
        const id = 5;
        const newName = 'Martelo do Batman';
        const response = await productsService.update(id, newName);
        expect(response).to.be.a('object');
      });
      it('Retorna um produto com a propriedade "code"', async () => {
        const id = 5;
        const newName = 'Martelo do Batman';
        const response = await productsService.update(id, newName);
        expect(response).to.have.property('code');
      });
      it('Retorna um produto com a propriedade "MESSAGE"', async () => {
        const id = 5;
        const newName = 'Martelo do Batman';
        const response = await productsService.update(id, newName);
        expect(response).to.have.property('message');
      });
      it('Retorna code com valor "400" quando "name" não for definindo', async () => {
        const id = 1;
        const response = await productsService.update(id);
        expect(response.code).to.equals('400');
      });
      it('Retorna code com valor "400" quando o "name" não se for vazio', async () => {
        const id = 1;
        const newName = '';
        const response = await productsService.update(id, newName);
        expect(response.code).to.equals('400');
      });
      it('Retorna code com valor "422" quando o "name" for menor que 5 caracteres', async () => {
        const id = 1;
        const newName = 'aaa';
        const response = await productsService.update(id, newName);
        expect(response.code).to.equals('422');
      });
    });
  })

  describe('Deletando um produto', () => {
    describe('Produto deletado com sucesso', () => {
      before(async () => {
        const product = [];
        sinon.stub(productsModel, 'exclude').resolves(product);
      });

      after(async () => {
        productsModel.exclude.restore();
      });

      it('Retorna um Booleano', async () => {
        const id = 1;
        const response = await productsService.exclude(id);
        expect(response).to.be.a('boolean');
      });
      it('Retorna um Booleano com valor TRUE', async () => {
        const id = 1;
        const response = await productsService.exclude(id);
        expect(response).to.be.true;
      });
    });
    describe('Produto não deletado com sucesso', () => {
      before(async () => {
        const product = [];
        sinon.stub(productsModel, 'exclude').resolves(product);
      });

      after(async () => {
        productsModel.exclude.restore();
      });

      it('Retorna um objeto', async () => {
        const id = 5;
        const response = await productsService.exclude(id);
        expect(response).to.be.a('object');
      });
      it('Retorna um objeto com a propriedade "code"', async () => {
        const id = 5;
        const response = await productsService.exclude(id);
        expect(response).to.have.property('code');
      });
      it('Retorna um objeto com a propriedade "MESSAGE"', async () => {
        const id = 5;
        const response = await productsService.exclude(id);
        expect(response).to.have.property('message');
      });
      it('Retorna um code com valor 404 caso o produto não exista', async () => {
        const id = 5;
        const response = await productsService.exclude(id);
        expect(response.code).to.equals(404);
      });
      it('Retorna uma mensagem com o valor "Product not found"', async () => {
        const id = 5;
        const response = await productsService.exclude(id);
        const message = 'Product not found';
        expect(response.message).to.equals(message);
      });
    });
  });

  describe('Buscando produtos por nome', () => {
    describe('Busca feita com sucesso', () => {
      before(async () => {
        const product = [];
        sinon.stub(productsModel, 'getByName').resolves([
          {
            id: 1,
            name: 'Martelo de Thor',
          }
        ]);
      });

      after(async () => {
        productsModel.getByName.restore();
      });

      it('Retornar uma lista de produtos', async () => {
        const name = 'Martelo';
        const response = await productsService.getByName(name);
        expect(response).to.be.a('array');
      });

      it('Retornar uma lista de produtos com "ID"', async () => {
        const name = 'Martelo';
        const response = await productsService.getByName(name);
        response.forEach((item) => expect(item).to.have.property('id'));
      });

      it('Retornar uma lista de produtos com "name"', async () => {
        const name = 'Martelo';
        const response = await productsService.getByName(name);
        response.forEach((item) => expect(item).to.have.property('name'));
      });

      it('Retorna produtos com name que contenham a query de pesquisa no nome', async () => {
        const name = 'Martelo';
        const response = await productsService.getByName(name);
        response.forEach((item) => expect(item.name).to.include(name));
      });
    });

    describe('Nenhum produto foi encontrado - Busca feita sem sucesso', () => {
      before(async () => {
        const product = [];
        sinon.stub(productsModel, 'getByName').resolves([]);
      });

      after(async () => {
        productsModel.getByName.restore();
      });

      it('Retorna uma lista', async () => {
        const name = 'Martelo';
        const response = await productsService.getByName(name);
        expect(response).to.be.a('array');
      });

      it('Retorna uma lista vázia', async () => {
        const name = 'Martelo';
        const response = await productsService.getByName(name);
        expect(response.length).to.equals(0);
      });
    });

    describe('Busca vazia - Busca feita sem sucesso', () => {
      before(async () => {
        const allProducts = [
          { id: 1, name: 'Martelo de Thor' },
          { id: 2, name: 'Traje de encolhimento' },
          { id: 3, name: 'Escudo do Capitão América' },
        ];
        sinon.stub(productsModel, 'getByName').resolves(allProducts);
      });

      after(async () => {
        productsModel.getByName.restore();
      });


      it('Retorna uma lista', async () => {
        const name = 'Martelo';
        const response = await productsService.getByName(name);
        expect(response).to.be.a('array');
      });

      it('Retorna uma lista de produtos com "ID"', async () => {
        const name = 'Martelo';
        const response = await productsService.getByName(name);
        response.forEach((item) => expect(item).to.have.property('id'));
      });

      it('Retorna uma lista de produtos com "name"', async () => {
        const name = 'Martelo';
        const response = await productsService.getByName(name);
        response.forEach((item) => expect(item).to.have.property('name'));
      });

      it('Retorna uma lista com todos os produtos Cadastro', async () => {
        const name = 'Martelo';
        const response = await productsService.getByName(name);
        expect(response.length).to.equals(3);
      });
    });
  });
});