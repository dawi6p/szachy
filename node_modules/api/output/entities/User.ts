import {Column,Entity,Index,OneToMany,OneToOne,PrimaryGeneratedColumn} from "typeorm";
import {Friends} from './Friends'
import {Match} from './Match'
import {Riddleuser} from './Riddleuser'
import {Score} from './Score'


@Entity("user" ,{schema:"szachy" } )
export  class User {

@PrimaryGeneratedColumn({ type:"int", name:"ID" })
id:number;

@Column("varchar",{ name:"Email",length:200 })
email:string;

@Column("varchar",{ name:"Password",length:1000 })
password:string;

@Column("date",{ name:"RegistrationDate" })
registrationDate:string;

@Column("varchar",{ name:"NickName",length:200 })
nickName:string;

@Column("datetime",{ name:"BannedUntil",nullable:true })
bannedUntil:Date | null;

@Column("datetime",{ name:"Deleted",nullable:true })
deleted:Date | null;

@Column("int",{ name:"AdminPowerID"})
adminPowerId:number;

@OneToMany(()=>Friends,friends=>friends.friend)


friends:Friends[];

@OneToMany(()=>Friends,friends=>friends.friend3)


friends2:Friends[];

@OneToMany(()=>Match,match=>match.black2)


matches:Match[];

@OneToMany(()=>Match,match=>match.white2)


matches2:Match[];

@OneToMany(()=>Riddleuser,riddleuser=>riddleuser.user)


riddleusers:Riddleuser[];

@OneToMany(()=>Score,score=>score.user)


scores:Score[];

}
