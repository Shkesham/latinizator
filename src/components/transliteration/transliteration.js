// Словари символов
const collections = require('./dictionary')

// Транслитерация
export function transliterate(text, selection) {

    let processedText = replaceLetters(text, selection)

    return processedText
}

// Заменить буквы разных алфавитов
function replaceLetters(text, selection) {

    let replacedText = ''

    for (var i = 0; i < text.length; i++) {
        const findedChar = findSymbol(text[i-1], text[i], text[i+1], selection)
        replacedText += findedChar
    }

    return replacedText
}

// Поиск символа в словаре. Возвращает символ из словаря
function findSymbol(prevChar, input, nextChar, selection) {

    if(prevChar === undefined)
        prevChar = ''
    if(nextChar === undefined)
        nextChar = ''

    let vocab

    // Проверка, какой словарь использовать
    if(selection === 'Кириллица')
        vocab = collections.dictionary
    else
        vocab = collections.reversedDictionary
    
    // Сущетсвует ли символ (сочетание 2х символов) в словаре
    let value = vocab.get(input.toUpperCase())
    if (typeof value !== 'undefined')
    {

        let vowels = checkAfterVowels(prevChar, input, vocab)
        let eFirst = checkEfirst(prevChar, input)
        let jLast = checkJlast(input, nextChar)

        // Если верхний регистр
        let isUpperCase = input.toUpperCase()===input
        if(isUpperCase) {
            if(value.length===2) {
                let newValue = value[0].toUpperCase() + value[1].toLowerCase()
                return newValue
            }
            else {    
                if (vowels)
                    return vowels
                else if (eFirst)
                    return eFirst[0] + eFirst[1].toLocaleLowerCase()
                else if (jLast)
                    return jLast
                else
                    return value 
            }     
        }
        // Если нижний регистр
        else {
            if (vowels)
                return vowels.toLocaleLowerCase()
            else if (eFirst)
                return eFirst.toLocaleLowerCase()
            else if (jLast)
                return jLast.toLocaleLowerCase()
            else
                return value.toLocaleLowerCase()
        }
            
    }
    // Если не существует, возвращаем неизмененные входные данные
    else {
        return input
    }
        
}

/* Правила КИРИЛЛИЦА => ЛАТИНИЦА */ 

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
        return 'J'+input        
    else
        return false
}

// Если Й в конце слова
function checkJlast(input, nextChar) {
    if(input.toUpperCase() === 'Й' && (nextChar === '' || nextChar === ' '))
        return 'i'        
    else
        return false
}

export default transliterate
    