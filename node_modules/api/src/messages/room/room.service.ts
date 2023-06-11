import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
    roomNumber = 0;
    userNumber = 0;
    roomIdTable = {};

    getRandomBoolean(): boolean {
        return Math.random() < 0.5;
    }

    setRoomID(userId: number){
        let temp;
        if(this.roomIdTable[userId] != null || this.roomIdTable[userId] != undefined) return true;
        this.userNumber++;
        if(this.userNumber%2 == 1){
            temp = this.getRandomBoolean()
            this.roomNumber++;
        }else{
            temp = this.findIfWhite();
        }
        this.roomIdTable[userId] = {roomId: this.roomNumber, white: temp}

        return false;
    }

    findIfWhite(): any {
        const result = Object.values(this.roomIdTable).find(
            (room: { roomId: number }) =>
                room.roomId === this.roomNumber
        );
        return !result["white"];
    }

    isRoomFull()
    {
        if(this.userNumber%2 == 1) return false;
        return true;
    }

    remove(id: number)
    {
        delete this.roomIdTable[id];
    }
}
