const net = require('net')
const fs = require('fs')
const hostname = '127.0.0.1';
const PORT = process.argv[2];

const server = net.createServer((socket) => {
  console.log('new connection')

  socket.on('data', (data) => {
    const [directive, parameter] = data.toString().split(' ');

    switch(directive) {
        case 'USER' :
            // check if user exist in database
            
            // if true
            let read = fs.readFileSync(`package.json`);
            let login = JSON.parse(read);

            if (login ['username'] == parameter) {
                
                //console.log(parameter);
                console.log("Utilisateur : " + data.toString());

            } 

            if (login ['password'] == parameter) {
                //console.log(parameter)
                //socket.write('200 successfuly connected');
                socket.write('connected \n\r');
                socket.write('Hello from server \n\r' );
                socket.write('ENTRER YOUR COMMANDE :' );
                console.log('connected \n\r');
                    
                } 
               
            break;
    }
        
    })

})

server.listen(PORT, () => {
  console.log(`Server started at port ${PORT} and localhost ${hostname}`)
})