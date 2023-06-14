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

export function createFetcher(instanceConfig = {
  baseUrl: '',
  headers: {},
  interceptors: {
    async before(exampleConfig) { return exampleConfig; },
    async auth(exampleConfig) { return exampleConfig; }
  }
}) {
  const instance = async (
    url,
    config = exampleConfig,
    interceptors = {
      async before(exampleConfig) { return exampleConfig; },
      async auth(exampleConfig) { return exampleConfig; }
    }
  ) => {
    url = `${(instanceConfig.baseUrl || '')}${url}`;
    config.headers = {
      ...instanceConfig.headers,
      ...config.headers
    };
    const isJson = (!config.headers?.['Content-Type'] && typeof config?.body === 'object');
    if (isJson) {
      config.headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(config.body);
    }
    if (interceptors?.before) config = await interceptors.before(config);
    if (instanceConfig.interceptors?.before) config = await instanceConfig.interceptors.before(config);
    let response = await fetch(url, config);
    if (response.status === 401) {
      if (interceptors?.auth) config = await interceptors.auth(config);
      if (instanceConfig.interceptors?.auth) config = await instanceConfig.interceptors.auth(config);
      if (interceptors?.auth || instanceConfig.interceptors?.auth) response = await fetch(url, config);
    }
    return response
  };
  
  return instance;
}

// Main instance
export const fetcher = createFetcher();
