const {mongoose, databaseUrl, options} = require('../database');

const connectAndDrop = async () => {
	await mongoose.connect(databaseUrl, options);
	await mongoose.connection.db.dropDatabase();
};

const disconnect = async () => {
	await mongoose.disconnect();
};

module.exports = {
	connectAndDrop,
	disconnect,
};
