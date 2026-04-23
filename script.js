function calculateModifier(score) {
    return Math.floor((score - 10) / 2);
}

function updateModifier(stat) {
    let value = document.getElementById(stat).value;
    let mod = calculateModifier(value || 0);

    document.getElementById(stat + "_mod").innerText =
        mod >= 0 ? "+" + mod : mod;
}

/*
🎲 Roll 4d6 and drop the lowest
*/
function rollStat() {
    let rolls = [];

    for (let i = 0; i < 4; i++) {
        rolls.push(Math.floor(Math.random() * 6) + 1);
    }

    rolls.sort((a, b) => a - b); // smallest first
    rolls.shift(); // remove lowest

    let total = rolls.reduce((sum, val) => sum + val, 0);

    return total;
}

/*
🎲 Assign rolled value to a stat
*/
function rollForStat(stat) {
    const value = rollStat();

    document.getElementById(stat).value = value;
    updateModifier(stat);
}

/*
💾 Save Character
*/
function saveCharacter() {
    const character = {
        name: document.getElementById("name").value,
        class: document.getElementById("class").value,
        race: document.getElementById("race").value,
        level: document.getElementById("level").value,

        stats: {
            str: document.getElementById("str").value,
            dex: document.getElementById("dex").value,
            con: document.getElementById("con").value,
            int: document.getElementById("int").value,
            wis: document.getElementById("wis").value,
            cha: document.getElementById("cha").value
        }
    };

    if (!character.class || !character.race || !character.level) {
        alert("Please select Class, Race, and Level.");
        return;
    }

    localStorage.setItem("dndCharacter", JSON.stringify(character));
    alert("Character Saved!");
}

/*
📂 Load Character
*/
function loadCharacter() {
    const data = localStorage.getItem("dndCharacter");

    if (!data) return;

    const character = JSON.parse(data);

    document.getElementById("name").value = character.name;
    document.getElementById("class").value = character.class;
    document.getElementById("race").value = character.race;
    document.getElementById("level").value = character.level;

    for (let stat in character.stats) {
        document.getElementById(stat).value = character.stats[stat];
        updateModifier(stat);
    }
}

window.onload = loadCharacter;
function resetCharacter() {
    localStorage.removeItem("dndCharacter");

    document.querySelectorAll("input").forEach(input => input.value = "");

    const mods = document.querySelectorAll("span[id$='_mod']");
    mods.forEach(mod => mod.innerText = "0");

    alert("Character Reset!");
}
