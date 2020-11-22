const net = require('net')
const fs = require ('fs')
const file = fs.readFileSync('package.json', 'utf-8')
const login = JSON.parse(file);
const readline = require ('readline')
const client = new net.Socket()
const process = require('process')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const PORT = process.argv[2];
const hostname = '127.0.0.1';

console.log(`Client connected at port ${PORT} and localhost ${hostname}`)

client.connect( PORT, hostname,  () => {
    console.log(`ENTRER YOUR MODE :`)

    rl.on('line', (input) => {
     console.log(`MODE: ${input}`);
     client.write('MODE'+ input);

    if (input == "USER" ) {
        rl.question('Enter your username :', (userinput) =>{
            console.log('USER :', userinput);
            client.write('USER '+ userinput);
    
            if (userinput == login ['username'] ) {
                
                rl.question('Enter your password:', (passinput) =>{
                    console.log(passinput);
                    client.write('USER '+ passinput);
    
                    if ( passinput == login ['password'] ) {
    
                        console.log('Password correct');
                        rl.on('line', (modeinput) => {

                            console.log(`MODE: ${modeinput}`);
                        

                            if ( modeinput == "LIST" ) {
                                console.log(`connected`);
                                let directory = process.cwd() ;

                                let files = fs.readdirSync(directory);
                                console.log(files);


                                console.log(` `)
                                console.log(`ENTRER YOUR COMMANDE :`)

                            }else if (modeinput == "QUIT" ) {

                                console.log(`Disconnected`);
                               
                                client.end();

                            } else if (modeinput == "CWD" ) {
                                console.log(`connected`);
                                rl.question('Enter your new directorie :', (input) =>{  
                                    console.log(input);
                                    console.log('Starting directory: ' + process.cwd());
                                try {
                                  process.chdir(input);
                                  console.log('New directory: ' + process.cwd());
                                  
                                  console.log(`ENTRER YOUR COMMANDE :`);
                                }
                                catch (err) {
                                  console.log('chdir: ' + err);
                                }
                                
                                })
        
                            } else if (modeinput == "HELP" ) {
                                console.log(`connected`);
                                console.log(`USER <username>: check if the user exist`);
                                console.log(`LIST: list the current directory of the server`);
                                console.log(`CWD <directory>: change the current directory of the server`);
                                console.log(`QUIT: close the connection and stop the program`);
                                console.log(` `)
                                console.log(`ENTRER YOUR COMMANDE :`)
       
                            } else if (modeinput == "PWD" ) {
                                console.log(`connected`);
                                console.log('The current directory: ' + process.cwd());
                                console.log(` `)
                                console.log(`ENTRER YOUR COMMANDE :`)

                            }
                        })
    
                    } else {
    
                        console.log('Password false');
                        console.log(` `)
                        console.log(`ENTRER YOUR MODE :`)
    
                    }
                });
                
            } else {
                
                console.log('USER NO EXIST')
                //console.log("FALSE DATA : " + userinput)
                console.log(` `)
                console.log(`ENTRER YOUR MODE :`)
            }
        });

       } else if (input == "QUIT" ) {
        console.log(`Disconnected`);
        rl.close();
        client.end();

       } else if (input == "LIST" ) {
           
        console.log(`YOU NEED TO CONNECT WITH USER`);
        console.log(`ENTRER YOUR MODE :`)
        
       } else if (input == "CWD" ) {
        console.log(`YOU NEED TO CONNECT WITH USER`);
        console.log(`ENTRER YOUR MODE :`)
        
       } else if (input == "HELP" ) {
        console.log(`USER <username>: check if the user exist`);
        console.log(`LIST: list the current directory of the server`);
        console.log(`CWD <directory>: change the current directory of the server`);
        console.log(`QUIT: close the connection and stop the program`);
        console.log(`PWD: affiche le nom du répertoire courant du serveur`);
        console.log(`ENTRER YOUR MODE :`)
       
       } else if (input == "PWD" ) {

        console.log(`YOU NEED TO CONNECT WITH USER`);
        console.log(`ENTRER YOUR MODE :`)

    }
    })

});

client.on('data', (data) => {
  console.log(data.toString())
})

