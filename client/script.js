import bot from './assets/AI.png'
import user from './assets/f-user.png'


const chatContainer = document.querySelector('#chat-container');
const message = document.querySelector('#message');
const form = document.querySelector('form');
let themeToggle = document.querySelector('#theme-toggler')
let reset = document.querySelector('.reset')
let menu = document.querySelector('#menu-btn')
let header = document.querySelector('.header')
let resetbtn = document.querySelector('.reset-btn')
let del = document.querySelector('#starter')

// responsive hamburger menu 
menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times')
    header.classList.toggle('active')
})


themeToggle.addEventListener('click', () => {
    themeToggle.classList.toggle('fa-sun')
    themeToggle.classList.toggle('fa-moon')
    if(themeToggle.classList.contains('fa-sun')) 
    {
        document.body.classList.add('active')
    }
    else 
    {
        document.body.classList.remove('active')
    }
})

// makes ai write letter by letter
function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, .5)
}// necessary for typing text effect for that specific reply
// makes ai write letter by letter

let messages = []

message.addEventListener('keyup', e => {
    message.style.height = 'auto'

    let scHeight = e.target.scrollHeight;
    message.style.height = `${scHeight}px`
})

localStorage.setItem('delValue', del.innerHTML);

const delValue = localStorage.getItem('delValue');
if (delValue) {
  del.innerHTML = delValue;
}


const handleSubmit = async (e) => {

    e.preventDefault()

    const loadingElement = document.querySelector('#loading');
    loadingElement.style.display = 'block';

    message.style.height = 'auto'
    del.innerHTML = '';
    const messageText = message.value;
    const newMessage = {"role": "user", "content": `${messageText}`}
    messages.push(newMessage)
    message.value = ''
    
    const messageElement = document.createElement('div')
    messageElement.classList.add('message')
    messageElement.classList.add('message-sent')
    messageElement.innerHTML = `
    <img src=${user} class='profile'/><div class='message-text user'>${messageText}</div>`
    chatContainer.appendChild(messageElement)
    chatContainer.scrollTo(-1000, chatContainer.scrollHeight)

 
    const response = await fetch('https://chat-ai-cohort-2-0.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages
        })
    })
    // clearInterval(loadInterval)

    .then(res => res.json())
    .then(data => {
        let newAssistantMessage = {"role": "user", "content": `${data.completion.content}`}
        messages.push(newAssistantMessage)
        const messageElement = document.createElement('div')
        messageElement.classList.add('message')
        messageElement.classList.add('message-received')
        const parsedData = data.completion.content.trim()
        messageElement.innerHTML = `<img src=${bot} class='profile ai'/><div class='message-text' id='ai_id'></div>`
        chatContainer.appendChild(messageElement)
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        typeText(messageElement, parsedData)
        loadingElement.style.display = 'none';
    })
}

reset.addEventListener('click', () => {
    chatContainer.innerHTML = ''
    const delValue = localStorage.getItem('delValue');
    if (delValue) {
        del.innerHTML = delValue;
    }    
})

resetbtn.addEventListener('click', () => {
    chatContainer.innerHTML = ''
    const delValue = localStorage.getItem('delValue');
    if (delValue) {
        del.innerHTML = delValue;
    }    
})

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})

const scrollBtn = document.getElementById("scrollBtn");
const bottomDiv = document.getElementById("bottom");

scrollBtn.addEventListener("click", () => {
  if (window.scrollY === document.body.scrollHeight - window.innerHeight) {
    return; // Don't scroll if already at the bottom
  }
  bottomDiv.scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  if (window.scrollY === document.body.scrollHeight - window.innerHeight) {
    scrollBtn.style.display = "none"; // Hide scroll button if already at the bottom
  } else {
    scrollBtn.style.display = "block";
  }
});