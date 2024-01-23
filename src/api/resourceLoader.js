import axios from 'axios';
import { buildMemoryStorage, setupCache } from 'axios-cache-interceptor';

/** @type {import('axios-cache-interceptor').AxiosCacheInstance} */
const ResourceLoaderRequest = axios.create();

setupCache(ResourceLoaderRequest, {
  storage: buildMemoryStorage()
});
