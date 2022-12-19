import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { creditAmountDto } from './dto/creditAmount.dto';
import { paybillDTO } from './dto/paybill.dto';
import { User } from './entity/user.entity';
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find()
    }
    async createUser(user: User): Promise<User> {
        return this.usersRepository.save(user)
    }
    async findByUsername(username): Promise<User> {
        return this.usersRepository.findOneBy({ username: username });
    }

    async changepassword(email: string, password: string, newpassword: string) {
        const validUser = await this.usersRepository.find({ where: { email, password } });
        if (validUser.length > 0) {
            return await this.usersRepository.update(email, { password: newpassword });
        }
        else {
            throw new HttpException("Email or password incorrect", HttpStatus.BAD_REQUEST)
        }
    }

    async forgotPassword(email: string, password: string, newpassword: string) {
        const validUser = await this.usersRepository.find({ where: { email, password } });
        if (validUser.length > 0) {
            return await this.usersRepository.update(email, { password: newpassword });
        }
        else {
            throw new HttpException("Email or password incorrect", HttpStatus.BAD_REQUEST)
        }
    }

    async getBalance(email: string) {
        const validUser = await this.usersRepository.find({ where: { email } });
        if (validUser.length > 0) {
            return `Avalable Balance is ${validUser[0].balance}`
        }
        else {
            throw new HttpException("Email is incorrect", HttpStatus.BAD_REQUEST)
        }
    }
    async creditAmountToUser(creditAmount: creditAmountDto) {
        const email = creditAmount.email
        const validUser = await this.usersRepository.find({ where: { email } });
        if (validUser.length > 0) {
            const newAmount = validUser[0].balance + creditAmount.amount
            return await this.usersRepository.update(email, { balance: newAmount });
        }
        else {
            throw new HttpException("Email is incorrect", HttpStatus.BAD_REQUEST)
        }
    }

    async payElectricitybill(paybillUser: paybillDTO, electricityBill: number) {
        const email = paybillUser.email
        const validUser = await this.usersRepository.find({ where: { email } });
        if (validUser.length > 0) {
            if (validUser[0].balance > electricityBill) {
                const newAmount = +validUser[0].balance - electricityBill
                return await this.usersRepository.update(email, { balance: newAmount });
            } else {
                throw new HttpException("you dont have sufficient balance to pay, please  credit amount", HttpStatus.EXPECTATION_FAILED)
            }
        }
        else {
            throw new HttpException("Email is incorrect", HttpStatus.BAD_REQUEST)

        }
    }

    async payPhonebill(paybillUser: paybillDTO, phoneBill: number) {
        const email = paybillUser.email
        const validUser = await this.usersRepository.find({ where: { email } });
        if (validUser.length > 0) {
            if (validUser[0].balance > phoneBill) {
                const newAmount = +validUser[0].balance - phoneBill
                return await this.usersRepository.update(email, { balance: newAmount });
            } else {
                throw new HttpException("you dont have sufficient balance to pay, please  credit amount", HttpStatus.EXPECTATION_FAILED)
            }
        }
        else {
            throw new HttpException("Email is incorrect", HttpStatus.BAD_REQUEST)

        }
    }

    async payElectricityAndPhoneBill(paybillUser: paybillDTO, electricityBill: Number, phoneBill: Number) {
        const email = paybillUser.email
        const validUser = await this.usersRepository.find({ where: { email } });
        if (validUser.length > 0) {
           const billAmount = (+electricityBill) + (+phoneBill)
            if (validUser[0].balance > billAmount) {
                const newAmount = +validUser[0].balance - billAmount
                return await this.usersRepository.update(email, { balance: newAmount });
            } else {
                throw new HttpException("you dont have sufficient balance to pay both bill, please credit amount", HttpStatus.EXPECTATION_FAILED)
            }
        }
        else {
            throw new HttpException("Email is incorrect", HttpStatus.BAD_REQUEST)

        }
    }
}

