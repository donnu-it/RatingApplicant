var config = {}

config.host = process.env.HOST || "https://ratingapplicantsdb.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "QK1NgeIB5oGyM8iCTdsydciu3wmVBgmDpBggMJOfsimF5yFuRZCHhnI2s1pR3qQkFLKtB2aq3CQsCLekJapHBw==";
config.databaseId = "ratingapplicantsdb";
config.collectionId = "specializations";


module.exports = config;