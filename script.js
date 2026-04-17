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

    // --- Scam Quiz Logic ---
    const quizOptionsArea = document.getElementById('quiz-options-area');
    const quizFeedback = document.getElementById('quiz-feedback');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');
    const nextQuizBtn = document.getElementById('next-quiz-btn');

    // Our database of scam scenarios
    const quizScenarios = [
        {
            fakeText: "URGENT: Your USPS package is stuck at the depot. Click link to pay $1.99 redelivery fee: http://usps-post-alert-help.com",
            realText: "USPS Tracking: Package 9400123... was delivered in or at the mailbox at 2:30 PM.",
            explanation: "Scammers create fake urgency ('URGENT', 'stuck') and ask for small fees. Notice the strange web link that doesn't just say 'usps.com'."
        },
        {
            fakeText: "Grandma, I am in trouble and need help. I lost my phone, this is my friend's number. Please buy 3 Apple Gift cards and send me the codes.",
            realText: "Hey Grandma! Just wanted to let you know I made it home safe. Talk to you tomorrow!",
            explanation: "This is the 'Grandchild Scam.' Real emergencies rarely ask for payment in Gift Cards. Always call their real phone number to verify!"
        },
        {
            fakeText: "Dear Customer, your Bank Account has been LOCKED due to suspicious activity. Click here IMMEDIATELY to log in and verify your identity.",
            realText: "Your monthly bank statement for the account ending in 1234 is now available. Log in securely at your bank's website to view it.",
            explanation: "Banks will never send a link asking you to log in to unlock an account. If you are worried, close the message and type your bank's real website into your browser directly."
        }
    ];

    let currentScenarioIndex = 0;

    function loadQuiz() {
        // Hide feedback and clear old options
        quizFeedback.style.display = 'none';
        quizOptionsArea.innerHTML = '';
        
        const scenario = quizScenarios[currentScenarioIndex];

        // Create the two clickable cards
        const fakeCard = document.createElement('div');
        fakeCard.className = 'quiz-card';
        fakeCard.innerText = scenario.fakeText;
        fakeCard.onclick = () => handleGuess(true, scenario.explanation);

        const realCard = document.createElement('div');
        realCard.className = 'quiz-card';
        realCard.innerText = scenario.realText;
        realCard.onclick = () => handleGuess(false, scenario.explanation);

        // Randomly decide which card goes on the left vs right
        if (Math.random() > 0.5) {
            quizOptionsArea.appendChild(fakeCard);
            quizOptionsArea.appendChild(realCard);
        } else {
            quizOptionsArea.appendChild(realCard);
            quizOptionsArea.appendChild(fakeCard);
        }
    }

    function handleGuess(isCorrect, explanation) {
        quizOptionsArea.innerHTML = ''; // Clear the cards so they have to read the feedback
        quizFeedback.style.display = 'block';

        if (isCorrect) {
            quizFeedback.className = 'quiz-feedback feedback-success';
            feedbackTitle.innerText = "Correct! That was a scam.";
        } else {
            quizFeedback.className = 'quiz-feedback feedback-error';
            feedbackTitle.innerText = "Oops! You clicked the real message.";
        }

        feedbackText.innerText = explanation;
    }

    // Handle clicking the "Try Another Scenario" button
    if (nextQuizBtn) {
        nextQuizBtn.addEventListener('click', () => {
            currentScenarioIndex++;
            // If we run out of scenarios, loop back to the beginning
            if (currentScenarioIndex >= quizScenarios.length) {
                currentScenarioIndex = 0;
            }
            loadQuiz();
        });
    }

    // Start the first quiz when the page loads
    if (quizOptionsArea) {
        loadQuiz();
    }


    // simulated AI chat
    const chatWindow = document.getElementById('chat-window');
    const optionButtons = document.querySelectorAll('.chat-option');

});