/**
 * 默认环境配置文件
 */
import is from 'is_js';

const config = {
// AccessKey: '2bc069b61bace1c0877d6dc056fe10c4',
// AccessToken: '57187db44ff5b5cc079ec49f09567d1d',
// AccountId: '5d662465ce6d2a71967c1bb1',
// ApiV1: 'https://boss-api-dev.aoaosong.com:9040/1.0/',
// ApiV2: 'https://boss-api-dev.aoaosong.com:9040/2.0/',
// SecretKey: '9951084b2e4ac6f218199549e2605fcb',
};
// const config = {
  // AccessKey: '10027c2cd4085845825006241d239e89',
  // AccessToken: 'f51582165f2b8f4fb9254f02d029c02e',
  // AccountId: '5d6e2f1ece6d2a3f188f110c',
  // ApiV1: 'http://192.168.10.178:8083/1.0/',
  // ApiV2: 'http://192.168.10.178:8083/2.0/',
  // SecretKey: 'e3e5ae5e0a366bdb57a7558aa5093799',
// };

const localStorageString = window.localStorage.getItem('appConfig');
let localStorageConfig = {};
if (localStorageString && localStorageConfig !== undefined) {
  localStorageConfig = JSON.parse(localStorageString);
}

let result = {};

if (window.appConfig && window.appConfig !== undefined) {
  result = window.appConfig;
} else if (is.existy(localStorageConfig) && is.not.empty(localStorageConfig)) {
  result = localStorageConfig;
} else {
  result = config;
}
const appConfig = result;

export default appConfig;
