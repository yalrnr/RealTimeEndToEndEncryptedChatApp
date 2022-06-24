// Connecting the client and Server
const socket = io('http://localhost:8000');

// Assigning DOM elements as JS Variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

// Sound played whenever a user recieves texts
var audio = new Audio('ting.mp3')


// Function to append the messages dynaically to the container
const append = (message,position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left')
    audio.play();
}

// Asking the new user's name and Server receives the name
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

// Inform others when someone joins the chat
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})


// Receive the message from the server
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

// If someone leaves the chat, inform others
socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
})

// If someone sends some message using the form, pass it to the server
form.addEventListener('submit',(e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value = ''  
})