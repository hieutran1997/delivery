// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  hostApi: 'http://localhost:8080',
  keyLocalStorage: 'token_delivery',
  client_Id: 'app_erp',
  client_Secret: 'app_erp',
  endPointSocket: 'http://localhost:8084/ws'
};

export const topicReceive = {
  endPointMaps: "/topic/maps/public/item",
  endPointAllMaps: "/topic/maps/public/all"
}
