const apiKey = "UiVoPkv3DB3h5RotgcfAkBAAPdFTuL0dHigNbXpk";
const searchBtn = document.getElementById('search-btn');
const dateInput = document.getElementById('date-input');

// 1. Function to get today's date in YYYY-MM-DD
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

// 2. Lock the calendar so users can't pick future dates
dateInput.max = getTodayDate();

async function getNASAData() {
    // FIX: Removed 'selectedDate' and used the input value or today's date
    const date = dateInput.value || getTodayDate();
    const today = getTodayDate();

    // Future Date Validation
    if (date > today) {
        alert("Patience, traveler! NASA hasn't reached that day yet.");
        return;
    }

    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            document.getElementById('space-img').src = data.url;
            document.getElementById('title').innerText = data.title;
            document.getElementById('description').innerText = data.explanation;
        } else {
            console.error("NASA API Error:", data.msg);
        }
    } catch (error) {
        console.error("Connection error:", error);
    }
}

// 3. Runs immediately when page loads to show today's photo
getNASAData();

// 4. Runs when the button is clicked
searchBtn.addEventListener('click', getNASAData);