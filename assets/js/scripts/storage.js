
/**
 * @param {string} message
 * 
 * @return {Object}
 */
function createItem(message) {
    const list = JSON.parse(localStorage.getItem('list')) || []
    const lastId = JSON.parse(localStorage.getItem('last_id')) || 0

    const newId = lastId + 1

    const item = {
        id: newId,
        message: encode(message),
        created_at: new Date().toISOString()
    }

    list.push(item)

    localStorage.setItem('list', JSON.stringify(list))
    localStorage.setItem('last_id', newId)

    return item
}

/**
 * @param {number} id
 * 
 * @return {void}
 */
function deleteItem(id) {
    let list = JSON.parse(localStorage.getItem('list')) || []

    list = list.filter(item => item.id !== id)

    localStorage.setItem('list', JSON.stringify(list))
}

/**
 * @param {number} id
 * 
 * @return {Object|null}
 */
function getItem(id) {
    const list = JSON.parse(localStorage.getItem('list')) || []

    const item = list.find(function (element) {
        return element.id === id
    })

    if (item) {
        item.message = decode(item.message)
    }

    return item || null
}

/**
 * @return {Array|null}
 */
function getAllItems() {
    return JSON.parse(localStorage.getItem('list')) || null
}

/**
 * @param {string} message
 * 
 * @return {string}
 */
function encode(message) {
    const map = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat',
    }

    let encoded = ''

    for (let char of message) {
        encoded += map[char] || char
    }

    return encoded
}

/**
 * @param {string} message
 * 
 * @return {string}
 */
function decode(message) {
    const map = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    }

    let decoded = ''
    let temp = ''

    for (let char of message) {
        temp += char

        if (map[temp]) {
            decoded += map[temp]
            temp = ''
        }

        else if (temp.length > 4 || !['e', 'i', 'a', 'o', 'u'].some(v => temp.includes(v))) {
            decoded += temp
            temp = ''
        }
    }

    return decoded
}