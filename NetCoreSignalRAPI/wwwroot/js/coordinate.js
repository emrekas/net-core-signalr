'use strict';

let connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:44362/positionHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
    .build();
var users = [];
//Disable send button until connection is established

var counter = 1;
var user = Math.random().toString(36).substring(7);
connection.on('NewPosition', function (user, mouseX, mouseY,activeUsersCount) {
    document.getElementById('requestCount').innerHTML = "Request Counter: " + counter++;
    document.getElementById('onlineUsers').innerHTML = "Online Users: " + activeUsersCount;   
    if (!users.includes(user)) {
        var newUserDiv = document.createElement('div');
        newUserDiv.innerHTML = user;
        newUserDiv.style.position = 'absolute';
        newUserDiv.id = user;
        document.getElementsByTagName('body')[0].appendChild(newUserDiv);
        newUserDiv.style.left = mouseX;
        newUserDiv.style.top = mouseY;
        users.push(user);
    }else{
        var existUser = document.getElementById(user);
        existUser.style.left = mouseX;
        existUser.style.top = mouseY;
    }
});

connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

window.addEventListener('keydown', function (event) {
    document.getElementById("anyKey").style.display = "none";
    var div = document.getElementById(user);
    var myCoordinates = { style: { top: '0px', left: '0px' }, offsetLeft: 0, offsetTop: 0 };

    if (div == null) {
        div = myCoordinates;
    }
    switch (event.key) {
        case 'ArrowLeft':
            div.style.left = (div.offsetLeft - 25) + 'px';
            break;
        case 'ArrowRight':
            div.style.left = (div.offsetLeft + 25) + 'px';
            break;
        case 'ArrowUp':
            div.style.top = (div.offsetTop - 25) + 'px';
            break;
        case 'ArrowDown':
            div.style.top = (div.offsetTop + 25) + 'px';
            break;
        default:
            break;
    }
    connection.invoke('ChangePosition', user, div.style.left, div.style.top).catch(function (err) {
        return console.error(err.toString());
    });
});




    // event.preventDefault();
