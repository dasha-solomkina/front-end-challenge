const BASE_URL = 'https://frontend-challenge.birdie.workers.dev';

export function get(path: string): Promise<Response> {
  return fetch(BASE_URL + '/' + path, {
    mode: 'cors',
  });
}
