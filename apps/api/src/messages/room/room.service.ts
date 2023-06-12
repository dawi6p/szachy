import { Injectable } from '@nestjs/common';
import { Timer, Time, TimerOptions } from 'timer-node';

@Injectable()
export class RoomService {
    roomNumber = 0;
    userNumber = 0;
    roomIdTable = {};

    getRandomBoolean(): boolean {
        return Math.random() < 0.5;
    }

    setRoomID(userId: number, type: number){
        let temp;
        if(this.roomIdTable[userId] != null || this.roomIdTable[userId] != undefined) return true;
        
        this.userNumber++;

        if(this.userNumber%2 == 1){
            temp = this.getRandomBoolean()
            this.roomNumber++;
        }else{
            temp = this.findIfWhite();
        }

        this.roomIdTable[userId] = {roomId: this.roomNumber, white: temp, type: type, timer: new Timer({ label: 'test-timer', startTimestamp: Number(new Date().getTime()) })}
        this.roomIdTable[userId].timer.start();
        this.roomIdTable[userId].timer.pause();

        return false;
    }

    findIfWhite(): any {
        const result = Object.values(this.roomIdTable).find(
            (room: { roomId: number }) =>
                room.roomId === this.roomNumber
        );
        return !result["white"];
    }

    startClockIfWhite(){
        const result = Object.values(this.roomIdTable).find(
            (room: { roomId: number }) =>
                room.roomId === this.roomNumber
        );

        result['timer'].resume();
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
