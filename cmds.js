const readline = require('readline');
const {colorize,log, biglog, errlog} = require('./out');
const model = require('./model');

exports.helpCmd = rl => {
    log('Comandos:', 'blue');
    log('   h|help          Muestra esta ayuda', 'blue');
    log('   list            Lista de quizers existentes', 'blue');
    log('   show <id>       Muestra la pregunta y la respuesta del quiz indicado', 'blue');
    log('   add             Añade un nuevo quiz interactivamente', 'blue');
    log('   delete <id>     Borra el quiz indicado', 'blue');
    log('   edit <id>       Edita el quiz indicado', 'blue');
    log('   test <id>       Prueba el quiz indicado', 'blue');
    log('   p|play          Comienza el juego', 'blue');
    log('   credits         Créditos', 'blue');
    log('   q|quit          Sale del programa', 'blue');
    rl.prompt();
};

exports.quitCmd = rl => {
    rl.close();
};

exports.listCmd = rl => {
    log('   list            Lista de quizers existentes', 'red');
    rl.prompt();
};

exports.showCmd = (rl, id) => {
    log('   show <id>       Muestra la pregunta y la respuesta del quiz indicado', 'red');
    rl.prompt();
};

exports.addCmd = (rl) => {
    log('   add             Añade un nuevo quiz interactivamente', 'red');
    rl.prompt();
};

exports.deleteCmd = (rl, id) => {
    log('   delete <id>     Borra el quiz indicado', 'red');
    rl.prompt();
};

exports.editCmd = (rl, id) => {
    log('   edit <id>       Edita el quiz indicado', 'red');
    rl.prompt();
};

exports.testCmd = (rl, id) => {
    log('   test <id>       Prueba el quiz indicado', 'red');
    rl.prompt();
};

exports.playCmd = (rl) => {
    log('   p|play          Comienza el juego', 'red');
    rl.prompt();
};

exports.creditsCmd = (rl) => {           
    log('   credits         Créditos', 'red');
    rl.prompt();
};