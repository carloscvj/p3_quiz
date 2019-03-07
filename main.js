const readline = require('readline');
const {colorize,log, biglog, errlog} = require('./out');
const cmds = require('./cmds');

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
            cmds.helpCmd(rl);
            break;
        case 'q':
        case 'quit':
            cmds.quitCmd(rl);
            break;
        case 'list':
            cmds.listCmd(rl);
            break;
        case 'show':
            cmds.showCmd(rl, args[1]);
            break;
        case 'add':
            cmds.addCmd(rl);
            break;
        case 'delete':
            cmds.deleteCmd(rl, args[1]);
            break;
        case 'edit':
            cmds.editCmd(rl, args[1]);
            break;
        case 'test':
            cmds.testCmd(rl, args[1]);
            break;
        case 'p':
        case 'play':
            cmds.playCmd(rl);
            break;
        case 'credits':            
            cmds.creditsCmd(rl);
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


