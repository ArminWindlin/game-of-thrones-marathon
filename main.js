const durations = [
    [62, 56, 58, 56, 55, 53, 58, 59, 57, 53],
    [53, 54, 53, 51, 55, 54, 56, 54, 55, 64],
    [55, 56, 56, 53, 57, 53, 58, 56, 51, 63],
    [58, 52, 57, 55, 53, 51, 51, 52, 51, 56],
    [53, 56, 60, 51, 57, 54, 59, 61, 52, 60],
    [50, 54, 52, 59, 57, 52, 51, 59, 60, 68],
    [59, 59, 63, 50, 59, 70, 80]
];

run();

function run() {
    let durationInPx = durations.map(i => i.map(j => Math.floor(j / 2)));
    let durationPerSeason = [];
    let totalTime;

    // calc duration per season
    for (let i = 0; i < durations.length; i++) {
        durationPerSeason.push(durations[i].reduce((a, b) => a + b, 0));
    }
    totalTime = durationPerSeason.reduce((a, b) => a + b, 0);

    let season = 0;
    for (let i = 0; i < 4; i++) {
        let days = document.getElementsByClassName('day-container');
        for (let j = 0; j < durationInPx[season].length; j++) {
            let episode = document.createElement('DIV');
            episode.setAttribute("style", `min-width: ${durationInPx[season][j] - 1}px; background-color: #09af${(j + 5) * 6}; font-size: 12px`);
            episode.classList.add("episode");
            episode.innerHTML = `S${season + 1}<br>E${j + 1}`;
            days[i].appendChild(episode);
        }
        season++;
        if (i !== 0) {
            for (let j = 0; j < durationInPx[season].length; j++) {
                let episode = document.createElement('DIV');
                episode.setAttribute("style", `min-width: ${durationInPx[season][j] - 1}px; background-color: #53${(j + 8) * 5}e8; font-size: 12px`);
                episode.classList.add("episode");
                episode.innerHTML = `S${season + 1}<br>E${j + 1}`;
                days[i].appendChild(episode);
            }
            season++;
        }
    }

    // calc remaining time
    let sleepElements = document.getElementsByClassName('sleep');
    let sleepMinutes = [];
    sleepMinutes.push((720 - durationInPx[0].reduce((a, b) => a + b, 0)) * 2);
    sleepMinutes.push((720 - (durationInPx[1].reduce((a, b) => a + b, 0) + durationInPx[2].reduce((a, b) => a + b, 0))) * 2);
    sleepMinutes.push((720 - (durationInPx[3].reduce((a, b) => a + b, 0) + durationInPx[4].reduce((a, b) => a + b, 0))) * 2);
    sleepMinutes.push((720 - (durationInPx[5].reduce((a, b) => a + b, 0) + durationInPx[6].reduce((a, b) => a + b, 0))) * 2);
    console.log(sleepMinutes);
    for (let i = 0; i < sleepMinutes.length; i++) {
        sleepElements[i].innerHTML = `${Math.floor(sleepMinutes[i] / 60)}h ${sleepMinutes[i] % 60}min`;
    }

    // get totals
    let totals = "";
    for (let i = 0; i < durationPerSeason.length; i++) {
        totals += `Season ${i + 1}: ${Math.floor(durationPerSeason[i] / 60)}h ${durationPerSeason[i] % 60}min<br>`;
    }
    totals += `<br>Total: ${Math.floor(totalTime / 60)}h ${totalTime % 60}min`;
    document.getElementById('totals').innerHTML = totals;
}