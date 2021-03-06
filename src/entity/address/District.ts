import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Apartment } from "../apartment/apartment";
import { Location } from "./Location";
import { Province } from "./Province";
import { Street } from "./Street";
import { Ward } from "./Ward";

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, length: 20 })
  code: string;
  @Column({ type: "nvarchar", charset: "utf8", length: 255 })
  name: string;
  @OneToMany((type) => Ward, (o) => o.district)
  @JoinColumn()
  wards: Ward[];
  @ManyToOne((type) => Province, (o) => o.districts, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  province: Province;

  @OneToMany((type) => Street, (o) => o.districts)
  @JoinColumn()
  streets: Street[];
  @OneToMany((type) => Location, (o) => o.district)
  @JoinColumn()
  locations: Location[];
  @OneToMany((type) => Apartment, (o) => o.district)
  @JoinColumn()
  aparmtemtns: Apartment[];
}
