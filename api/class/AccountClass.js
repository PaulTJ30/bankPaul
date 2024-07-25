//Obtener Cuenta
//Obtener Cuentas
//Agregar Balance
//Restar Balance
//Crear Cuenta
import AccountModel from "../models/AccountModel.js";
class ManagerAccount {
    constructor(
        userId,
        accountNumber,
        accountType,
        balance,
    ) {
        this.userId = userId;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.balance = balance;
    }

    //Obtener cuentas
    async getAccounts() {
        try {
            const accounts = await AccountModel.find();
            return accounts
        } catch (error) {
            //Arrojar error en caso de que la peticion no se complete
            throw new Error(`Error al obtener cuentas ${error}`)
        }
    }

    async getAccount(id) {
        try {
            const account = await AccountModel.findById(id)
            return account;
        } catch (error) {
            throw new Error(`Error al obtener cuenta ${error}`)
        }
    }

    async addBalance(id, amount) {
        try {
            this.balance += amount;
            await AccountModel.findByIdAndUpdate(id, {
                $set: {
                    balance: this.balance
                }
            })
            return "oky"
        } catch (error) {
            throw new Error(`Error en la transaccion ${error}`)

        }
    }

    async restBalance(id, amount) {
        try {
            this.balance -= amount;
            await AccountModel.findByIdAndUpdate(id, {
                $set: {
                    balance: this.balance
                }
            })
            return "oky"
        } catch (error) {
            throw new Error(`Error en la transaccion ${error}`)

        }
    }

    async createAccount() {
        try {
            await AccountModel.create({
                userId: this.userId,
                accountNumber: this.accountNumber,
                accountType: this.accountType,
                balance: this.balance
            });
            return "oky"
        } catch (error) {
            throw new Error(`Error al crear cuenta ${error}`)

        }
    }

}

export default ManagerAccount;