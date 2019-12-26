#/bin/bash
scp ./server.js root@intrising.io:/root/test/
docker cp ./client.js ws-env:/opt/app-root/src/test/client.js