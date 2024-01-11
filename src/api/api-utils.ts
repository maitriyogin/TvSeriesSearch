import {ShowsInput} from '../models/shows.ts';

const _param = (key: string, value?: String | number) =>
  value && Number(value) !== 0 ? `${key}=${value}` : '';
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
export const buildUrl = (url: string, params: ShowsInput) =>
  `${url}${buildParams(params)}`;
