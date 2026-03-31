// Teams and logos
const teams = {

    "Mumbai Indians": "logos/mi.png",
    "Chennai Super Kings": "logos/csk.png",
    "Royal Challengers Bengaluru": "logos/rcb.png",
    "Kolkata Knight Riders": "logos/kkr.png",
    "Rajasthan Royals": "logos/rr.png",
    "Punjab Kings": "logos/pk.png",
    "Delhi Capitals": "logos/dc.png",
    "Lucknow Super Giants": "logos/lsg.png"

};

// Team strengths
const teamStrength = {
    "Mumbai Indians": 90,
    "Chennai Super Kings": 99,
    "Royal Challengers Bengaluru": 70,
    "Kolkata Knight Riders": 75,
    "Rajasthan Royals": 70,
    "Punjab Kings": 65,
    "Delhi Capitals": 60,
    "Lucknow Super Giants": 55
};

// Populate dropdowns
const team1Select = document.getElementById('team1');
const team2Select = document.getElementById('team2');

for (let team in teams) {
    const option1 = document.createElement('option');
    option1.value = team;
    option1.text = team;
    team1Select.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = team;
    option2.text = team;
    team2Select.appendChild(option2);
}

// Prediction function
function predictWinner(team1, team2) {
    const t1 = teamStrength[team1] || 50;
    const t2 = teamStrength[team2] || 50;

    const total = t1 + t2;
    const prob1 = ((t1 / total) * 100).toFixed(1);
    const prob2 = ((t2 / total) * 100).toFixed(1);

    const winner = t1 >= t2 ? team1 : team2;
    return { winner, prob1, prob2 };
}

// Button click
document.getElementById('predictBtn').addEventListener('click', () => {
    const team1 = team1Select.value;
    const team2 = team2Select.value;

    if (team1 === team2) {
        alert("Select two different teams!");
        return;
    }

    const result = predictWinner(team1, team2);
    const container = document.getElementById('result-container');
    container.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'match-card';
    card.innerHTML = `
        <div class="team ${result.winner === team1 ? 'winner' : 'loser'}">
            <img src="${teams[team1]}" alt="${team1}">
            <span>${team1}</span>
        </div>
        <div class="vs">VS</div>
        <div class="team ${result.winner === team2 ? 'winner' : 'loser'}">
            <img src="${teams[team2]}" alt="${team2}">
            <span>${team2}</span>
        </div>
        <div class="probabilities">
            ${team1}: ${result.prob1}% <br>
            ${team2}: ${result.prob2}%
        </div>
    `;
    container.appendChild(card);
});