//Referrence for sorting the map values
//https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript/25500461

let tb;

let leftMargin = 150;
let topMargin = 70;
let year;
let players = [];

function preload() {
    tb = loadTable("baseball.csv", "csv", "header");
}

let tempMap = {};

function setup(){
    createCanvas(window.innerWidth,window.innerHeight);

    tb.rows.forEach(i => {
        if(!(i.obj["year"] in tempMap))
            tempMap[i.obj["year"]] = {};
        tempMap[i.obj["year"]][i.obj["name"]] = i.obj["hr"];
    });

    year = 0;

    tb.rows.forEach(i => {
        if(i.obj["year"] == 0)
            players.push(i.obj["name"]);
    });

    print("Players : ",players);
    frameRate(2);

    //To check if map is successfully loaded or not
    print("length : ",tempMap);
}

function draw() {
    background(220);
    fill(0);

    //Heading of the plot
    textSize(25);
    text("Number of homeruns by players in years",window.innerWidth/2-300,topMargin - 20);
    textSize(12);

    // plotting x-axis year line
    line(leftMargin,topMargin + 30, leftMargin + 920, topMargin + 30);
    for(let i = 0;i<24;i++){
        text(i,leftMargin + (40*i) - 5,topMargin + 20);
    }


    textSize(17);
    text("Number of homeruns in year "+year,leftMargin + 350,topMargin + 70);
    textSize(12);

    //x-axis
    textAlign(CENTER);
    for(let k=0;k<17;k++){
        text(50*k,leftMargin + 60 + (50*k),topMargin + 90);
        line(leftMargin + 60 + (50*k),topMargin + 95, leftMargin + 60 + (50*k), topMargin + 105);
    }

    line(leftMargin + 60,topMargin + 100, leftMargin + 860, topMargin + 100);

    //current time on timeline axis

    line(leftMargin + (40*year),topMargin + 25, leftMargin + (40*year), topMargin + 35);

    //Create items array
    var sortedArray = Object.keys(tempMap[year]).map(function(key) {
        return [key, tempMap[year][key]];
    });

    //Sort the array based on the second element
    sortedArray.sort(function(first, second) {
        return second[1] - first[1];
    });

    let listOfPlayers = [];

    //Top player window
    textSize(21);
    fill(187,143,253);
    rect(leftMargin + 990,topMargin + 210,220,100);
    fill(0);
    line(leftMargin + 990,topMargin + 260, leftMargin + 990 + 220, topMargin + 260);
    text("Top player of year "+ year,leftMargin + 1100,topMargin + 245);
    text(sortedArray[0][0],leftMargin + 1100,topMargin + 290);
    textSize(12);

    //visualizing plots
    sortedArray.forEach(([i,j],index) => {
        textAlign(RIGHT);
        text(i,leftMargin + 50,topMargin + 130 + (20 * index));
        fill(255 - (index * 20),(index * 20), 255 - (index * 20));
        rect(leftMargin + 60,topMargin + 120 + (20 * index),j,15);
        fill(0);
        textAlign(LEFT);
        listOfPlayers.push(i);
        text(j,leftMargin + 75 + +j,topMargin + 130 + (20 * index));
    });

    let noRecordPlayers = [];

    players.forEach((i,index) => {
       if(!(listOfPlayers.includes(i)))
           noRecordPlayers.push(i);
    });

    let index3 = listOfPlayers.length;
    console.log("index 3 : "+index3);

    //Players with 0 homeruns in a year
    noRecordPlayers.forEach((i,index) => {
        textAlign(RIGHT);
        text(i,leftMargin + 50,topMargin + 130 + (20 * (index + index3)));
        fill(255 - ((index + index3) * 20),((index + index3) * 20), 255 - ((index + index3) * 20));
        rect(leftMargin + 60,topMargin + 120 + (20 * (index + index3)),0,15);
        fill(0);
        textAlign(LEFT);
        text(0,leftMargin + 75,topMargin + 130 + (20 * (index + index3)));
    });

    //incrementing year for animation
    year++;
    if(year > 23)
        year = 0;

}

