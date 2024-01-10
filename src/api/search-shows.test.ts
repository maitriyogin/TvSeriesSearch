import {
  ShowGenreEnum,
  ShowStatusEnum,
  ShowTypeEnum,
  SortEnum,
} from '../models/show-enums.ts';
import {buildParams, buildUrl} from './search-shows.ts';

describe('Search Shows', () => {
  describe('Build Url', () => {
    it('should build params based on params page status', () => {
      const params = buildParams({
        page: 2,
        showStatus_enum: ShowStatusEnum.In_Development,
      });
      expect(params).toEqual('?page=2&Show%5BshowStatus_enum%5D=4');
    });
    it('should build params no params', () => {
      const params = buildParams({});
      expect(params).toEqual('');
    });
    it('should build params with all params', () => {
      const params = buildParams({
        page: 2,
        sort: SortEnum.A_to_Z,
        showStatus_enum: ShowStatusEnum.In_Development,
        showType_enum: ShowTypeEnum.Award_Show,
        genre: ShowGenreEnum.Action,
      });
      expect(params).toEqual(
        '?page=2&Show%5Bsort%5D=3&Show%5BshowStatus_enum%5D=4&Show%5BshowType_enum%5D=10&Show%5Bgenre%5D=3',
      );
    });
    it('should build params based on params page status and q', () => {
      const params = buildParams({
        q: 'Star Trek',
        page: 2,
        showStatus_enum: ShowStatusEnum.In_Development,
      });
      expect(params).toEqual(
        '?q=Star%20Trek&page=2&Show%5BshowStatus_enum%5D=4',
      );
    });
    it('should build 1 param', () => {
      const params = buildParams({
        q: 'Star Trek',
      });
      expect(params).toEqual('?q=Star%20Trek');
    });
    it('should build url with params based on params page status and q', () => {
      const params = buildUrl({
        q: 'Star Trek',
        page: 2,
        showStatus_enum: ShowStatusEnum.In_Development,
      });
      expect(params).toEqual(
        'https://api.tvmaze.com/search/shows?q=Star%20Trek&page=2&Show%5BshowStatus_enum%5D=4',
      );
    });
  });
});
