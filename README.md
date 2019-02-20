# keldoc-troubleshooting

## Rappel du dysfonctionnement

Suite à la modification de votre système d'authentification, il semblerait qu'il y ait un dysfonctionnement assez "étrange" qui surviennent 
quand on tente de faire un `[POST] partners/config/webhooks`. 


L'aspect "étrange" de ce dysfonctionnement est que tous les autres endpoints testés répondent bien, mais pas ce dernier.

Afin de fournir un exemple type, tu trouveras un simple fichier `index.js` qui execute consécutivement les taches suivantes:

- sdk.config.get();             // OK
- sdk.agendas.get();            // OK
- sdk.configWebhooks.remove();  // OK
- sdk.configWebhooks.get();     // OK
- sdk.configWebhooks.create({url: "https://keldoc-webhook.herokuapp.com/callback"}); // FAIL

A titre d'information, j'ai même implementé une methode afin de générer un token par call, mais rien n'y fait... Ce endpoint, ne veut rien savoir alors que pour les autres fonctionnent bien.

Aussi, depuis Postman cela semble fonctionner... c'est d'autant plus étrange puisque l'ensemble des data (header / body) sont les mêmes..

Te serait-il donc possible de checker dans tes logs afin de m'apporter plus d'informations quant-à ce soucis ?

*A savoir qu'avant la refonte de votre système d'authentification, cela fonctionnait bien.*

### Request

```
[REQUEST] - http://staging-2-api.keldoc.com/partners/config/webhooks , headers used:  {"Authorization":"Bearer f16784c9e8b72b836ff012e1eac61b854e3b55372c809bb368:REDeNVglomUsYNJFvUdqN2MIr6veysTwhSX6Fhut4=","Accept":"application/vnd.keldoc-v1+json","Content-Type":"application/json","Date":"2019-02-20T11:39:02+01:00"}
```

### Response

```
[RESPONSE] - HTTP code: 403 , data: {"response_type":"error","response":{"message":"invalid token","status":"invalid_token"}}
```


### Pour reproduire le bug

```sh
yarn start
ou 
npm run start
```

*J'ai pris soin de commit le folder `node_modules` car j'ai rajouté des logs dans `/Users/dimitri/repositories/rimiti/keldoc-troubleshooting/node_modules/@rimiti/keldoc-js-sdk/dist/classes/common.js L109 + L110` pour que ce soit un peu plus verbose pour toi.*
