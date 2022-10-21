// Дефолтный словарь
const dictionary = new Map ([
    ['А', 'A'],
    ['Ӓ', 'Ä'],
    ['Б', 'B'],
    ['В', 'V'],
    ['Г', 'G'],
    ['Д', 'D'],
    ['Е', 'E'],
    ['Ё', 'JO'],
    ['Ж', 'Ž'],
    ['З', 'Z'],
    ['И', 'I'],
    ['Й', 'J'],
    ['К', 'K'],
    ['Л', 'L'],
    ['Љ', 'LJ'],
    ['М', 'M'],
    ['Н', 'N'],
    ['Њ', 'NJ'],
    ['Ҥ', 'Ŋ'],
    ['О', 'O'],
    ['Ӧ', 'Ö'],
    ['П', 'P'],
    ['Р', 'R'],
    ['С', 'S'],
    ['Т', 'T'],
    ['У', 'U'],
    ['Ӱ', 'Ü'],
    ['Ф', 'F'],
    ['Х', 'H'],
    ['Ц', 'C'],
    ['Ч', 'Č'],
    ['Ш', 'Š'],
    ['Щ', 'Ŝ'],
    ['Ы', 'Y'],
    ['Ь', 'J'],
    ['Э', 'E'],
    ['Ю', 'JU'],
    ['Я', 'JA'],
])

// Обратный словарь
const reversedDictionary = new Map()

function reverse() {
    dictionary.forEach((value, key) => 
        reversedDictionary.set(value, key)
    )
}

reverse()

module.exports = {
    dictionary,
    reversedDictionary
}

