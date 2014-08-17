"use strict";

// Capitalize the first letter of client's name.
var capitaliseFirstLetter = function(string){
    return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

const
    net = require('net'),
    client = net.connect({port: 5000}),
    username = capitaliseFirstLetter(process.argv[2]),
    readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

client.write(JSON.stringify({type: 'greeting', name: username}) + '\n');

rl.on('line', function (message) {
    client.write(JSON.stringify({type: 'chat', name: username, messages: message}) + '\n');
});

client.on('data', function(data)
{
    let message = JSON.parse(data);

    if (message.type === 'welcome')
    {
        console.log("Hello " + message.name +"! This is the Terminal Version of Group Chat V0.1.");
    }
    else if (message.type =='chat')
    {
        let sender = message.name;

        if (sender !== username){
            let chatContent = message.messages;
            console.log(sender + ": " + chatContent);
        }
    }
    else
    {
        throw Error("Unrecognized message type: " + message.type);
    }
});
