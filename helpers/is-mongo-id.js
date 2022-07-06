const mongoose = require('mongoose')
     
exports.validateMongoID = (mongoid) => {
    return mongoose.Types.ObjectId.isValid(mongoid);
}
