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
    model.getAll().forEach((quiz, id) => {
        log(`   [${colorize(id, 'magenta')}]:    ${quiz.question}`);
    });
    rl.prompt();
};

exports.showCmd = (rl, id) => {
    if(typeof id === 'undefined') {
        errlog('Falta el parámetro id');
    } else {
        try {
            const quiz = model.getByIndex(id);
            log(`   [${colorize(id, 'magenta')}]:   ${quiz.question}    ${colorize(quiz.answer, 'green')}`);
        } catch(er) {
            errlog(er);
        }
    }
    rl.prompt();
};

exports.addCmd = (rl) => {
    rl.question(colorize('Introduzca un pregunta:', 'red'), question => {
        rl.question(colorize('Introduzca la respuesta:', 'red'), answer => {
            model.add(question, answer);
            log(`Se ha añadido ${colorize(question, 'red')} ${colorize(answer, 'green')}`);
            rl.prompt();
        });
    });
};

exports.deleteCmd = (rl, id) => {

    if(typeof id === 'undefined') {
        errlog('Falta el parámetro id');
    } else {
        try {
            model.deleteByIndex(id);
        } catch(er) {
            errlog(er);
        }
    }

    rl.prompt();
};

exports.editCmd = (rl, id) => {

    if(typeof id === 'undefined') {
        errlog('Falta el parámetro id');
    } else {
        try {
            let quiz = model.getByIndex(id);
            process.stdout.isTTY && setTimeout(()=>{rl.write(quiz.question)},1);
            rl.question(colorize('Introduzca un pregunta:', 'red'), question => {
                process.stdout.isTTY && setTimeout(()=>{rl.write(quiz.answer)},1);
                rl.question(colorize('Introduzca la respuesta:', 'red'), answer => {
                    model.update(id, question, answer);
                    log(`Se ha añadido ${colorize(question, 'red')} ${colorize(answer, 'green')}`);
                    rl.prompt();
                });
            });        
        } catch(er) {
            errlog(er);
        }
    }};

exports.testCmd = (rl, id) => {
    log('   test <id>       Prueba el quiz indicado', 'red');
    rl.prompt();
};

exports.playCmd = (rl) => {
    log('   p|play          Comienza el juego', 'red');
    rl.prompt();
};

exports.creditsCmd = (rl) => {           
    log(`${colorize('Carlos','red')} ${colorize('Vázquez','yellow')} ${colorize('Jorge','magenta')}`);
    rl.prompt();
};