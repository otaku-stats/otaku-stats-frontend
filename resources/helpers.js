export const generateRandomHexColor = () => {
    return '#'+ Math.floor(Math.random()*16777215).toString(16);
};

// given a date object or string, return Date as "Month year" i.e. "Feb 2019"
export const humanizeDate = (date) => {
    let dateObj = date;

    if (typeof date === 'string') {
        dateObj = new Date(date);
    }

    return dateObj.toLocaleDateString("en-US", { year: 'numeric', month: 'short' });
};

// returns an array of ints between the start and end, i.e.
// range(1,4) -> [1,2,3,4]
// reference: https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
export const range = (start, end) => {
    if (start === end) {

        return [start];
    }

    return [start, ...range(start + 1, end)];
};

// calculate how large a chart should be given the percentage of the page we want it to take up
export const calculateChartWidth = (fractionOfPage) => {
    // add a little buffer for margin/padding/scrollbar
    const buffer = 50;
    const totalWidth = window.innerWidth;

    return totalWidth >= 1024 ? (totalWidth * fractionOfPage) - (.87*buffer) : totalWidth - buffer;
};