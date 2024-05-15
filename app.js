const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector ('.navbar__menu')

// Display Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

document.getElementById('feedingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let aspirates = parseFloat(document.getElementById('aspirates').value);
    let milkFeeds = parseFloat(document.getElementById('milkFeeds').value);
    let waterFlushes = parseFloat(document.getElementById('waterFlushes').value);
    let previousAspirates = document.querySelector('input[name="previousAspirates"]:checked').value;

    let result = calculateFeedDecision(aspirates, milkFeeds, waterFlushes, previousAspirates);

    document.getElementById('milkOutput').innerText = `Milk Feeds: ${result.milkFeeds} ml`;
    document.getElementById('waterFlushesOutput').innerText = `Water Flushes: ${result.waterFlushes} ml`;
    document.getElementById('aspiratesOutput').innerText = `Aspirates to Feed Back: ${result.aspiratesFeedBack} ml`;
});

function calculateFeedDecision(x, y, z, previousAspirates) {
    let decision = {
        milkFeeds: 0,
        waterFlushes: 0,
        aspiratesFeedBack: 0,
        message: ""
    };

    if (x > 500) {
        decision.message = "Do not feed";
    } else if (200 < x && x < 500) {
        if (previousAspirates === 'yes') {
            let calculatedValue = 350 - (1 / 2 * y + z);
            decision.milkFeeds = 1 / 2 * y;
            decision.waterFlushes = z;
            decision.aspiratesFeedBack = Math.min(x, calculatedValue);
            decision.message = "Feed 1/2 Milk Feeds and All Water Flushes, team consider prokinetics";
        } else if (previousAspirates === 'no') {
            decision.message = "Do not feed";
        }
    } else if (x < 200) {
        let calculatedValue = 350 - (y + z);
        decision.milkFeeds = y;
        decision.waterFlushes = z;
        decision.aspiratesFeedBack = Math.min(x, calculatedValue);
        decision.message = "Feed All Milk Feeds and All Water Flushes";
    } else if (x === 200) {
        let calculatedValue = 350 - (y + z);
        decision.milkFeeds = y;
        decision.waterFlushes = z;
        decision.aspiratesFeedBack = Math.min(x, calculatedValue);
        decision.message = "Feed All Milk Feeds and All Water Flushes";
    }

    return decision;
}

function calculateFeedDecisionForColumns(xRange, yRange, zRange, feedingCountRange) {
    let result = [];
    for (let i = 0; i < xRange.length; i++) {
        result.push([calculateFeedDecision(xRange[i][0], yRange[i][0], zRange[i][0], feedingCountRange[i][0])]);
    }
    return result;
}

