const fs = require('fs');
class Database{
    constructor(path, type){
        this._path=path;
        this._type=type;
        if(!fs.existsSync(this._path)){
            this._database=[];
            this.writeToFile();
        }else{
            let rawData=fs.readFileSync(this._path);
            this._database=JSON.parse(rawData);
            //Rebuild from JSON object back to Data object
            let temp =[];
            while(this._database.length>0){
                temp.push(this._database.pop());
            }
            while(temp.length>0){
                 let k = new this._type();
                 Object.assign(k,temp.pop())
                 this._database.push(k)
            }
            
        }
    }

    //Add item to the database
    add(item){
        item.id = this._database.length; 
        this._database.push(item);
        this.writeToFile();
    }

    //Remove the item from the database
    remove(item){
        let i = this._database.indexOf(item);
        if(i>-1){
           return this._database.splice(i,1);
        }
        this.writeToFile();
    }

    getItemsByCriteria(criteria){
       return this._database.filter(criteria);
    }
    
    getSize(){
        return this._database.length;
    }
    getItem(item){
        let i =this._database.indexOf(item);
        return this._database[i];
    }

    //Write database to file
    writeToFile(){
        fs.writeFileSync(this._path,JSON.stringify(this._database,null,4),(err)=>{
            if (err){
                console.log('Error has occured while trying to save database.');
            }else{
                console.log('Successfully saved database.');
            }
        });
    }

    //Get the database object itself
    get database(){
        return this._database;
    }
}
module.exports=Database;


