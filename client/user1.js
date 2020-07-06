// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlNFd1FUVFJXMCIsImlhdCI6MTU5Mzc2NTQzNjI1MiwiZXhwIjoxNTkzODUxODM2LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IkE0MXFnZy1kZiIsImZpcnN0TmFtZSI6IlNoYXNoYW5rIiwibGFzdE5hbWUiOiJTaGVraGFyIiwiZW1haWwiOiJzaGFzaGFua0BoZWxsby5jb20iLCJtb2JpbGVOdW1iZXIiOjk4NzQ3NDc0NzR9fQ.KhAnVBokiMFqWUR_CBBUgIMKtdWmKUW5dOZkw5-qpmo"
const userId= "A41qgg-df"

let chatMessage = {
    createdOn: Date.now(),
    receiverId: 'OocnFd33n',//putting user2's id here 
    receiverName: "Aditya Kumar",
    senderId: userId,
    senderName: "Shashank Shekhar"
  }

  let chatSocket = () => {

    socket.on('verifyUser', (data) => {
  
      console.log("socket trying to verify user");
  
      socket.emit("set-user", authToken);
  
    });
  
    socket.on(userId, (data) => {
  
      console.log("you received a message from "+data.senderName)
      console.log(data.message)
  
    });
  
    socket.on("online-user-list", (data) => {
  
      console.log("Online user list is updated. some user can online or went offline")
      console.log(data)
  
    });
  
    socket.on("typing", (data) => {
  
      console.log(data+" is typing")
      
      
    });
  
    $("#send").on('click', function () {
  
      let messageText = $("#messageToSend").val()
      chatMessage.message = messageText;
      socket.emit("chat-msg",chatMessage)
  
    })
  
    $("#messageToSend").on('keypress', function () {
  
      socket.emit("typing","Shashank Shekhar")
  
    })
  
  
  
  
  }// end chat socket function
  
  chatSocket();