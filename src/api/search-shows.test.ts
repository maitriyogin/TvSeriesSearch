import {pageShows, searchShows} from './search-shows.ts';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{score: 1000, show: {id: 1}}]),
  }),
) as jest.Mock;
describe('API', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });
  describe('search shows', () => {
    it('should search shows', async () => {
      const {url, shows} = await searchShows({q: 'Flynn'});
      expect(url).toEqual('https://api.tvmaze.com/search/shows?q=Flynn');
      expect(shows).toEqual([{id: 1}]);
    });
    it('should handle errors', async () => {
      (fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.reject('API is down'),
      );
      const {url, shows, error} = await searchShows({q: 'Flynn'});
      expect(url).toEqual('https://api.tvmaze.com/search/shows?q=Flynn');
      expect(shows).toEqual([]);
      expect(error).toEqual('API is down');
    });
  });
  describe('page shows', () => {
    it('should page shows', async () => {
      (fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve([{id: 1}]),
        }),
      );
      const {url, shows} = await pageShows({page: 2});
      expect(url).toEqual('https://api.tvmaze.com/shows?page=2');
      expect(shows).toEqual([{id: 1}]);
    });
    it('should handle page errors', async () => {
      (fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.reject('API is down'),
      );
      const {url, shows, error} = await pageShows({page: 2});
      expect(url).toEqual('https://api.tvmaze.com/shows?page=2');
      expect(shows).toEqual([]);
      expect(error).toEqual('API is down');
    });
  });
});
