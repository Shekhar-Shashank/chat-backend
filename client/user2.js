// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImhHTzlwQjZxRCIsImlhdCI6MTU5Mzc2NTU1ODY1MiwiZXhwIjoxNTkzODUxOTU4LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6Ik9vY25GZDMzbiIsImZpcnN0TmFtZSI6IkFkaXR5YSIsImxhc3ROYW1lIjoiS3VtYXIiLCJlbWFpbCI6ImFkaXR5YUBoZWxsby5jb20iLCJtb2JpbGVOdW1iZXIiOjg5ODk4OTg4OX19.aj_9HlDU_O4BhQpRTWJv5aY8vuC5cQlymcUM97jEM_Q"
const userId= "OocnFd33n"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'A41qgg-df',//putting user2's id here 
  receiverName: "Shashank Shekhar",
  senderId: userId,
  senderName: "Aditya Kumar"
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


  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","Aditya Kumar")

  })

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });



}// end chat socket function

chatSocket();