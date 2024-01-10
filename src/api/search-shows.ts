import {ShowsInput, ShowsOutput} from '../models/shows.ts';

const TV_URL = 'https://api.tvmaze.com/search/';

const _noWrap = ['page', 'q'];
const _wrapWithShow = (v: string) => `Show[${v}]`;

const _param = (key: string, value?: String | number) =>
  value && Number(value) !== 0
    ? `${_noWrap.includes(key) ? key : _wrapWithShow(key)}=${value}`
    : '';
export const buildParams = (params: ShowsInput) =>
  encodeURI(
    Object.keys(params).reduce(
      (acc: string, k: string, index: number) =>
        (index === 0 ? '?' : '') +
        acc +
        `${index > 0 && Number(params[k]) !== 0 ? '&' : ''}${_param(
          k,
          params[k],
        )}`,
      '',
    ),
  );

export const buildUrl = (params: ShowsInput) =>
  `${TV_URL}shows${buildParams(params)}`;
export const searchShows = async (params: ShowsInput): Promise<ShowsOutput> => {
  const url = buildUrl(params);
  console.log('---------------', url);
  const results = await fetch(url);
  const jsonRes = await results.json();
  return {url, shows: jsonRes};
};
