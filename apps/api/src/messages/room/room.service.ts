import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
    roomNumber: number;
    userNumber: number;
    roomIdTable: {};

    setRoomID(userId: number){
        this.userNumber++;
        if(this.userNumber%2 == 1){
            this.roomNumber++;
        }
        this.roomIdTable[userId] = {roomId: this.roomNumber}
    }
}
