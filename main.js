const durations = [
    [62, 56, 58, 56, 55, 53, 58, 59, 57, 53],
    [53, 54, 53, 51, 55, 54, 56, 54, 55, 64],
    [55, 56, 56, 53, 57, 53, 58, 56, 51, 63],
    [58, 52, 57, 55, 53, 51, 51, 52, 51, 56],
    [53, 56, 60, 51, 57, 54, 59, 61, 52, 60],
    [50, 54, 52, 59, 57, 52, 51, 59, 60, 68],
    [59, 59, 63, 50, 59, 70, 80]
];

let durationInPx = durations.map(i => i.map(j => Math.floor(j / 2)));
let durationsFlattend = [];
durationInPx.forEach(i => i.forEach(j => durationsFlattend.push(j)));
let epidodesPerDay = [14, 14, 13, 13, 13];
let epidodesPerDayTemp = [14, 14, 13, 13, 13];

let durationPerSeason = [];
let totalTime;

generate();
totals();

function generate() {
    let season = 1;
    let episodeCount = 1;
    let days = document.getElementsByClassName('day-container');
    let dayCount = 0;

    // calc starts and ends
    let index1 = -1;
    let startsPerDay = epidodesPerDay.map(e => {
        index1++;
        return epidodesPerDay.slice(0, index1).reduce((a, b) => a + b, 0);
    })
    let index2 = 0;
    let endsPerDay = epidodesPerDay.map(e => {
        index2++;
        return epidodesPerDay.slice(0, index2).reduce((a, b) => a + b, 0);
    })

    // reset
    for (let i = 0; i < days.length; i++) {
        days[i].innerHTML = '';
        let sleep = document.createElement('DIV');
        sleep.classList.add('sleep');
        days[i].appendChild(sleep);
        for (let i = 0; i < epidodesPerDayTemp.length; i++) {
            epidodesPerDayTemp[i] = epidodesPerDay[i];
        }
    }

    for (let j = 1; j < durationsFlattend.length + 1; j++) {
        let episode = document.createElement('DIV');
        episode.setAttribute("style", `min-width: ${durationsFlattend[j - 1] - 1}px; background-color: rgb(${season * 25},${season * 25},150); font-size: 12px`);
        episode.classList.add("episode");
        episode.innerHTML = `S${season}<br>E${episodeCount}`;
        days[dayCount].appendChild(episode);
        epidodesPerDayTemp[dayCount]--;
        episodeCount++;
        if (epidodesPerDayTemp[dayCount] === 0) {
            epidodesPerDayTemp[dayCount] = epidodesPerDay[dayCount];
            dayCount++;
        }
        if (dayCount > 4)
            break;
        if (j % 10 == 0 && j != 0) {
            season++;
            episodeCount = 1;
        }
    }

    // calc remaining time
    let sleepElements = document.getElementsByClassName('sleep');
    let sleepMinutes = [];
    for (let i = 0; i < days.length; i++) {
        sleepMinutes.push(1440 - durationsFlattend.slice(startsPerDay[i], endsPerDay[i]).reduce((a, b) => a + b, 0) * 2);
        sleepElements[i].innerHTML = `${Math.floor(sleepMinutes[i] / 60)}h ${sleepMinutes[i] % 60}min`;
    }

}

function totals() {
    // calc totals
    for (let i = 0; i < durations.length; i++) {
        durationPerSeason.push(durations[i].reduce((a, b) => a + b, 0));
    }
    totalTime = durationPerSeason.reduce((a, b) => a + b, 0);

    // get totals
    let totals = "";
    for (let i = 0; i < durationPerSeason.length; i++) {
        totals += `Season ${i + 1}: ${Math.floor(durationPerSeason[i] / 60)}h ${durationPerSeason[i] % 60}min<br>`;
    }
    totals += `<br>Total: ${Math.floor(totalTime / 60)}h ${totalTime % 60}min`;
    document.getElementById('totals').innerHTML = totals;
}

// move episodes
let up = document.getElementsByClassName('up');
for (let i = 0; i < up.length; i++) {
    up[i].addEventListener('click', () => {
            if (epidodesPerDay[i + 1] == 1 || epidodesPerDay[i] == 20) {
                alert('Stop it dude! I wanna sleep at least 5 hours and watch at least 1 episode a day!');
                return;
            }
            epidodesPerDay[i]++;
            epidodesPerDay[i + 1]--;
            generate();
        }
    );
}
let down = document.getElementsByClassName('down');
for (let i = 0; i < down.length; i++) {
    down[i].addEventListener('click', () => {
            if (epidodesPerDay[i] == 1 || epidodesPerDay[i + 1] == 20) {
                alert('Stop it dude! I wanna sleep at least 5 hours and watch at least 1 episode a day!');
                return;
            }
            epidodesPerDay[i]--;
            epidodesPerDay[i + 1]++;
            generate();
        }
    );
}