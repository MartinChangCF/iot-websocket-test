# IOT WebSocket Test

## Environment

- WebSocket server on `intrising.io`
- WebSocket client on `docker`

## Get Started

1. Prepare the client environment
    - [Download](https://drive.google.com/open?id=1yHF3kS-8tMNShBTR03N7432t8M-fWjDU) the docker image
    - Load it as an image, `cat ./ws-env.tar | docker import - local/ws-env`
    - Run `docker run --cap-add=NET_ADMIN --cap-add=NET_RAW -d --name ws-env local/ws-env /usr/sbin/init`
2. Then, WebSocket code is [here](), and exec the `transport.sh` to auto copy files to their destination.
    - Server goes to `intrising.io:/root/test`
    - Client goes into docker container `/opt/app-root/src/test/client.js`
    - Note. remember to `npm install` on both sides before exec.
3. Now, here is the catch on both server and client-side.
    - On the server-side, cd into the `/root/test` folder and run `node server.js` to start the service.
    - On the client-side,
       1. Get into the docker container by ``
       2. Run `node ~/test/client.js`
       3. Use `iptables` to simulate the bad network status of a device.
         - Create a filter `iptables -A OUTPUT -o eth0 -m statistic --mode random --probability 0.90 -j DROP`
         - Delete a filter `iptables -D OUTPUT -o eth0 -m statistic --mode random --probability 0.90 -j DROP`

Now, you can see the result of the WebSocket connection under 0.9 random drop packets on eth0.

![image](https://user-images.githubusercontent.com/25523621/71465259-099e5c00-27f7-11ea-8dae-8de7b2e508fc.png)
