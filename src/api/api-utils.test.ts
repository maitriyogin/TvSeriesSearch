import {buildParams, buildUrl} from './api-utils.ts';

describe('Api Utils', () => {
  describe('Build Url', () => {
    it('should build params based on params page status', () => {
      const params = buildParams({
        page: 2,
      });
      expect(params).toEqual('?page=2');
    });
    it('should build params no params', () => {
      const params = buildParams({});
      expect(params).toEqual('');
    });
    it('should build params based on params q', () => {
      const params = buildParams({
        q: 'Star Trek',
      });
      expect(params).toEqual('?q=Star%20Trek');
    });
    it('should build url with params based on params page status and q', () => {
      const params = buildUrl('https://api.tvmaze.com/search/shows', {
        q: 'Star Trek',
      });
      expect(params).toEqual(
        'https://api.tvmaze.com/search/shows?q=Star%20Trek',
      );
    });
  });
});
