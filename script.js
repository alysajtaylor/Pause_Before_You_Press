// Wait for the HTML to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    const popup = document.getElementById('popup-overlay');
    const popupTitle = document.getElementById('popup-title');
    const popupText = document.getElementById('popup-text');
    const boxes = document.querySelectorAll('.clickBox');

    // Your data for each block
    const boxData = {
        "1": { title: "Block 1", text: "This is the expanded information for the first block. You can add more text or HTML here." },
        "2": { title: "Block 2", text: "This is the expanded information for the second block. You can add more text or HTML here." },
        "3": { title: "Block 3", text: "This is the expanded information for the third block. You can add more text or HTML here." },
        "4": { title: "Block 4", text: "This is the expanded information for the fourth block. You can add more text or HTML here." }
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
});