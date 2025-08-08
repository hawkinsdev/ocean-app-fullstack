import * as orderRepo from '../../src/repository/order.repository';
import * as productRepo from '../../src/repository/product.repository';
import * as userRepo from '../../src/repository/user.repository';

import { db } from '../../src/config/firebase';

jest.mock('../src/config/firebase', () => {
  const mockCollection = jest.fn();
  const mockDoc = jest.fn();
  const mockAdd = jest.fn();
  const mockGet = jest.fn();
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();

  return {
    db: {
      collection: mockCollection.mockReturnValue({
        doc: mockDoc.mockReturnValue({
          get: mockGet,
          update: mockUpdate,
          delete: mockDelete,
        }),
        add: mockAdd,
        get: mockGet,
        where: jest.fn().mockReturnThis(),
      }),
    },
    __mockAdd: mockAdd,
    __mockGet: mockGet,
    __mockUpdate: mockUpdate,
    __mockDelete: mockDelete,
    __mockCollection: mockCollection,
    __mockDoc: mockDoc,
  };
});

describe('Product Repository', () => {
  it('should get product by id', async () => {
    const mockData = { name: 'product1', price: 100 };

    const getMock = jest.fn().mockResolvedValue({
      data: () => mockData,
    });

    (db.collection as jest.Mock).mockReturnValue({
      doc: jest.fn().mockReturnValue({
        get: getMock,
      }),
    });

    const product = await productRepo.getProductRepository('id1');

    expect(product).toEqual(mockData);
  });

  it('should create product', async () => {
    const addMock = jest.fn().mockResolvedValue(null);
    (db.collection as jest.Mock).mockReturnValue({
      add: addMock,
    });

    const productData = { name: 'new product', price: 50 };

    const product = await productRepo.createProductRepository(
      productData as any
    );

    expect(addMock).toHaveBeenCalled();
    expect(product).toEqual(productData);
  });

  it('should update product', async () => {
    const updateMock = jest.fn().mockResolvedValue(null);

    (db.collection as jest.Mock).mockReturnValue({
      doc: jest.fn().mockReturnValue({
        update: updateMock,
      }),
    });

    const productData = { name: 'updated product', price: 60 };

    const product = await productRepo.updateProductRepository(
      'id1',
      productData as any
    );

    expect(updateMock).toHaveBeenCalled();
    expect(product).toEqual(productData);
  });

  it('should delete product', async () => {
    const deleteMock = jest.fn().mockResolvedValue(null);

    (db.collection as jest.Mock).mockReturnValue({
      doc: jest.fn().mockReturnValue({
        delete: deleteMock,
      }),
    });

    await productRepo.deleteProduct('id1');

    expect(deleteMock).toHaveBeenCalled();
  });
});

describe('User Repository', () => {
  it('should get user by id', async () => {
    const mockUser = { username: 'user1', email: 'user1@test.com' };

    const getMock = jest.fn().mockResolvedValue({
      data: () => mockUser,
    });

    (db.collection as jest.Mock).mockReturnValue({
      doc: jest.fn().mockReturnValue({
        get: getMock,
      }),
    });

    const user = await userRepo.getUserByIdRepository('id1');

    expect(user).toEqual(mockUser);
  });

  it('should get user by email', async () => {
    const mockUser = { username: 'user2', email: 'user2@test.com' };

    const docsMock = [
      {
        data: () => mockUser,
      },
    ];

    (db.collection as jest.Mock).mockReturnValue({
      where: jest.fn().mockReturnValue({
        get: jest.fn().mockResolvedValue({ docs: docsMock }),
      }),
    });

    const user = await userRepo.getUserRepository('user2@test.com');

    expect(user).toEqual(mockUser);
  });

  it('should create user', async () => {
    const addMock = jest.fn().mockResolvedValue(null);
    (db.collection as jest.Mock).mockReturnValue({
      add: addMock,
    });

    const userData = {
      username: 'user3',
      email: 'user3@test.com',
      password: 'pass123',
      role: 'admin',
    };

    // bcrypt hash is async, so mock it to return fixed string
    jest.mock('bcrypt', () => ({
      hash: jest.fn().mockResolvedValue('hashedpass'),
    }));

    const user = await userRepo.createUserRepository(userData as any);

    expect(addMock).toHaveBeenCalled();
  });

  it('should get all users', async () => {
    const docsMock = [
      { data: () => ({ username: 'user1' }) },
      { data: () => ({ username: 'user2' }) },
    ];

    (db.collection as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ docs: docsMock }),
    });

    const users = await userRepo.getUsersRepository();

    expect(users).toHaveLength(2);
  });
});
