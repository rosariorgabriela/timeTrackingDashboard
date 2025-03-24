document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".stats-button");
    let timeData = {};    // stores JSON data


    // fetch JSON data
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            timeData = data;
            updateUI("daily");   // set default view to "Daily"

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const timeFrame = button.getAttribute("data-timeframe");
                updateUI(timeFrame);
            });
        });
    })

        function updateUI(timeFrame) {
            document.querySelectorAll(".card").forEach(card => {
                const title = card.getAttribute("data-title");
                const activity = timeData.find(item => item.title === title);

                if (activity) {
                    const timeFrameData = activity.timeframes[timeFrame];
                    const current = timeFrameData.current;
                    const previous = timeFrameData.previous;

                    let previousLabel = "";
                    switch (timeFrame) {
                        case "daily":
                            previousLabel = "Yesterday";
                            break;
                        case "weekly":
                            previousLabel = "Last Week";
                            break;
                        case "monthly":
                            previousLabel = "Last Month";
                            break;
                    }

                    card.querySelector(".current-hours").textContent = `${current}hrs`;
                    card.querySelector(".previous-hours").textContent = `${previousLabel} - ${previous}hrs`;
                }
            });
        }
    });


//new activity card modal
    document.getElementById("add-card-btn").addEventListener("click", () => {
        document.getElementById("add-activity-modal").style.display = "block";
      });
      
      document.getElementById("close-modal").addEventListener("click", () => {
        document.getElementById("add-activity-modal").style.display = "none";
      });
      
      document.getElementById("submit-activity").addEventListener("click", () => {
        const name = document.getElementById("activity-name").value;
        const hours = document.getElementById("activity-hours").value;
        if (name && hours) {
            // create new card element
            const newCard = document.createElement("div");
            newCard.classList.add("card");

            newCard.classList.add(name.toLowerCase() + "-card");
            
            // add title to new card
            newCard.setAttribute("data-title", name);

            // Set the inner HTML for the new card
        newCard.innerHTML = `
        <div class="card-header">
            <div class="header-bg"></div>
        </div>
        <div class="overlay">
            <p class="activity-name">${name}</p>
            <div class="time">
                <span class="current-hours">${hours}hrs</span><br>
                <span class="previous-hours">Last Week - 0hrs</span>
            </div>
        </div>
    `;

    // apply background color dynamically
    const headerBg = newCard.querySelector(".header-bg");
    headerBg.style.backgroundColor = getRandomColor();

    function getRandomColor() {
        const colors = ["hsl(15, 100%, 70%)", "hsl(195, 74%, 62%)", "hsl(348, 100%, 68%)", "hsl(145, 58%, 55%)", "hsl(264, 64%, 52%)", "hsl(43, 84%, 65%)"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // append the new card to the grid container
    document.querySelector(".grid-container").appendChild(newCard);

    // clear the input fields
    document.getElementById("activity-name").value = "";
    document.getElementById("activity-hours").value = "";

    // close the modal
    document.getElementById("add-activity-modal").style.display = "none";
} else {
    alert("Please fill in both fields.");
}
  }
);