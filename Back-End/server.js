const http = require('http'); // Import du package natif de Node HTTP

const app = require('./app'); // Import du fichier app.js

//la fonction normalize Port renvoie un port valide 
//qu'il soit fourni sous forme d'un numéro ou d'une chaîne
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// la fonction errorHandler recherche les différents erreurs  et les gère de manière appropriée
// Elle est ensuite enregistrée dans le serveur
const errorHandler = (err) => {
    if (err.syscall !== 'listen') {
        throw err;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
    switch (err.code) {
        case 'EACCES':
            console.err(bind + 'requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.err(bind + 'is already in use.');
            process.exit(1);
            break;
        default:
            throw err;
    }
}

//Configurer le server pour qu'il écoute :
// Soit la variable d'environnement du port grâce à process.env.PORT; Soit le port 3000
const server = http.createServer(app);
server.on('err', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
    console.log('Listening on ' + bind);
})
server.listen(port);