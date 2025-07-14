const fs = require('fs');
const path = './assets/chatbot-status.json';

let db = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : {};

function saveDB() {
    fs.writeFileSync(path, JSON.stringify(db, null, 2));
}

module.exports = {
    isChatbotOn(jid) {
        return db[jid] === true;
    },
    setChatbot(jid, value) {
        db[jid] = value;
        saveDB();
    },
    loadDB() {
        db = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : {};
    }
};
                     
