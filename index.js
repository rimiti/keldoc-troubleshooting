const SDK = require('@rimiti/keldoc-js-sdk');

SDK.configure({
    credentials: {
        clientAccessKeyId: process.env.KELDOC_CLIENT_ACCESS_KEY_ID,
        secretAccessKeyId: process.env.KELDOC_SECRET_ACCESS_KEY_ID,
    },
    host: process.env.KELDOC_HOST,
});

const sdk = SDK.create();

async function troubleshooting() {
    await sdk.config.get();             // OK
    await sdk.agendas.get();            // OK
    await sdk.configWebhooks.remove();  // OK
    await sdk.configWebhooks.get();     // OK
    await sdk.configWebhooks.create({url: "https://keldoc-webhook.herokuapp.com/callback"}); // FAIL
    /**
     * [POST] - http://staging-2-api.keldoc.com/partners/config/webhooks , headers used:  {"Authorization":"Bearer f16784c9e8b72b836ff012e1eac61b854e3b55372c809bb368:REDeNVglomUsYNJFvUdqN2MIr6veysTwhSX6Fhut4=","Accept":"application/vnd.keldoc-v1+json","Content-Type":"application/json","Date":"2019-02-20T11:39:02+01:00"}
     * [RESPONSE] - HTTP code: 403 , data: {"response_type":"error","response":{"message":"invalid token","status":"invalid_token"}}
     */
}

troubleshooting()
    .then(() => console.info('OK'))
    .catch((e) => console.error(e));












