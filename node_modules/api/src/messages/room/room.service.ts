import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
    roomNumber = 0;
    userNumber = 0;
    roomIdTable = {};

    setRoomID(userId: number){
        if(this.roomIdTable[userId] != null || this.roomIdTable[userId] != undefined) return;
        this.userNumber++;
        if(this.userNumber%2 == 1){
            this.roomNumber++;
        }else{
            //const Return = this.roomIdTable.filter(room => room.roomNumber == idroom);
        }
        this.roomIdTable[userId] = {roomId: this.roomNumber, white: true}
    }

    findIfWhite(roomId: number): any {
        const result = Object.values(this.roomIdTable).find(
            (room: { roomId: number }) =>
                room.roomId === roomId
        );
    
        return result;
    }
}
