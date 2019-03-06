const readline = require('readline');
const figlet = require('figlet');
const chalk = require('chalk');

console.log(
    chalk.green.bold(
        figlet.textSync('CORE quiz',{horizontalLayout:'full'})
    )
);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: (line) => {
        const completions = 'h help q quit list show add delete edit test p play credits'.split(' ');
        const hits = completions.filter((c) => c.startsWith(line));
        // show all completions if none found
        return [hits.length ? hits : completions, line];
      },
    prompt: 'quiz> '
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
            console.log(`Comando desconocido '${cmd}'`);
            console.log('Use help para ver todos los comandos disponibles');
            rl.prompt();
            break;
    }
}).on('close', () => {
  console.log('Adiós');
  process.exit(0);
});

const helpCmd = () => {
    console.log('Comandos:');
    console.log('   h|help          Muestra esta ayuda');
    console.log('   list            Lista de quizers existentes');
    console.log('   show <id>       Muestra la pregunta y la respuesta del quiz indicado');
    console.log('   add             Añade un nuevo quiz interactivamente');
    console.log('   delete <id>     Borra el quiz indicado');
    console.log('   edit <id>       Edita el quiz indicado');
    console.log('   test <id>       Prueba el quiz indicado');
    console.log('   p|play          Comienza el juego');
    console.log('   credits         Créditos');
    console.log('   q|quit          Sale del programa');
    rl.prompt();
};

const quitCmd = () => {
    rl.close();
};

const listCmd = () => {
    console.log('   list            Lista de quizers existentes');
    rl.prompt();
};

const showCmd = id => {
    console.log('   show <id>       Muestra la pregunta y la respuesta del quiz indicado');
    rl.prompt();
};

const addCmd = () => {
    console.log('   add             Añade un nuevo quiz interactivamente');
    rl.prompt();
};

const deleteCmd = id => {
    console.log('   delete <id>     Borra el quiz indicado');
    rl.prompt();
};

const editCmd = id => {
    console.log('   edit <id>       Edita el quiz indicado');
    rl.prompt();
};

const testCmd = id => {
    console.log('   test <id>       Prueba el quiz indicado');
    rl.prompt();
};

const playCmd = () => {
    console.log('   p|play          Comienza el juego');
    rl.prompt();
};

const creditsCmd = () => {           
    console.log('   credits         Créditos');
    rl.prompt();
};
