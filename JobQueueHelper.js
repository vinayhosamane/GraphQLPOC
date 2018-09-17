import jobQueueData from "./JobQueue.json";

const myJobs = (userid)=> {
console.log(userid);
console.log(jobQueueData);
    for(var key in jobQueueData){
        console.log(key)
        if(key == userid){
            return jobQueueData[key];
        }
    }

    return null;
}

const allJobs = ()=>{
   var returnData = [];

   for(var key in jobQueueData){
       returnData.push(jobQueueData[key]);
   }
   console.log(returnData);
    return returnData;
}

module.exports = {
    myJobs,
     allJobs
};