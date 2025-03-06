function numberToWords(number) {
    const units = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
    const teens = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
    const tens = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
    const hundreds = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

    function convertHundreds(n) {
        if (n === 0) return '';
        if (n === 100) return 'cem';
        
        let words = [];
        let hundred = Math.floor(n / 100);
        let remainder = n % 100;

        if (hundred > 0) {
            words.push(hundreds[hundred]);
        }

        if (remainder > 0) {
            if (hundred > 0) words.push('e');

            if (remainder < 10) {
                words.push(units[remainder]);
            } else if (remainder < 20) {
                words.push(teens[remainder - 10]);
            } else {
                let ten = Math.floor(remainder / 10);
                let unit = remainder % 10;

                words.push(tens[ten]);
                if (unit > 0) {
                    words.push('e');
                    words.push(units[unit]);
                }
            }
        }

        return words.join(' ');
    }

    function convertThousands(n) {
        if (n === 0) return '';
        
        let words = [];
        let thousands = Math.floor(n / 1000);
        let remainder = n % 1000;

        if (thousands > 0) {
            if (thousands === 1) words.push('mil');
            else words.push(convertHundreds(thousands) + ' mil');
        }

        if (remainder > 0) {
            if (thousands > 0) words.push('e');
            words.push(convertHundreds(remainder));
        }

        return words.join(' ');
    }

    function convertMillions(n) {
        if (n === 0) return '';
        
        let words = [];
        let millions = Math.floor(n / 1000000);
        let remainder = n % 1000000;

        if (millions > 0) {
            if (millions === 1) words.push('um milhão');
            else words.push(convertHundreds(millions) + ' milhões');
        }

        if (remainder > 0) {
            if (millions > 0) words.push('e');
            words.push(convertThousands(remainder));
        }

        return words.join(' ');
    }

    function convertBillions(n) {
        if (n === 0) return '';
        
        let words = [];
        let billions = Math.floor(n / 1000000000);
        let remainder = n % 1000000000;

        if (billions > 0) {
            if (billions === 1) words.push('um bilhão');
            else words.push(convertHundreds(billions) + ' bilhões');
        }

        if (remainder > 0) {
            if (billions > 0) words.push('e');
            words.push(convertMillions(remainder));
        }

        return words.join(' ');
    }

    // Main conversion logic
    let words = [];
    let [intPart, decimalPart] = number.toString().split('.');
    intPart = parseInt(intPart);
    decimalPart = decimalPart ? parseInt(decimalPart.padEnd(2, '0').slice(0, 2)) : 0;

    if (intPart > 0) {
        if (intPart >= 1000000000) {
            words.push(convertBillions(intPart));
        } else if (intPart >= 1000000) {
            words.push(convertMillions(intPart));
        } else if (intPart >= 1000) {
            words.push(convertThousands(intPart));
        } else {
            words.push(convertHundreds(intPart));
        }
        words.push('reais');
    }

    if (decimalPart > 0) {
        if (intPart > 0) words.push('e');
        
        if (decimalPart === 1) words.push('um centavo');
        else words.push(convertHundreds(decimalPart) + ' centavos');
    }

    return words.join(' ').replace(/\s+/g, ' ').trim().toUpperCase();
}

function convertToWords() {
    const valueInput = document.getElementById('value');
    const valueWordsInput = document.getElementById('value-words');
    
    // Remove 'R$' and replace comma with dot
    const numericValue = parseFloat(valueInput.textContent.replace(/[^\d,]/g, '').replace(',', '.'));

    
    if (!isNaN(numericValue)) {
        const wordsValue = numberToWords(numericValue);
        valueWordsInput.innerHTML = `<strong>A importância de:</strong> ${wordsValue}`;
    } else {
        alert('Valor inválido. Use o formato R$ 0,00');
    }
}

function printReceipt() {
    window.print();
}

// Add current date on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentDate = new Date().toLocaleDateString('pt-BR');
    const dateElement = document.createElement('div');
    dateElement.className = 'editable-field';
    dateElement.innerHTML = `<strong>Data:</strong> ${currentDate}`;
    document.querySelector('.receipt-actions').before(dateElement);
});