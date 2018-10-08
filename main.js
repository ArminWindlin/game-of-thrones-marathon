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

    // calc duration per season
    for (let i = 0; i < durations.length; i++) {
        let total = 0;
        for (let j = 0; j < durations[i].length; j++) {
            total += durations[i][j];
        }
        console.log("Season " + (i + 1) + ": " + total + " min");
    }

    let season = 0;
    for (let i = 0; i < 4; i++) {
        let days = document.getElementsByClassName('day-container');
        for (let j = 0; j < durationInPx[season].length; j++) {
            let episode = document.createElement('DIV');
            episode.setAttribute("style", `min-width: ${durationInPx[season][j] - 1}px`);
            episode.classList.add("episode");
            days[i].appendChild(episode);
        }
        season++;
        if (i !== 0) {
            for (let j = 0; j < durationInPx[season].length; j++) {
                let episode = document.createElement('DIV');
                episode.setAttribute("style", `min-width: ${durationInPx[season][j] - 1}px`);
                episode.classList.add("episode");
                days[i].appendChild(episode);
            }
            season++;
        }
    }

    //calc remaining time
    let sleeps = document.getElementsByClassName('sleep');
    sleeps[0].innerHTML = (720 - durationInPx[0].reduce((a, b) => a + b, 0)) * 2 / 60;
    sleeps[1].innerHTML = (720 - (durationInPx[1].reduce((a, b) => a + b, 0) + durationInPx[2].reduce((a, b) => a + b, 0))) * 2 / 60;
    sleeps[2].innerHTML = (720 - (durationInPx[3].reduce((a, b) => a + b, 0) + durationInPx[4].reduce((a, b) => a + b, 0))) * 2 / 60;
    sleeps[3].innerHTML = (720 - (durationInPx[5].reduce((a, b) => a + b, 0) + durationInPx[6].reduce((a, b) => a + b, 0))) * 2 / 60;


}