import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async create({ label, amount }: CreateTransactionDto) {
    const newTransaction = new this.transactionModel({
      label,
      amount,
    });
    const createdTransaction = await newTransaction.save() 
    return {
      message: "Transaction Created!",
      transaction: createdTransaction
    };
  }

  async findAll() {
    const transactions = await this.transactionModel.find()
    if(!transactions) {
      throw new NotFoundException("Transactions Not Found!")
    }
    return transactions ;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
