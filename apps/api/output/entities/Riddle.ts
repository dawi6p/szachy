import {Column,Entity,JoinColumn,OneToMany,OneToOne,PrimaryGeneratedColumn} from "typeorm";
import {Riddlemove} from './Riddlemove'
import {Riddleuser} from './Riddleuser'


@Entity("riddle" ,{schema:"szachy" } )
export  class Riddle {

@PrimaryGeneratedColumn({ type:"int", name:"ID" })
id:number;

@Column("varchar",{ name:"FENString",length:1000 })
fenString:string;

@OneToOne(()=>Riddlemove,riddlemove=>riddlemove.riddle,{ onDelete:"CASCADE",onUpdate:"CASCADE" })
@JoinColumn([{ name: "ID", referencedColumnName: "riddleId" },
])

riddlemove:Riddlemove;

@OneToMany(()=>Riddleuser,riddleuser=>riddleuser.riddle)


riddleusers:Riddleuser[];

}
