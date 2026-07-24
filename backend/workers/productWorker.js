// import {Worker} from "bullmq";

// const worker=new Worker(
//     "productQueue",
//     async(job)=>{

//         console.log("job started");
//         console.log("Job Data",job.data);
//         console.log("generate thumnail");

//         // await new Promise((resolve)=>{
//         //     setTimeout(resolve,5000);
//         // });
//         if(job.attemptsMade < 2){

//             throw new Error("Temporary Error");

//         }
//         //  throw new Error("Thumbnail Generation Failed");
//         // await sendEmail(...)
//         // await uploadToCloudinary(...)  original me ye sab rhta hai timeout nhi rhta hai
//         console.log("thumabail generated");
//     },
//     {
//         connection :{
//             host:"localhost",
//             port:6379
//         }
//     }
// );
import { Worker } from "bullmq";

// const worker = new Worker(

//     "productQueue",

//     async (job)=>{

//         console.log("Doing Work...");

//         // await new Promise((resolve)=>{

//         //     setTimeout(resolve,5000);

//         // });
//         throw new Error("Cloudinary Failed");

//         return "Thumbnail Created";

//     },

//     {

//         connection:{

//             host:"localhost",

//             port:6379

//         }

//     }

// );
const worker = new Worker(

"productQueue",

async(job)=>{

    await job.updateProgress(20);

    console.log("Download");

    await job.updateProgress(40);

    console.log("Resize");

    await job.updateProgress(60);

    console.log("Compress");

    await job.updateProgress(80);

    console.log("Upload");

    await job.updateProgress(100);

    console.log("Done");

},

{

connection:{

host:"localhost",

port:6379

}

}

);

worker.on("completed",(job,result)=>{

    console.log("Completed ho gya hai");

    console.log(job.data.id);

    console.log(result);

});

worker.on("failed",(job,error)=>{

    console.log(job.data.id);

    console.log(error.message);

});
// multiple progress dikhane ke liye 
worker.on("progress",(job,progress)=>{

    console.log(progress);

});

// real use ye hai
// worker.on("failed",async(job,error)=>{

//     await FailedJobs.create({

//         productId:job.data.id,

//         reason:error.message

//     });

// });
// worker.on("completed",async(job)=>{

//     await Product.findByIdAndUpdate(

//         job.data.id,

//         {

//             thumbnail:true

//         }

//     );

// });
