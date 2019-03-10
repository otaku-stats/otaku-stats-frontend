export const graphColors = [
    "#1A535C",
    "#4ECDC4",
    "#FF69B4", // hotpink
    "#746BD3",
    "#AD3A90",
    "#F3B3A6",
    "#49516F",
    "#FF6B6B",
    "#8EA4D2",
    "#41562F",
    "#BDE4A7",
];

export const generateRandomHexColor = () => {
    return '#'+ Math.floor(Math.random()*16777215).toString(16);
};