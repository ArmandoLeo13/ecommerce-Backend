import app from "./app.js";
import cluster from 'cluster';
import os from 'os';

const modoCluster = process.argv[3]==="CLUSTER";

if(modoCluster && cluster.isPrimary){
    const numCPUs = os.cpus().length;

    for(let i=0; i<numCPUs; i++){
        cluster.fork();
    }
}else{
    const port = process.argv.port || 8080;

  app.listen(port, () => {
    console.log(`Worker ${process.pid} listening on port ${port}`);
  });
}