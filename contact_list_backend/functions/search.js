module.exports.findMatches = (wordToMatch, contacts) => {
    // console.log(arr)
    return contacts.filter(contact => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return contact.name.match(regex) || contact.mobile.toString().match(regex) || contact.email.match(regex)
    });
}