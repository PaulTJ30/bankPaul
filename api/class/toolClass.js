class Tools {
    static generateRandomNumber(length) {
        let number = "";
        for (let i = 0; i < this.length; i++) {
            number += Math.floor(Math.random() * 10)
        }
        return number
    }
    static generateCardNumber() {
        return this.generateRandomNumber(16);
    }

    static generateAccountNumber() {
        return this.generateRandomNumber(10);
    }
    static generateSecurityCode() {
        return this.generateRandomNumber(3);
    }

    static generateExpirationDate() {
        let date = new Date();
        date.setFullYear(date.getFullYear() + 3);
        return date.toISOString().split('T')[0]
    }

}

export default Tools