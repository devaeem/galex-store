import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export abstract class BaseEntity extends Document {
  @Prop({ default: false })
  isDeleted?: boolean;
}
