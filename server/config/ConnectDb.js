import mongoose from "mongoose";

const ConnectDB = async(db_url)=>{
    try{
        // METHOD # 1
        // const DB_OPTIONS = {
        //     dbName:'paperGenDb'
        // }
        // await mongoose.connect(db_url,DB_OPTIONS)
                // OR
        // METHOD # 2
        const res = await mongoose.connect(`${db_url}/paperGen`)
        if(res){
            console.log("Connected to DB Successfully...")
        }
    }catch(err){
        console.log('Error while connecting DB ',err)
    }
}

export default ConnectDB;