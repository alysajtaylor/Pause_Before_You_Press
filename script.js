// Wait for the HTML to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    const popup = document.getElementById('popup-overlay');
    const popupTitle = document.getElementById('popup-title');
    const popupText = document.getElementById('popup-text');
    const boxes = document.querySelectorAll('.clickBox');

    // Your data for each block
    const boxData = {
        "1": { 
            title: "The Pause Method", 
            text: "<p style='text-align: left; font-size: 1.5rem;'><strong>The Pause Method:</strong> Most scams rely on creating a sense of urgency or fear. If a message demands immediate action, take a breath and pause. It's likely a scam.</p>" +
            "<p style='text-align: left; line-height: 1.5;'><strong>Examples:</strong></p>" +
            "<ul style='text-align: left; line-height: 1.5; font-size: 1.5rem;'>" +
            "<li>'&#39;I know what you've been doing and I am going to turn you in unless you send me $1500 by midnight tonight&#39;'</li>" +
            "<li>'&#39;Your account will be closed in 1 hour&#39;'</li>" +
            "</ul>"
        },
        "2": { 
            title: "The SLAM Method", 
            text: "<p style='font-size: 1.5rem;'>Use the <strong>SLAM</strong> method to check for red flags before clicking:</p>" +
                  "<ul style='text-align: left; line-height: 1.5; font-size: 1.5rem; '>" +
                  "<li><strong>S - Sender:</strong> Does the email address look official? (ex: support@amazon.com vs amazon-support@gmail.com)</li>" +
                  "<li><strong>L - Links:</strong> Hover your mouse over links to see the real destination before clicking.</li>" +
                  "<li><strong>A - Attachments:</strong> Never open unexpected attachments.</li>" +
                  "<li><strong>M - Message:</strong> Look for spelling errors and generic greetings. </li>" +
                  "<p style= 'text-align: left; font-size: 1.5rem; color: #5ca9e8;'>Note: some advanced scams may use your real name if your data was sold online.</p>" +
                  "</ul>"
        }
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
            fakeText: "Dear Customer, your Bank Account has been LOCKED due to suspicious activity. Click here IMMEDIATELY to log in and verify your identity.",
            realText: "Your monthly bank statement for the account ending in 1234 is now available. Log in securely at your bank's website to view it.",
            explanation: "Banks will never send a link asking you to log in to unlock an account. If you are worried, close the message and type your bank's real website into your browser directly."
        },
        // S - SENDER 
        {
            fakeText: "From: customer-support@amazon-help-desk.gmail.com\n\nYour recent order of $1,499.00 has shipped. If you did not make this purchase, call us immediately.",
            realText: "From: order-update@amazon.com\n\nYour package is arriving today! Track your delivery on our website.",
            explanation: "S is for SENDER: Look closely at the email address, not just the name! Real companies do not use '@gmail.com' addresses, and scammers often add extra words like 'help-desk' to look official."
        },
        
        // L - LINKS
        {
            fakeText: "Netflix: Your payment failed. Please update your billing information immediately to avoid account suspension: http://netflix.billing-update-now.com/login",
            realText: "Netflix: We were unable to process your last payment. Please log in to your account at www.netflix.com to update your payment method.",
            explanation: "L is for LINKS: Always check the URL! The fake link has 'netflix' in it, but the actual website it goes to is 'billing-update-now.com'. Never click links in unexpected texts."
        
        },
                {
            fakeText: "Grandma, I am in trouble and need help. I lost my phone, this is my friend's number. Please buy 3 Apple Gift cards and send me the codes.",
            realText: "Hey Grandma! Just wanted to let you know I made it home safe. Talk to you tomorrow!",
            explanation: "This is the 'Grandchild Scam.' Real emergencies rarely ask for payment in Gift Cards. Always call their real phone number to verify!"
        },

        // A - ATTACHMENTS
        {
            fakeText: "Subject: OVERDUE INVOICE #9982\n\nPlease find the attached document (Invoice_9982.zip) for your outstanding balance. Immediate payment is required.",
            realText: "Subject: Your Monthly Statement is Ready\n\nYour statement for this month is now available. Log in securely to your online banking app to view it.",
            explanation: "A is for ATTACHMENTS: Scammers use unexpected attachments (especially .zip files or Word documents) to hide computer viruses. Never open an unexpected attachment, even if it looks like an invoice."
        },

        // M - MESSAGE
        {
            fakeText: "Dear Valued Customer, Kindly be informed that your account has been compromised. You must provide your password to verify your identity.",
            realText: "Dear Susan, We noticed a login from a new device. If this was you, you can ignore this email. If not, please reset your password.",
            explanation: "M is for MESSAGE: Scammers often use generic greetings ('Dear Customer') instead of your real name. They also frequently have poor grammar ('Kindly be informed') and ask for passwords, which legitimate companies will never do."
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