const socket = io();
let products = [];
let messages = [];

function sendNewMessage(){
    const message = document.querySelector('#message').value;
    const userEmail = document.querySelector('#userEmail').value;
    const time = new Date().toLocaleString();
    if(!message || !userEmail){
        return
    }
    const messageObject = {
        userEmail,
        message,
        time
    }
    socket.emit('NEW_MESSAGE_TO_SERVER', messageObject)
    document.querySelector('#message').value = '';
}

function sendNewProduct(){
    const title = document.querySelector('#title').value;
    const price = document.querySelector('#price').value;
    const url = document.querySelector('#url').value;
    if(!title || !price){
        return
    }
    const productObject = {
        title,
        price,
        url
    }
    socket.emit('NEW_PRODUCT_TO_SERVER', productObject)
    document.querySelector('#title').value = '';
    document.querySelector('#price').value= '';
    document.querySelector('#url').value= '';
}



function updateMessage(data){
    let messageToHtml = ''
    data.forEach(element => {
        messageToHtml = messageToHtml + `<li>${element.userEmail}, [${element.time}] : ${element.message} `
    })
    document.querySelector('#messageList').innerHTML = messageToHtml;
}

function updateProduct(data2){
    let productToHtml = ''
    data2.forEach(element => {
        productToHtml = productToHtml + `<tr>
        <td>
            ${element.title}
        </td>
        <td>
        ${element.price}
        </td>
        <td>
            <img src=${element.url} alt="">

        </td>
    </tr>`
    })
    document.querySelector('#tbody').innerHTML = productToHtml;
}


socket.on('UPDATE_DATA', (data, data2) =>{
    messages = data;
    products = data2;
    updateMessage(data)
    updateProduct(data2)
});

socket.on('NEW_MESSAGE_FROM_SERVER', (data) =>{
    messages.push(data)
    updateMessage(messages)
});

socket.on('NEW_PRODUCT_FROM_SERVER', (data) =>{
    products.push(data);
    updateProduct(products)
});

