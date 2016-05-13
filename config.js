var config = {}

config.host = process.env.HOST || "***";
config.authKey = process.env.AUTH_KEY || "***";
config.databaseId = "ratingapplicantsdb";
config.collectionId = "specializations";


module.exports = config;