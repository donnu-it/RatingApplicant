var config = {}

config.host = process.env.HOST || "https://zno-dev.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "YQJlVPIIW2c9QEnLWgxquFKUW9WpShWDYTi52LL9E0HNCR84qRt3OMYXxlPel76duxZjhcpgYoY5pO3PsIQ5dQ==";
config.databaseId = "ZnoDB";
config.collectionId = "ZnoColl";


module.exports = config;