import { io, Socket as ISocket } from "socket.io-client";

class Socket {

    private socket: ISocket;

    constructor() {
        this.socket = io(import.meta.env.REACT_APP_SERVER_URL || "http://localhost:3000", {
            autoConnect: false,
        });
    }

    public connect(): Promise<void> {
        this.socket.connect();

        return new Promise<void>((resolve, reject) => {
            this.socket.on( "connect", resolve );
            this.socket.on( "error", reject );
        });
    }

    public disconnect(): void {
        this.socket.disconnect();
        this.socket.removeAllListeners();
    }
    
}

export default Socket;