const config = require("../../config");
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

module.exports =  {
	connection: function() {
		return mongoose.connect(config.database.url, {		
			// For Mogodb Altast //
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

	}
}