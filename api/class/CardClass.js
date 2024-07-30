//Obtener tarjeta
//Obtener todas las tarjetas
//Crear tarjeta

import CardModel from "../models/CardModel"

class ManagerCards {
    constructor(
        userId,
        accountId,
        cardNumber,
        cardType,
        expirationDate,
        securityCode,
        status
    ) {
        this.userId = userId,
            this.accountId = accountId,
            this.cardType = cardType,
            this.expirationDate = expirationDate,
            this.securityCode = securityCode,
            this.status = status;
    }

    async createCard() {
        try {
            await CardModel.create({
                userId: this.userId,
                accountId: this.accountId,
                cardType: this.cardType,
                expirationDate: this.expirationDate,
                securityCode: this.securityCode,
                status: this.status,
            })
            return "oky"
        } catch (error) {
            throw new Error(`Error al crear tarjetas ${error}`)


        }
    }
    async getCards() {
        try {
            const cards = await CardModel.find();
            return cards
        } catch (error) {
            //Arrojar error en caso de que la peticion no se complete
            throw new Error(`Error al obtener tarjetas ${error}`)
        }
    }

    async getCard(id) {
        try {
            const card = await CardModel.findById(id)
            return card;
        } catch (error) {
            throw new Error(`Error al obtener tarjeta ${error}`)
        }
    }


}

export default ManagerCards
