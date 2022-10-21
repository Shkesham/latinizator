/* Транслитерация символов и проверка по правилам.
   Экспортируемая функция - transliterate. Она принимает параметры:
     event - значение из поля ввода,
     selection - текущее состояние выбора транслитерации.
*/ 

// Словари символов
const collections = require('./dictionary')

// Транслитерация
export function transliterate(event, selection) {

    const jotedChars = ['Ё', 'Ю', 'Я', 'ё', 'ю', 'я']

    let processedData = '';
    [...event.target.value].forEach(char => {

        const findedChar = findSymbol(char, selection)
        processedData += findedChar

        if(jotedChars.indexOf(findedChar) !== -1) {
            processedData = processedData.slice(0, processedData.length-2) + processedData.slice(processedData.length-1, processedData.length)
        }

    })

    return processedData
}


// Предыдущий введенный символ
let prevChar = ''

// Поиск символа в словаре
function findSymbol(input, selection) {

    let vocab

    // Проверка, какой словарь использовать
    if(selection.optionLeft === 'Кириллица')
        vocab = collections.dictionary
    else
        vocab = collections.reversedDictionary
    
    // Сущетсвует ли символ (сочетание 2х символов) в словаре
    let value = vocab.get(input.toUpperCase())
    if (typeof value !== 'undefined')
    {

        let joted = checkJoted(prevChar, input, vocab)
        let softed = checkSoft(prevChar, input, vocab)
        let vowels = checkAfterVowels(prevChar, input, vocab)
        let eFirst = checkEfirst(prevChar, input)

        prevChar = input

        // Если верхний регистр
        let isUpperCase = input.toUpperCase()===input
        if(isUpperCase) {
            if(value.length===2) {
                let newValue = value[0].toUpperCase() + value[1].toLowerCase()
                return newValue
            }
            else {    
                if(joted)
                    return joted
                else if (softed)
                    return softed
                else if (vowels)
                    return vowels
                else if (eFirst)
                    return eFirst
                else
                    return value 
            }     
        }
        // Если нижний регистр
        else {
            if(joted)
                return joted.toLocaleLowerCase()
            if(softed)
                return softed.toLocaleLowerCase()
            else if (vowels)
                return vowels.toLocaleLowerCase()
            else if (eFirst)
                return eFirst.toLocaleLowerCase()
            else
                return value.toLocaleLowerCase()
        }
            
    }
    // Если не существует, возвращаем неизмененные входные данные
    else {
        prevChar = input
        return input
    }
        
    
}

/* Правила ЛАТИНИЦА => КИРИЛЛИЦА */ 

// Проверить, явлется ли сочетание букв йотированным
function checkJoted(prevChar, input, vocab) {

    const jotedChars = ['O', 'U', 'A', 'o', 'u', 'a']

    if((prevChar==='J' || prevChar==='j') && (jotedChars.indexOf(input) !== -1)) {

        let substr = prevChar + input
        let res = vocab.get(substr.toUpperCase())

        if(prevChar==='J')
            return res.toUpperCase()
        if(prevChar==='j')
            return res.toLowerCase()
    }
    else return false
    
}

/* Правила КИРИЛЛИЦА => ЛАТИНИЦА */ 

// Проверка смягчения н/л
function checkSoft(prevChar, input, vocab) {

    const softingChars = ['И', 'Е', 'и', 'е']
    const softedChars = ['Н', 'Л', 'н', 'л']

    if((softedChars.indexOf(prevChar) !== -1) && (softingChars.indexOf(input) !== -1)) {
        let value = vocab.get(input.toUpperCase())
        return 'J'+value
    }
    else return false
}

// Находится ли йотированная после гласной
function checkAfterVowels(prevChar, input, vocab) {

    const vowelsChars = ['А', 'И', 'О', 'У']
    const inputChars = ['Я', 'Ю', 'Ё']

    if(vowelsChars.indexOf(prevChar.toUpperCase()) !== -1) {

        let value = vocab.get(input.toUpperCase())

        if(input.toUpperCase() === 'Е')
            return 'I'+value
        if(inputChars.indexOf(input.toUpperCase()) !== -1)
            return 'I' + value.slice(1)          
        
    }
    else return false
}

// Если Е в начале слова
function checkEfirst(prevChar, input) {
    if(input.toUpperCase() === 'Е' && (prevChar === '' || prevChar === ' '))
        return 'j'+input
    else
        return false
}

export default transliterate
    