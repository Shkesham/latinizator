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
    if(selection.optionLeft === 'Кириллица')
        vocab = collections.dictionary
    else
        vocab = collections.reversedDictionary
    
    // Сущетсвует ли символ (сочетание 2х символов) в словаре
    let value = vocab.get(input.toUpperCase())
    if (typeof value !== 'undefined')
    {

        // let softed = checkSoft(prevChar, input, vocab)
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
                // if (softed)
                //     return softed
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
            // if(softed)
            //     return softed.toLocaleLowerCase()
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

// Проверка смягчения н/л
// function checkSoft(prevChar, input, vocab) {

//     const softingChars = ['Е', 'е']
//     const softedChars = ['Н', 'Л', 'н', 'л']

//     if((softedChars.indexOf(prevChar) !== -1) && (softingChars.indexOf(input) !== -1)) {
//         let value = vocab.get(input.toUpperCase())
//         return 'J'+value
//     }
//     else return false
// }

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

/* Правила ЛАТИНИЦА => КИРИЛЛИЦА */ 

// Проверить, явлется ли сочетание букв йотированным
// function checkJoted(prevChar, input, vocab) {

//     const jotedChars = ['O', 'U', 'A', 'E', 'o', 'u', 'a', 'e']
//     const prevChars = ['J', 'I', 'j', 'i']

//     if((prevChars.indexOf(prevChar) !== -1) && (jotedChars.indexOf(input) !== -1)) {

//         let substr = prevChar + input
//         let res = vocab.get(substr.toUpperCase())

//         if(prevChar==='J' || prevChar==='I')
//             return res.toUpperCase()
//         if(prevChar==='j' || prevChar==='i')
//             return res.toLowerCase()
            
//     }
//     else return false
    
// }

// Форматированние йотированных сочетаний символов
// function formatJoted(processedData, findedChar) {

//     const jotedChars = ['Ё', 'Ю', 'Я', 'Е', 'ё', 'ю', 'я', 'е']
//     const softingChars = ['Ь', 'И', 'ь', 'и']
//     const ulumatedChars = ['Ӧ', 'Ӱ', 'ӧ', 'ӱ']

//     // Удалить softingChars для йотированных звуков
//     if( jotedChars.indexOf(findedChar) !== -1 && softingChars.indexOf(processedData[processedData.length-2]) !== -1 ) {
//         processedData = processedData.slice(0, processedData.length-2) + processedData.slice(processedData.length-1, processedData.length)
//     }
//     else if
//     // Заменить softingChars на Й для букв с улуматом
//     (ulumatedChars.indexOf(findedChar) !== -1 && softingChars.indexOf(processedData[processedData.length-2]) !== -1 ) 
//     {
//         let isUpperCase = findedChar.toUpperCase()===findedChar
//         let jChar = 'й'

//         if(isUpperCase)
//             jChar = 'Й'

//         processedData = processedData.slice(0, processedData.length-2) + jChar + processedData.slice(processedData.length-1, processedData.length)
//     }

//     return processedData
// }

export default transliterate
    