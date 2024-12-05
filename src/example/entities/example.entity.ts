import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Example extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export type ExampleDocument = Example & Document;
const ExampleSchema = SchemaFactory.createForClass(Example);
export { ExampleSchema };
