const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Quando forem chamadas as funções do productsModel', () => {

  describe('Buscando todos produtos cadastrados', () => {
    before(async () => {
      const products = [
        [
          { id: 1, name: 'Martelo de Thor' },
          { id: 2, name: 'Traje de encolhimento' },
          { id: 3, name: 'Escudo do Capitão América' },
        ]
      ];
      sinon.stub(connection, 'execute').resolves(products);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna uma lista de Produtos', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.a('array');
    });

    it('Retorna todos os produtos', async () => {
      const response = await productsModel.getAll();
      expect(response.length).to.be.equals(3);
    });

    it('Produto com "id" e "name"', async () => {
      const response = await productsModel.getAll();
      response.forEach((product) => {
        expect(product).to.have.property('id');
        expect(product).to.have.property('name');
      })
    });
  });

  describe('Buscando "produtos" cadastrado por ID', () => {
    before(async () => {
      const product = [
        { id: 1, name: 'Martelo de Thor' },
      ];
      sinon.stub(connection, 'execute').resolves(product);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um objeto "Produto"', async () => {
      const response = await productsModel.getById(1);
      expect(response).to.be.a('object');
    });

    it('Retorna um "produtos" com ID igual a "1"', async () => {
      const response = await productsModel.getById(1);
      expect(response.id).to.be.equals(1);
    });

    it('Retorna um "produtos" com name igual a "Martelo de Thor"', async () => {
      const response = await productsModel.getById(1);
      expect(response.name).to.be.equals('Martelo de Thor');
    });
  });

  describe('Cadastrando nome produto', () => {
    describe('Produto cadastrado com sucesso', () => {
      before(async () => {
        const product = [{ id: 4, name: 'Armadura do Homem de Ferro' }];
        sinon.stub(connection, 'execute').resolves(product);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Retorna um objeto como resposta', async () => {
        const response = await productsModel.create({ name: 'Armadura do Homem de Ferro' });
        expect(response).to.be.a('object');
      });
      it('Retorna um objeto com "ID"', async () => {
        const response = await productsModel.create({ name: 'Armadura do Homem de Ferro' });
        expect(response).to.have.property('id');
      });
      it('Retorna um objeto com um "name"', async () => {
        const response = await productsModel.create({ name: 'Armadura do Homem de Ferro' });
        expect(response).to.have.property('name');
      });
      it('Retorna um objeto com "name" igual a "Armadura do Homem de Ferro"', async () => {
        const response = await productsModel.create({ name: 'Armadura do Homem de Ferro' });
        expect(response.name).to.be.equals('Armadura do Homem de Ferro');
      });
    });
  });

  describe('Atualizando um produto', () => {
    describe('Produto atualizado com sucesso', () => {
      before(async () => {
        const id = 1;
        const name = 'Martelo do Batman';
        const product = [{ id, name }];
        sinon.stub(connection, 'execute').resolves(product);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Retorna um objeto', async () => {
        const id = 1;
        const newName = 'Martelo do Batman';
        const response = await productsModel.update(id, newName);
        expect(response).to.be.a('object');
      });
      it('Retorna um objeto com a propriedade "ID"', async () => {
        const id = 1;
        const newName = 'Martelo do Batman';
        const response = await productsModel.update(id, newName);
        expect(response).to.have.property('id');
      });
      it('Retorna um objeto com propriedade "name"', async () => {
        const id = 1;
        const newName = 'Martelo do Batman';
        const response = await productsModel.update(id, newName);
        expect(response).to.have.property('name');
      });
    });
  });

  describe('Deletando um produto', () => {
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
      const response = await productsModel.exclude(id);
      expect(response).to.be.a('object');
    });

    it('Retorna um objeto com "affectedRows"', async () => {
      const id = 1;
      const response = await productsModel.exclude(id);
      expect(response).to.have.property('affectedRows');
    });

    it('Retorna um objeto com "affectedRows" com valor 1', async () => {
      const id = 1;
      const { affectedRows } = await productsModel.exclude(id);
      expect(affectedRows).to.equals(1);
    });
  });

  describe('Buscando produtos por nome', () => {
    describe('Produtos encontrados - Busca feita com sucesso', () => {
      before(async () => {
        const result = [
          [
            {
              id: 1,
              name: 'Martelo de Thor',
            }
          ]
        ];
        sinon.stub(connection, 'execute').resolves(result);
      });

      after(async () => {
        connection.execute.restore();
      });

      const products = [
        {
          id: 1,
          name: "Martelo de Thor",
        }
      ];

      it('Retorna uma lista de produtos', async () => {
        const name = 'Martelo';
        const response = await productsModel.getByName(name);
        expect(response).to.be.a('array');
      });

      it('Retorna uma lista de produtos com "ID"', async () => {
        const name = 'Martelo';
        const response = await productsModel.getByName(name);
        response.forEach((item) => expect(item).to.have.property('id'));
      });

      it('Retorna uma lista de produtos com "name"', async () => {
        const name = 'Martelo';
        const response = await productsModel.getByName(name);
        response.forEach((item) => expect(item).to.have.property('name'));
      });

      it('Retorna produtos com "name" que contenham a query de pesquisa no nome', async () => {
        const name = 'Martelo';
        const response = await productsModel.getByName(name);
        response.forEach((item) => expect(item.name).to.include(name));
      });
    });

    describe('Nenhum produto foi encontrado - Busca feita sem sucesso', () => {
      before(async () => {
        const result = [[]];
        sinon.stub(connection, 'execute').resolves(result);
      });

      after(async () => {
        connection.execute.restore();
      });

      const products = [
        {
          id: 1,
          name: "Martelo de Thor",
        }
      ];

      it('Retorna uma lista', async () => {
        const name = 'Martelo';
        const response = await productsModel.getByName(name);
        expect(response).to.be.a('array');
      });

      it('Retorna uma lista vazia', async () => {
        const name = 'Martelo';
        const response = await productsModel.getByName(name);
        expect(response.length).to.equals(0);
      });
    });
  });
});