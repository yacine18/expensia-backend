import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';

export type TransactionDocument = Transaction & Document

@Schema({ timestamps: true })
export class Transaction {
  
  @Prop({required: true})
  label: string;

  @Prop({required: true})
  amount: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
  user: string
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
