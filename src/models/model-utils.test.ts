import {enumToObject} from './model-utils.ts';
import {ShowTypeEnum} from './show-enums.ts';

describe('Enum To Object', () => {
  it('should convert an Enum To Object', () => {
    const res = enumToObject(ShowTypeEnum);
    expect(res).toEqual({});
  });
});
