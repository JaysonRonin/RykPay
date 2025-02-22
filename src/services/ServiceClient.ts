import { CLIENT_METHOD, CLIENT_SERVICES } from '@/constants';
import axios, {
  AxiosDefaults,
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';
import { Platform } from 'react-native';
import type { ClientResponse } from './typings/types';

type ClientInstance = AxiosInstance;
type ClientConfig = AxiosDefaults;
type WorkerConfig = {
  method: CLIENT_METHOD;
  service: string;
  url: string;
  headers?: RawAxiosRequestHeaders;
  body?: object;
  timeout?: number;
};

type ClientHeader = Partial<RawAxiosRequestHeaders>;

class ServiceClient {
  private static instance?: ServiceClient;
  private defaultConfig: ClientConfig;
  private url?: string;

  public static getInstance(): ServiceClient {
    if (!ServiceClient.instance) {
      ServiceClient.instance = new ServiceClient(CLIENT_SERVICES.BASE);
    }

    return ServiceClient.instance;
  }

  public static updateBaseUrl(newBaseUrl: string) {
    ServiceClient.instance = new ServiceClient(newBaseUrl);
  }

  constructor(baseUrl: string) {
    this.url = baseUrl;
    this.defaultConfig = {
      baseURL: this.url,
      timeout: 20 * 1000,
      headers: {
        common: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        get: {},
        put: {},
        delete: {},
        head: {},
        post: {},
        patch: {},
      },
    };
  }

  private getFetchWorker(): ClientInstance {
    const instance = axios.create(this.defaultConfig);

    instance.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(
      (response: AxiosResponse<ClientResponse<unknown>>) => response,
      (error: AxiosError) => Promise.reject(error),
    );

    return instance;
  }

  private getUserAgentHeader(): string {
    const httpClient = 'Axios';
    const platform = `${Platform.OS}}`;
    const security = 'U';

    return `${httpClient} (${platform} ; ${security} ; )`;
  }

  private async fetch<T>({
    method,
    service,
    url,
    headers,
    body = {},
    accessToken,
  }: WorkerConfig & { accessToken: string | null }): Promise<T> {
    const worker = this.getFetchWorker();
    const newBody: AxiosRequestConfig =
      method === CLIENT_METHOD.GET ? { params: body } : { data: body };

    let newHeaders: ClientHeader = { 'User-Agent': this.getUserAgentHeader() };
    if (accessToken) {
      newHeaders.Authorization = `Bearer ${accessToken}`;
    }
    if (headers) {
      newHeaders = { ...newHeaders, ...headers };
    }

    const fullPath = `${service}/${url}`.replace(/([^:]\/)\/+/g, '$1');
    const res = await worker.request<T>({
      url: fullPath,
      method,
      headers: newHeaders,
      ...newBody,
    });
    return res.data;
  }

  public async authFetch<T>(config: WorkerConfig): Promise<T> {
    const accessToken = `iacsf7dh129alk38je92nbdj`;
    return this.fetch<T>({ ...config, accessToken });
  }
}

export default ServiceClient;
