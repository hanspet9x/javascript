const client = require('mongodb').MongoClient;

let dbConnect = null;

class HPMongo {

    port = 27017;
    url = `mongodb://localhost:${this.port}`;

    dbConnect = null;

    constructor(dbName){
        this.dbName = dbName;
        client.connect(this.url, { useUnifiedTopology: true }, (error, db) => {
            if(error){
                console.error(error.errmsg);
                throw error;
            }else{
                this.dbConnect = db.db(dbName);
            }
            
        });
    }

    createTable = (tableName) => {
        client.connect(this.url, {useUnifiedTopology: true}, (er, db) => {
            if(!er){
                db.db(this.dbName).createCollection(tableName, (error, collection) => {
                    console.log("table created.");
                    this.getCollections(db.db(this.dbName));
                });
            }
        });

        
    }

    getCollections = (db) => {
        db.collections((collections)=> {
            console.log("collections");
            console.log(collections);
        });
    }

    add = (tableName, data) =>{
        this.dbConnect.collections((error, collections)=>{
            console.log(collections);
        });
    }

    

}

module.exports = (databaseName) => {
    // client.on("error", () => console.log("An error as occured."));

    return new HPMongo(databaseName);
}




