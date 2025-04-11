async function search() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const results = document.getElementById("results");
    results.innerHTML = '';

    const response = await fetch('travel_recommendation_api.json');
    const data = await response.json();

    let matched = [];

    if (input.includes("beach")) {
        matched = data.beaches;
    } else if (input.includes("temple")) {
        matched = data.temples;
    } else {
        matched = data.countries.filter(c => input.includes(c.name.toLowerCase()))
            .flatMap(c => c.cities);
    }

    if (matched.length === 0) {
        results.innerHTML = "<p>No recommendations found.</p>";
        return;
    }

    matched.forEach(item => {
        const card = document.createElement("div");
        card.className = "result-card";

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;
        results.appendChild(card);
    });
}

function clearResults() {
    document.getElementById("searchInput").value = '';
    document.getElementById("results").innerHTML = '';
}

function showTimeInTimeZone(timeZone) {
    const options = {
        timeZone,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const time = new Date().toLocaleTimeString('en-US', options);
    console.log("Current time:", time);
}
