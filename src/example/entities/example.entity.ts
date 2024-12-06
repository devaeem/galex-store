import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from 'src/common/entity/base.entity';

@Schema()
export class Example extends BaseEntity {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export type ExampleDocument = Example & Document;
const ExampleSchema = SchemaFactory.createForClass(Example);
export { ExampleSchema };
