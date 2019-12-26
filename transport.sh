#/bin/bash
scp ./server.js root@intrising.io:/root/test/
docker cp ./client.js ws:/opt/app-root/src/test/client.js