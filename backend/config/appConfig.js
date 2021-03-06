let appConfig = {};

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri: 'mongodb://127.0.0.1:27017/chatDB'
};
appConfig.apiVersion = '/api/v1';
appConfig.mongooseOptions = {
    useCreateIndex: true,
    useNewUrlParser : true,
    useUnifiedTopology: true
}

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion,
    mongooseOptions: appConfig.mongooseOptions
}