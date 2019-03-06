const readline = require('readline');
const figlet = require('figlet');
const chalk = require('chalk');

const colorize = (msg, color) => {
    if(typeof color !== "undefined") {
        msg = chalk[color].bold(msg);
    }
    return msg;
};
const log = (msg, color) => {
    console.log(colorize(msg, color));
};
const biglog = (msg, color) => {
    log(figlet.textSync(msg, {horizontalLayout : 'full'}), color);
};
const errlog = emsg => {
    console.log(`${colorize("Error", "red")}: ${colorize(colorize(emsg, "red"),"bgYellowBright")}`);
};

biglog('CORE quiz',"green");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: (line) => {
        const completions = 'h help q quit list show add delete edit test p play credits'.split(' ');
        const hits = completions.filter((c) => c.startsWith(line));
        // show all completions if none found
        return [hits.length ? hits : completions, line];
      },
    prompt: colorize('quiz> ', 'blue')
});

rl.prompt();

rl.on('line', (line) => {
    let args=line.split(' ');
    let cmd=args[0].toLowerCase().trim();

    switch (cmd) {
        case '':
            rl.prompt();
            break;
        case 'h':
        case 'help':
            helpCmd();
            break;
        case 'q':
        case 'quit':
            quitCmd();
            break;
        case 'list':
            listCmd();
            break;
        case 'show':
            showCmd(args[1]);
            break;
        case 'add':
            addCmd();
            break;
        case 'delete':
            deleteCmd(args[1]);
            break;
        case 'edit':
            editCmd(args[1]);
            break;
        case 'test':
            testCmd(args[1]);
            break;
        case 'p':
        case 'play':
            playCmd();
            break;
        case 'credits':            
            creditsCmd();
            break;
        default:
            console.log(`Comando desconocido '${colorize(cmd,'red')}'`);
            console.log(`Use ${colorize('help', 'green')} para ver todos los comandos disponibles`);
            rl.prompt();
            break;
    }
}).on('close', () => {
  console.log('Adiós');
  process.exit(0);
});

const helpCmd = () => {
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

const quitCmd = () => {
    rl.close();
};

const listCmd = () => {
    log('   list            Lista de quizers existentes', 'red');
    rl.prompt();
};

const showCmd = id => {
    log('   show <id>       Muestra la pregunta y la respuesta del quiz indicado', 'red');
    rl.prompt();
};

const addCmd = () => {
    log('   add             Añade un nuevo quiz interactivamente', 'red');
    rl.prompt();
};

const deleteCmd = id => {
    log('   delete <id>     Borra el quiz indicado', 'red');
    rl.prompt();
};

const editCmd = id => {
    log('   edit <id>       Edita el quiz indicado', 'red');
    rl.prompt();
};

const testCmd = id => {
    log('   test <id>       Prueba el quiz indicado', 'red');
    rl.prompt();
};

const playCmd = () => {
    log('   p|play          Comienza el juego', 'red');
    rl.prompt();
};

const creditsCmd = () => {           
    log('   credits         Créditos', 'red');
    rl.prompt();
};
