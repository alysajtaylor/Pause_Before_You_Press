// Wait for the HTML to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    const popup = document.getElementById('popup-overlay');
    const popupTitle = document.getElementById('popup-title');
    const popupText = document.getElementById('popup-text');
    const boxes = document.querySelectorAll('.clickBox');

    // Your data for each block
    const boxData = {
        "1": { title: "Scam Prevention: Pause", text: "Pause Method: Most scams rely on creating a sense of urgency or fear (e.g., 'Your account will be closed in 1 hour'). If a message demands immediate action, it's likely a scam." },
        "2": { title: "Use AI to find solutions", text: "AI is a wonderful tool that can help troubleshoot problems with technology when help is unavailable. " +
             "The best prompts ask direct questions providing relevant information." },
    };

    // Open the popup when a box is clicked
    if (popup && boxes.length > 0) {
        boxes.forEach(box => {
            box.addEventListener('click', function() {
                // Get the number from the data-block attribute
                const blockNumber = this.getAttribute('data-block');
                
                // Inject the correct text into the popup
                if (boxData[blockNumber]) {
                    popupTitle.innerHTML = boxData[blockNumber].title;
                    popupText.innerHTML = boxData[blockNumber].text;
                }

                // Display the overlay
                popup.style.display = 'flex'; 
            });
        });

        // Close the popup when clicking anywhere on the overlay
        popup.addEventListener('click', function() {
            popup.style.display = 'none'; 
        });
    }
    // simulated AI chat
    const chatWindow = document.getElementById('chat-window');
    const optionButtons = document.querySelectorAll('.chat-option');

    // Function to add a message to the chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        
        if (sender === 'user') {
            messageDiv.classList.add('user-message');
        } else {
            messageDiv.classList.add('ai-message');
        }
        
        messageDiv.innerHTML = text; // Using innerHTML so we can include line breaks (<br>)
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Detailed responses for each button topic
    const aiResponses = {
        "prompting": "To get the best results from AI, be specific! <br><br>Instead of saying 'fix my computer', try giving it context and a role: 'Act as an IT expert. My Windows 10 computer is showing a blue screen with the error code 0x000000. What are the first three troubleshooting steps I should take?'",
        
        "router": "Resetting a router is a great first step for internet issues. <br><br>1. Unplug the power cable from the back of the router.<br>2. Wait for exactly 30 seconds (this allows the memory to fully clear).<br>3. Plug it back in and wait 2-3 minutes for all the lights to turn solid green again.",
        
        "password": "Great question! The modern standard for passwords is a 'Passphrase'. <br><br>Instead of a short, complex password (like 'Xy7!pQ'), use 3-4 random words stringed together with a number and symbol (like 'BlueHorse!Staple99'). It is much harder for a computer to hack, but much easier for you to remember!"
    };

    // Attach click events to each button
    if (optionButtons.length > 0) {
        optionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 1. Get the text of the button the user clicked and show it
                const userQuestion = this.innerText;
                addMessage(userQuestion, 'user');

                // 2. Temporarily disable all buttons so they can't spam clicks
                optionButtons.forEach(btn => btn.disabled = true);

                // 3. Figure out which topic they clicked using the data-topic attribute
                const topic = this.getAttribute('data-topic');
                const aiReply = aiResponses[topic]

                // 4. Simulate a delay before the AI answers
                setTimeout(() => {
                    addMessage(aiReply, 'ai');
                    
                    // Re-enable the buttons after the AI replies
                    optionButtons.forEach(btn => btn.disabled = false);
                }, 1200); // 1.2 second delay
            });
        });
    }
});