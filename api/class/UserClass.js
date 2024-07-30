// Registrar usuarios
// Iniciar sesion
// Cerrar sesion
// Obtener informacion de los usuarios
// Crear transacciones
// Pedir prestamos
// Borrar cuenta
// Actualizar


import Account from "../models/AccountModel.js";
import UserModel from "../models/UserModel.js"
import ManagerAccount from "./AccountClass.js";
import ManagerCards from "./CardClass.js";

class ManagerUser {
    constructor(email, phone, name, lastName, isInSeasion, isAdmin, password) {
        this.email = email;
        this.phone = phone;
        this.name = name;
        this.lastName = lastName;
        this.isInSeasion = isInSeasion;
        this.isAdmin = isAdmin;
        this.password = password;
    }

    async register() {
        try {
            const user = await UserModel.create8({
                email: this.email,
                phone: this.phone,
                name: this.name,
                lastName: this.lastName,
                isInSeasion: this.isInSeasion,
                isAdmin: this.isAdmin,
                password: this.password
            })

            const MA = new ManagerAccount(user._id, 12345, "Ahorro", 10000);
            const currentAccount = await MA.createAccount
            const MC = new ManagerCards(user._id, currentAccount._id, "16 digitos al azar", "debito", "De la fecha actual sumar 3 años", "Generar codigo de 3 sifras", "Active")
            await MC.createCard();
            return user;
        } catch (error) {
            throw new Error(`Error al registrar usuario ${error}`)
        }


    }
    async Login(email, password) {
        try {
            const user = await UserModel.findOne({ email })
            if (!user) {
                throw new Error("Usuario no registrado")
            }
            if (user.password !== password) {
                throw new Error("Contraseña Incorrecta")
            }
            return "Succeeded";

        } catch (error) {
            throw new Error(`Error al iniciar sesion ${error}`)

        }
    }

    async getUserInfo(id) {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {

            throw new Error(`Error al obtener informacion del usuario${error}`)
        }
    }
    async UpdateEmail(email, id) {
        try {
            if (!email) {
                throw new Error('Correo invalido');
            }
            await UserModel.findByIdAndUpdate(id, {
                $set: { email }
            });
            return "okey";
        } catch (error) {
            throw new Error(`Error al actualizar el correo${error}`)

        }
    }
    async UpdatePhone(phone, id) {
        try {
            if (!phone) {
                throw new Error('Numero telefonico invalido');
            }
            await UserModel.findByIdAndUpdate(id, {
                $set: { phone }
            });
            return "okey";
        } catch (error) {
            throw new Error(`Error al actualizar el numero telefonico${error}`)

        }
    }
    async UpdatePassword(password, id) {
        try {
            if (!password) {
                throw new Error('contraseña invalida');
            }
            await UserModel.findByIdAndUpdate(id, {
                $set: { password }
            });
            return "okey";
        } catch (error) {
            throw new Error(`Error al actualizar la contraseña ${error}`)

        }
    }
    // async deleteUsuer (){
    //     try {

    //     } catch (error) {

    //     }
    // }
}

export default ManagerUser;