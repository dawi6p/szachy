import {Column,Entity,Index,JoinColumn,OneToOne,PrimaryGeneratedColumn} from "typeorm";
import {User} from './User'


@Index("Admin",["admin",],{  })
@Entity("adminpower" ,{schema:"szachy" } )
export  class Adminpower {

@PrimaryGeneratedColumn({ type:"int", name:"ID" })
id:number;

@Column("tinyint",{ name:"Admin",width:1 })
admin:boolean;

@OneToOne(()=>User,user=>user.adminpower,{ onDelete:"CASCADE",onUpdate:"CASCADE" })
@JoinColumn([{ name: "ID", referencedColumnName: "adminPowerId" },
])

user:User;

}
