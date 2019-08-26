import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export class SocketService {
    private url = environment.api_url;
    private socket;    

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public getNotifications = () => {
        return Observable.create((observer) => {
            this.socket.on('notify', (message) => {
                observer.next(message);
            });
        });
    }
}