function calculateModifier(score) {
    return Math.floor((score - 10) / 2);
}

function updateModifier(stat) {
    let value = document.getElementById(stat).value;
    let mod = calculateModifier(value || 0);

    document.getElementById(stat + "_mod").innerText = mod >= 0 ? "+" + mod : mod;
}

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

    localStorage.setItem("dndCharacter", JSON.stringify(character));

    alert("Character Saved!");
}

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
