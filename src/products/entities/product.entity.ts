import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseEntity } from 'src/common/entity/base.entity';

@Schema({ timestamps: true })
export class Product extends BaseEntity {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  productDescription: string;

  @Prop({ required: true })
  productPrice: number;

  @Prop({ required: true })
  productQuantity: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  productCategory: string;
}

export type ProductDocument = Product & Document;
const ProductSchema = SchemaFactory.createForClass(Product);
export { ProductSchema };
