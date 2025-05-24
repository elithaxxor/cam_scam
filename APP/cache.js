const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 300, checkperiod: 320 });

function getCache(key) {
  return cache.get(key);
}

function setCache(key, value) {
  cache.set(key, value);
}

function delCache(key) {
  cache.del(key);
}

module.exports = {
  getCache,
  setCache,
  delCache,
};
