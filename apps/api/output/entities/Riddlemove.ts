import {Column,Entity,Index,OneToOne,PrimaryGeneratedColumn} from "typeorm";
import {Riddle} from './Riddle'


@Index("RiddleID",["riddleId",],{  })
@Entity("riddlemove" ,{schema:"szachy" } )
export  class Riddlemove {

@PrimaryGeneratedColumn({ type:"int", name:"ID" })
id:number;

@Column("int",{ name:"RiddleID" })
riddleId:number;

@Column("varchar",{ name:"MoveCode",length:20 })
moveCode:string;

@OneToOne(()=>Riddle,riddle=>riddle)


riddle:Riddle;

}
