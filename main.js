const readline = require('readline');

console.log("CORE quiz");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'quiz> '
});

rl.prompt();

rl.on('line', (line) => {
    switch (line.trim()) {
        case '':
            break;
        case 'h':
        case 'help':
            console.log('Comandos:');
            console.log('   h|help          Muestra esta ayuda');
            console.log('   list            Lista de quizers existentes');
            console.log('   show <id>       Muestra la pregunta y la respuesta del quiz indicado');
            console.log('   add             Añade un nuevo quiz interactivamente');
            console.log('   delete <id>     Borra el quiz indicado');
            console.log('   edit <id>       Edita el quiz indicado');
            console.log('   test            Prueba el quiz indicado');
            console.log('   p|play          Comienza el juego');
            console.log('   credits         Créditos');
            console.log('   q|quit          Sale del programa');

            break;
        default:
            console.log(`Say what? I might have heard '${line.trim()}'`);
            break;
    }
    rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});