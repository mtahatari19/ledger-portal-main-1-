import { KeyValue } from '@angular/common';

export function moveItemInArray(array: any[], oldIndex: number, newIndex: number): any[] {
  if (oldIndex >= 0 && newIndex >= 0) {
    if (newIndex >= array.length) {
      let k = newIndex - array.length + 1;
      while (k--) {
        array.push(undefined);
      }
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  }
  return array;
}

export function convertObjectToArray<T>(obj: any): KeyValue<string, T>[] {
  return Object.keys(obj).map(key => {
    return {
      key,
      value: obj[key],
    };
  });
}

export function convertArrayToObject(array: any[], keyProp: string, valueProp?: string): any {
  return array.reduce(
    (rest, item) => (item[keyProp] ? { ...rest, [item[keyProp]]: valueProp ? item[valueProp] : item } : rest),
    {}
  );
}

export function convertObjectValuesToArray(obj: object): any[] {
  return Object.values(obj).filter(value => !!value);
}

export function getSubArrayByKeyValue(array: any[], keyProp: string, values: string[]): any[] {
  return array.reduce((rest, item) => (values.includes(item[keyProp]) ? [...rest, item] : rest), []);
}

export function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}
