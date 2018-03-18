require('es6-promise').polyfill();
require('isomorphic-fetch');
const config = require('./config.js');

const API_KEY = config.API_KEY;
const API_URL = 'https://poly.googleapis.com/v1/';

// Main function for fetch to handle requests.
function fetchAssets(url) {
  console.log(url);
  return fetch(url)
    .then(function(response) {
      console.log(response);
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(assets) {
      console.log(assets);
    });
}

// assets

// assets: list
// GET https://poly.googleapis.com/v1/assets
// @docs: https://developers.google.com/poly/reference/api/rest/v1/assets/list
// @description: Retrieves a listing of assets.
// @params: JSON object of the following key/value pairs
//  - keywords: string
//  - curated: boolean
//  - category: string (one of animals, architecture, art, food, nature, objects, people, scenes, technology, transport)
//  - maxComplexity: enum (one of COMPLEX, MEDIUM, SIMPLE)
//  - format: string (one of BLOCKS, FBX, GLTF, GLTF2, OBJ, TILT)
//  - pageSize: number (btwn 1 and 100)
//  - orderBy: string (one of BEST, NEWEST, OLDEST)
//  - pageToken: string (get from prev req)
// @todo: pass params object
function getAssetList() {
  let url = API_URL + 'assets/' + '?key=' + API_KEY;
  return fetchAssets(url);
}
getAssetList();

// assets: get
// GET https://poly.googleapis.com/v1/{name=assets/*}
// Retrieves one asset given the assetID.
// @param assetID: hash ID of the asset in poly.
//   ex: 24I9X8aeWTR
function getAsset(assetID) {
  let url = API_URL + 'assets/' + assetID + '?key=' + API_KEY;
  return fetchAssets(url);
}
// getAsset('24I9X8aeWTR');

// users
// Currently, only the special value 'me', representing the
// currently-authenticated user is supported. To use 'me', you must pass an
// OAuth token with the request.

// users.assets
// GET https://poly.googleapis.com/v1/{name=users/*}/assets
// Retrieves a list of assets for a given user id.
// @param userID: hash ID of the user in poly.
function getUserAssets(userID) {
  userID = 'me'; // currently only 'me' is supported
  let url = API_URL + 'users/' + userID + '/assets?key=' + API_KEY;
  return fetchAssets(url);
}
// getUserAssets('3dVB0GT8oMI');

// users.likedassets
// GET https://poly.googleapis.com/v1/{name=users/*}/likedassets
// Retrieves a list fo assets liked by the given user id.
// @param userID: hash ID of the user in poly.
function getUserLikedAssets(userID) {
  //userID = 'me'; // currently only 'me' is supported
  let url = API_URL + 'users/' + userID + '/likedassets?key=' + API_KEY;
  return fetchAssets(url);
}
// getUserLikedAssets('3dVB0GT8oMI');
