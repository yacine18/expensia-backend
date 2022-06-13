import {IsNotEmpty} from "class-validator"

export class CreateTransactionDto {

    @IsNotEmpty()
    label: string
    
    @IsNotEmpty()
    amount: number
}
