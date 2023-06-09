const exampleConfig = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  headers: {},
  body: {}
};

export default async function fetcher(
  url,
  config = exampleConfig,
  interceptors = {
    async before(exampleConfig) { return exampleConfig; },
    async auth(exampleConfig) { return exampleConfig; }
  }
) {
  config.headers = config.headers || {};
  const isJson = (!config.headers?.['Content-Type'] && typeof config?.body === 'object');
  if (isJson) {
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(config.body);
  }
  console.log(interceptors)
  if (interceptors?.before) config = await interceptors.before(config);
  let response = await fetch(url, config);
  if (response.status === 401 && interceptors?.auth) {
    config = await interceptors.auth(config);
    response = await fetch(url, config);
  }
  return response
}
