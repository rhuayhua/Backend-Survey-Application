// Alert: For production environment never expose your connection string AND secret keys.
require('dotenv').config()

module.exports = {
    "ATLASDB" : process.env.ATLASDB,
    "SECRETKEY" : process.env.SECRETKEY
}
