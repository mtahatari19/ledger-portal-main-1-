import { convertArrayToObject, convertObjectToArray, getSubArrayByKeyValue, moveItemInArray } from './arrays';

describe('ArrayHelpers', () => {
  it('item should move in #array', () => {
    const array = [0, 1, 2, 3];
    expect(moveItemInArray(array, 0, 1)).toEqual([1, 0, 2, 3]);
  });

  it('negative index should not be accepted while moving #array item', () => {
    const array = [0, 1, 2, 3];
    expect(moveItemInArray(array, 0, -2)).toEqual([0, 1, 2, 3]);
    expect(moveItemInArray(array, -2, 0)).toEqual([0, 1, 2, 3]);
  });

  it('#array length should be extended when new index is greater than #array length', () => {
    const array = [0, 1, 2, 3];
    expect(moveItemInArray(array, 3, 7)).toEqual([0, 1, 2, undefined, undefined, undefined, undefined, 3]);
  });

  it('should convert #enum to #array', () => {
    enum Role {
      ADMIN = 'ADMIN',
      MANAGER = 'MANAGER',
      USER = 'USER',
      SYS_ADMIN = 'SYS_ADMIN',
    }

    const roleArrayBeautified = [
      { key: 'ADMIN', value: 'Admin' },
      { key: 'MANAGER', value: 'Manager' },
      { key: 'USER', value: 'User' },
      { key: 'SYS_ADMIN', value: 'Sys Admin' },
    ];
    const roleArrayNotBeautified = [
      { key: 'ADMIN', value: 'ADMIN' },
      { key: 'MANAGER', value: 'MANAGER' },
      { key: 'USER', value: 'USER' },
      { key: 'SYS_ADMIN', value: 'SYS_ADMIN' },
    ];
    expect(convertObjectToArray(Role)).toEqual(roleArrayNotBeautified);
  });

  it('should convert nested #object to flat #array', () => {
    const obj = {
      loan: { amount: 10 },
      rent: { amount: 20 },
      buy: { amount: 30 },
    };
    expect(convertObjectToArray(obj)).toEqual([
      { key: 'loan', value: { amount: 10 } },
      { key: 'rent', value: { amount: 20 } },
      { key: 'buy', value: { amount: 30 } },
    ]);
  });

  it('should convert #array to #object by key', () => {
    const array = [
      { id: 1, name: 'Tom', age: 30 },
      { id: 2, name: 'John', age: 40 },
      { id: 3, name: 'Anna', age: 50 },
    ];
    const result = {
      1: { id: 1, name: 'Tom', age: 30 },
      2: { id: 2, name: 'John', age: 40 },
      3: { id: 3, name: 'Anna', age: 50 },
    };
    expect(convertArrayToObject(array, 'id')).toEqual(result);
  });

  it('should convert #array to #object by key and value', () => {
    const array = [
      { id: 1, name: 'Tom', age: 30 },
      { id: 2, name: 'John', age: 40 },
      { id: 3, name: 'Anna', age: 50 },
    ];
    const result = {
      Tom: 30,
      John: 40,
      Anna: 50,
    };
    expect(convertArrayToObject(array, 'name', 'age')).toEqual(result);
  });

  it('should return #sub-array by key value from #array', () => {
    const array = [
      { id: 1, name: 'Tom', age: 30 },
      { id: 2, name: 'John', age: 40 },
      { id: 3, name: 'Anna', age: 50 },
    ];
    const values = ['John', 'Anna'];
    const result = [
      { id: 2, name: 'John', age: 40 },
      { id: 3, name: 'Anna', age: 50 },
    ];
    expect(getSubArrayByKeyValue(array, 'name', values).length).toEqual(result.length);
    expect(getSubArrayByKeyValue(array, 'name', values)[0].id).toEqual(result[0].id);
    expect(getSubArrayByKeyValue(array, 'name', values)[1].id).toEqual(result[1].id);
  });
});
