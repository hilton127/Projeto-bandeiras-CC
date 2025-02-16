function validateCreditCard(number) {
    // Remove spaces and hyphens
    number = number.replace(/[\s-]/g, '');

    // Check if the number consists only of digits
    if (!/^\d+$/.test(number)) {
        return { isValid: false, bandeira: "Invalid number" };
    }

    // Luhn algorithm to validate the credit card number
    function luhnAlgorithm(num) {
        let total = 0;
        let reverseDigits = num.split('').reverse();
        for (let i = 0; i < reverseDigits.length; i++) {
            let digit = parseInt(reverseDigits[i], 10);
            if (i % 2 === 1) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            total += digit;
        }
        return total % 10 === 0;
    }

    if (!luhnAlgorithm(number)) {
        return { isValid: false, bandeira: "Invalid number" };
    }

    // Determine the card issuer (bandeira)
    function getCardIssuer(num) {
        if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(num)) {
            return "Visa";
        } else if (/^5[1-5][0-9]{14}$/.test(num)) {
            return "MasterCard";
        } else if (/^3[47][0-9]{13}$/.test(num)) {
            return "American Express";
        } else if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(num)) {
            return "Discover";
        } else if (/^(?:2131|1800|35\d{3})\d{11}$/.test(num)) {
            return "JCB";
        } else if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(num)) {
            return "Diners Club";
        } else {
            return "Unknown";
        }
    }

    let bandeira = getCardIssuer(number);
    return { isValid: true, bandeira: bandeira };

}

// Example usage
let number = "5334080114724584";
let result = validateCreditCard(number);
console.log(`Valid: ${result.isValid}, Bandeira: ${result.bandeira}`);

let bandeira = getCardIssuer(number);
    return { isValid: true, bandeira: bandeira };
    
