var config = {}

config.host = process.env.HOST || "CONFIGHOSTPARAM";
config.authKey = process.env.AUTH_KEY || "CONFIGAUTHKEYPARAM";
config.databaseId = "ratingapplicantsdb";
config.collectionId = "specializations";


module.exports = config;