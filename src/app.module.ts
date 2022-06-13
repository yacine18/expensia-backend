import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot("mongodb+srv://yassine:yassine@cluster0.5fb3l.mongodb.net/ExpensiaDB?retryWrites=true&w=majority"),
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
