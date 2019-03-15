const Sequelize = require('sequelize');
const {colorize,log, biglog, errlog} = require('./out');
const {models} = require('./model');

const validateId = id => {
    return new Sequelize.Promise((resolve, reject) => {
        if(typeof id === 'undefined') {
            reject(new Error('Falta el parametro <id>'));
        } else {
            id = parseInt(id);
            if(Number.isNaN(id)) {
                reject(new Error('El valor del parámetro <id> no es un número'));
            } else {
                resolve(id);
            }
        }
    });
};

const makeQuestion = (rl, test) => {
    return new Sequelize.Promise((resolve, reject) => {
        rl.question(colorize(test, 'red'), answer => {
            resolve(answer.trim());
        });
    });
};

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
    models.quiz.findAll()
    .each(quiz => {
            log(`   [${colorize(quiz.id, 'magenta')}]: ${quiz.question}`, 'blue');
    })
    .catch(er => {
        errlog(er.message);
    })
    .then(() => rl.prompt());
};

exports.showCmd = (rl, id) => {
    validateId(id)
    .then(id => models.quiz.findById(id))
    .then(quiz => {
        if(!quiz) {
            throw new Error(`No existe el error asociado al id ${id}`);
        }
        log(`   [${colorize(id, 'magenta')}]:   ${quiz.question}    ${colorize(quiz.answer, 'green')}`);
    })
    .catch(er => {
        errlog(er.message);
    })
    .then(rl => {
        rl.prompt();
    });
};

exports.addCmd = (rl) => {
    makeQuestion(rl, 'Introduzca un pregunta:')
    .then(q => {
        return makeQuestion(rl, 'Introduzca la respuesta:')
        .then(a => {
            return {question: q, answer: a};
        });
    })
    .then(quiz => {
        return models.quiz.create(quiz);
    })
    .then(quiz => {
        log(`Se ha añadido ${colorize(question, 'red')} ${colorize(answer, 'green')}`);
    })
    .catch(Sequelize.validationError, er => {
        errlog('El quiz es erróneo');
        er.erros.forEach(({mer}) => errlog(mer));
    })
    .catch(er => {
        errlog(er.message);
    })
    .then(() => {
        rl.prompt();
    });

};

exports.deleteCmd = (rl, id) => {
    validateId(id)
    .then(id => models.quiz.destroy({where: {id}}))
    .catch(er => {
        errlog(er.message);
    })
    .then(() => {
        rl.prompt();
    });
};

exports.editCmd = (rl, id) => {
    validateId(id)
    .then(id => models.quiz.findById(id))
    .then(quiz => {
        if(!quiz) {
            throw new Error(`No existe un quiz asociado al id=${id}`);
        }
        process.stdout.isTTY && setTimeout(()=>{rl.write(quiz.question)},1);
        return makeQuestion(rl, 'Introduzca una pregunta:')
        .then(q => {
            return makeQuestion(rl, 'Introduzca la respuesta:')
            .then(a => {
                quiz.question = q;
                quiz.question = a;
                return quiz;
            });
        });
    })
    .then(quiz => {
        return quiz.save();
    })
    .then(quiz => {
        log(`Se ha añadido ${colorize(question, 'red')} ${colorize(answer, 'green')}`);
    })
    .catch(Sequelize.validationError, er => {
        errlog('El quiz es erróneo');
        er.erros.forEach(({mer}) => errlog(mer));
    })
    .catch(er => {
        errlog(er.message);
    })
    .then(() => {
        rl.prompt();
    });

};

exports.testCmd = (rl, id) => {
    if(typeof id === 'undefined') {
        errlog('Falta el parámetro id');
    } else {
        try {
            let quiz = model.getByIndex(id);
            rl.question(colorize(quiz.question, 'red'), answer => {
                    log('Su respuesta es', 'magenta');
                    if(answer === quiz.answer) {
                        biglog('CORRECTA', 'green');
                    } else {
                        biglog('INCORRETA', 'red');
                    }
                    rl.prompt();
            });
        } catch(er) {
            errlog(er);
        }
    }
};

exports.playCmd = (rl) => {
    let score = 0;
    let toBeResolve = [];
    model.getAll().forEach( (ele, id)=>{
        toBeResolve.push(id);
    });
    const playOne = () => {
        if(toBeResolve.length === 0) {
            log('FIN DEL JUEGO', 'red');
            rl.prompt();
        } else {
            let tmpId=Math.floor(Math.random()*toBeResolve.length);
            let id=toBeResolve[tmpId];
            let quiz=model.getByIndex(id);
            toBeResolve.splice(tmpId, 1);
            rl.question(colorize(quiz.question, 'red'), answer => {
                log('Su respuesta es', 'magenta');
                if(answer === quiz.answer) {
                    biglog('CORRECTA', 'green');
                    score++;
                    log('Respuestas correctas', 'magenta');
                    biglog(score, 'green');
                    playOne();
                } else {
                    biglog('INCORRETA', 'red');
                    log('FIN DEL JUEGO', 'red');
                    rl.prompt();
                }
            });
        }
    }
    playOne();
    
    
};

exports.creditsCmd = (rl) => {           
    log(`${colorize('Carlos','red')} ${colorize('Vázquez','yellow')} ${colorize('Jorge','magenta')}`);
    rl.prompt();
};