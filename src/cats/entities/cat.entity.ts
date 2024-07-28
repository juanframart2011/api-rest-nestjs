import { Breed } from "src/breeds/entities/breed.entity";
import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Cat {
    @Column({primary:true, generated:true})
    id:number;
    
    @Column()
    name:string;
    
    @Column()
    age:number;

    @DeleteDateColumn()
    delete_at: Date;

    @ManyToOne(()=> Breed, (breed)=>breed.id,{
        eager: true
    })
    breed: Breed;

    @ManyToOne(()=> User)
    @JoinColumn({
        name: 'userEmail',
        referencedColumnName: 'email',
    })
    user: User;

    @Column()
    userEmail:string;
}