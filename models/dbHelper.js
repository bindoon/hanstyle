
var dbHelper = {
    query : function(model, conditon) {
        return new Promise(function(resolve, reject) {
            model.find(conditon,function(error, data) {
                if (error)
                    reject(error);
                resolve(data);
            })
        })
    },
    insert : function(model, doc) {
        return new Promise(function(resolve, reject) {
            model.create(doc,function(error,data) {
                if (error)
                    reject(error);
                resolve(data);
            })
        })
    },
    update: function(model, conditions, update, options) {
        return new Promise(function(resolve, reject) {
            model.update(conditions,update,options,function(error) {
                if (error)
                    reject(error);
                resolve();
            })
        })
    },
    findOneAndUpdate: function(model, conditions, update, options) {
        return new Promise(function(resolve, reject) {
            model.findOneAndUpdate(conditions,update,options,function(error) {
                if (error)
                    reject(error);
                resolve();
            })
        })      
    },
    remove : function(model, conditions) {
        return new Promise(function(resolve, reject) {
            model.remove(conditions,function(error) {
                if (error)
                    reject(error);
                resolve();
            })
        })
    }
}

module.exports = dbHelper;