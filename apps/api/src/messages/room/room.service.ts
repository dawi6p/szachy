import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
    roomNumber = 0;
    userNumber = 0;
    roomIdTable = {};

    setRoomID(userId: string){
        this.userNumber++;
        if(this.userNumber%2 == 1){
            this.roomNumber++;
        }
        this.roomIdTable[userId] = {roomId: this.roomNumber}
    }
}
