'use strict';
exports.handler = (event, context, callback) => {

    //Get contents of response
    const response = event.Records[0].cf.response;
    const headers = response.headers;

    // added this code snippet to prevent deployment bug introduced in https://github.com/serverless/serverless/issues/8392

    //Set new headers 
    headers['permissions-policy'] = [{ key: 'Permissions-Policy', value: `fullscreen=(self);` }]
    headers['strict-transport-security'] = [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubdomains; preload' }];
    var connectSrc = "connect-src 'self' api-js.mixpanel.com givt-debug-api.azurewebsites.net api.givtapp.net givt-debug-api-us.azurewebsites.net api.givt.app www.google-analytics.com *.wepay.com;";
    var defaultSrc = "default-src 'none';";
    var fontSrc = "font-src 'self' fonts.gstatic.com use.fontawesome.com cdnjs.cloudflare.com *.wepay.com;";
    var imgSrc = "img-src 'self' data: www.google-analytics.com *.wepay.com;";
    var scriptSrc = "script-src 'self' cdnjs.cloudflare.com code.jquery.com stackpath.bootstrapcdn.com *.wepay.com www.gstatic.com www.googletagmanager.com www.google-analytics.com 'unsafe-eval' 'self';";
    var styleSrc = "style-src 'unsafe-inline' 'self' use.fontawesome.com cdnjs.cloudflare.com;";
    var objectSrc = "object-src 'self' *.wepay.com;";
    var frameSrc = "frame-src 'self' *.wepay.com;";
    headers['content-security-policy'] = [{ key: 'Content-Security-Policy', value: `${connectSrc} ${defaultSrc} ${fontSrc} ${imgSrc} ${scriptSrc} ${styleSrc} ${objectSrc} ${frameSrc}` }];
    headers['x-content-type-options'] = [{ key: 'X-Content-Type-Options', value: 'nosniff' }];
    headers['x-frame-options'] = [{ key: 'X-Frame-Options', value: 'DENY' }];
    headers['x-xss-protection'] = [{ key: 'X-XSS-Protection', value: '1; mode=block' }];
    headers['referrer-policy'] = [{ key: 'Referrer-Policy', value: 'same-origin' }];

    //Return modified response
    callback(null, response);
};