'use strict';
// Local path to project root.
let path = require('path');
let staticPath = path.join(__dirname, '/');

// Express: minimalistic Node framework.
let express = require('express');
let app = express();

// Serve static files via Express' middleware.
app.use(express.static(staticPath, {
    // index: false, // Disable directory indexing.
    redirect: true, // Redirect directories to a "trailing /" path.
}));

// Set up routes via Express' router. Optional handling for params, middleware.
const router = express.Router();

router.get('/api/properties', function (req, res) {
    // @TODO: consider requiring API version header.

    // The only thing we really need Node for is to hide this access token from the
    // front-end user.
    let domain = 'https://api.bridgedataoutput.com';
    let path = '/api/v2/OData/test/Property?access_token=6baca547742c6f96a6ff71b138424f21';

    let request = require('request');
    request(domain + path, function (error, response, body) {
        // Expected response; pass the JSON straight to the frontend.
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
        // Bad response; identify with an empty JSON object.
        else {
            res.send('{}');
        }
    })
});

// Apply the routes to the app.
app.use('/', router);

// Run the actual server.
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('Server running.');
});