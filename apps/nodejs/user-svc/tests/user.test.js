const { getUser, createUser, resetUsers } = require('../src/user');

describe('User Service', () => {
  beforeEach(() => {
    resetUsers();
  });

  test('should create a new user', () => {
    const userData = { name: 'Alice', email: 'alice@example.com' };
    const user = createUser(userData);
    expect(user).toEqual({ id: '1', ...userData });
  });

  test('should return the correct user by id', () => {
    const userData = { name: 'Alice', email: 'alice@example.com' };
    createUser(userData);
    const user = getUser('1');
    expect(user).toEqual(userData);
  });

  test('should return undefined for non-existent user', () => {
    const user = getUser('999');
    expect(user).toBeUndefined();
  });
});
