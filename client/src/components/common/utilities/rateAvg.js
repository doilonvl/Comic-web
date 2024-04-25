const rateAvg = (rateStories) => {  
    let avgRate = 0;
    if (rateStories.length >= 1) {
        let totalRate = rateStories.reduce((accumulator, rateStory) => {
            accumulator += parseInt(rateStory.rateNo);
            return accumulator;
        }, 0);
        avgRate = totalRate / rateStories.length;
    } 
    return parseFloat(avgRate.toFixed(1));
}

export default rateAvg;