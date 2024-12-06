import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from 'src/common/entity/base.entity';

@Schema({ timestamps: true })
export class Category extends BaseEntity {
  @Prop({ required: true })
  categoryName: string;
}

export type CategoryDocument = Category & Document;
const CategorySchema = SchemaFactory.createForClass(Category);
export { CategorySchema };
