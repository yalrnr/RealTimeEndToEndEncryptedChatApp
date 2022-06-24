// Node Server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });


// To store the name of the users 
const users = {};

io.on('connection',socket => {

    // Whenever a new joins, he / she is added to the users and everyone receives the information
    socket.on('new-user-joined',name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    // Whenever Server receives the text, it broadcasts to all the other clients present
    socket.on('send',message => {
        socket.broadcast.emit('receive',{message:message,name: users[socket.id]});
    });
    

    // Whenever someone leaves the chat, everyone is informed
    socket.on('disconnect',message => {
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})