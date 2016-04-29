var attrArray = ["BenCarson", "BernieSanders","BobbyJindal", "CarlyFiorina",  "ChrisChristie","DonaldTrump","GeorgePataki","HillaryClinton","JamesWebb","JebBush","JohnKasich","LawrenceLessig","LindseyGraham","MarcoRubio", "MartinOMalley", "MikeHuckabee", "RandPaul", "RickPerry", "RickSantorum", "ScottWalker", "TedCruz"];
var expressed = attrArray[0];
var attrArray2 = ["March_15", "April_15","May_15", "June_15",  "July_15","August_15","September_15","October_15","November_15","December_15","January_16","February_16","March_16"];
var expressed2 = attrArray2[0];

window.onload = setMap();




// set the width and height of the map
function setMap() {
  var width = window.innerWidth * 0.645,
        height = 650;

    // creating the map as an svg and giving it attributes of width and height
    var map = d3.select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);
     var pageTitle = d3.select("body")
        .append("text")
        .attr("class", "pageTitle")
        .html("We "+"don't".strike()+" need your money, money, money");

    // creating projection - Albers USA which puts Alaska and Hawaii, projected in their own right below the 48 contiguous states
    var projection = d3.geo.albersUsa()
    // no center because it's already centered on the US as part of the projection code
        .scale(1000)
        .translate([width / 2, height / 2]); // keeps map centered in the svg container

    // creating a path generator to draw the projection
    var path = d3.geo.path()
        .projection(projection);

    // uses queue.js to parallelize asynchronous loading of the the CSV and shapefile data
    d3_queue.queue()
        .defer(d3.csv, "data/total_contributions_percandidate_perstate.csv")
        .defer(d3.csv, "data/GoodCSVs/BenCarson.csv")
        .defer(d3.csv, "data/GoodCSVs/BernieSanders.csv")
        .defer(d3.csv, "data/GoodCSVs/BobbyJindal.csv")
        .defer(d3.csv, "data/GoodCSVs/CarlyFiorina.csv")
        .defer(d3.csv, "data/GoodCSVs/ChrisChristie.csv")
        .defer(d3.csv, "data/GoodCSVs/DonaldTrump.csv")
        .defer(d3.csv, "data/GoodCSVs/GeorgePataki.csv")
        .defer(d3.csv, "data/GoodCSVs/JamesWebb.csv")
        .defer(d3.csv, "data/GoodCSVs/JebBush.csv")
        .defer(d3.csv, "data/GoodCSVs/JohnKasich.csv")
        .defer(d3.csv, "data/GoodCSVs/LawrenceLessig.csv")
        .defer(d3.csv, "data/GoodCSVs/LindseyGraham.csv")
        .defer(d3.csv, "data/GoodCSVs/MarcoRubio.csv")
        .defer(d3.csv, "data/GoodCSVs/MartinOMalley.csv")
        .defer(d3.csv, "data/GoodCSVs/MikeHuckabee.csv")
        .defer(d3.csv, "data/GoodCSVs/RandPaul.csv")
        .defer(d3.csv, "data/GoodCSVs/RickPerry.csv")
        .defer(d3.csv, "data/GoodCSVs/RickSantorum.csv")
        .defer(d3.csv, "data/GoodCSVs/ScottWalker.csv")
        .defer(d3.csv, "data/GoodCSVs/TedCruz.csv")
        .defer(d3.json, "data/US_shapefile.topojson")
        .await(callback); // waits til both sets of data are loaded before it sends the data to the callback function

    // callback function that takes the data as two parameters and an error parameter that will report any errors that occur
    function callback(error, totals, carson, sanders, jindal, fiorina, christie, trump, pataki, webb, bush, kasich, lessig, graham, rubio, omalley, huckabee, paul, perry, santorum, walker, cruz, unitedStates) {
        // translate the topojson to GeoJSON within the DOM
        var us = topojson.feature(unitedStates, unitedStates.objects.US_shapefile).features; // pulls the array of features from the shapefile data and passes it to .data()
        var csvArray = [totals, carson, sanders, jindal, fiorina, christie, trump, pataki, webb, bush, kasich, lessig, graham, rubio, omalley, huckabee, paul, perry, santorum, walker, cruz];
        var attributeNames = ["bobbycontribution", "test1contribution", "test2contribution", "test3contribution"];
           for (csv in csvArray){
            joinData(us, csvArray[csv], attributeNames[csv]);
        };

         setEnumerationUnits(us, map, path);

         setCircles (path, map, totals, carson, sanders, jindal, fiorina, christie, trump, pataki, webb, bush, kasich, lessig, graham, rubio, omalley, huckabee, paul, perry, santorum, walker, cruz, projection);

         createDropdown(totals, carson, sanders, jindal, fiorina, christie, trump, pataki, webb, bush, kasich, lessig, graham, rubio, omalley, huckabee, paul, perry, santorum, walker, cruz);

         overlay(path, map, totals, carson, sanders, jindal, fiorina, christie, trump, pataki, webb, bush, kasich, lessig, graham, rubio, omalley, huckabee, paul, perry, santorum, walker, cruz, projection);



    };
};

function joinData(us, csvData, attribute){

    //loop through csv to assign each set of csv attribute values to geojson region
    for (var i=0; i<csvData.length; i++){
        var csvRegion = csvData[i]; //the current region
        var csvKey = csvRegion.state; //the CSV primary key

         //loop through geojson regions to find correct region
        for (var a=0; a<us.length; a++){
            var geojsonProps = us[a].properties; //the current region geojson properties
            var geojsonKey = geojsonProps.state; //the geojson primary key

            //where primary keys match, transfer csv data to geojson properties object
            if (geojsonKey == csvKey){

                //assign all attributes and values
                attrArray2.forEach(function(attr){
                    var val = parseFloat(csvRegion[attr]); //get csv attribute value
                    geojsonProps[attr] = val; //assign attribute and value to geojson properties

                });
            };
        };
    };

    return us;

};

function setEnumerationUnits(us, map, path){

    var states = map.selectAll(".states")
        .data(us)
        .enter()
        .append("path")
        .attr("class", function(d) {
            return "states " + d.properties.state; // unique class name in the shapefile properties; in this case names of the states
        })
        .attr("d", path);
};



function setCircles (path, map, data, projection){

    var circles = map.selectAll(".circles")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", function(d){

            return "circles " + d.state;
        })
        .attr("fill", "grey")
        .attr('fill-opacity', 0.5)
        .attr("cx", function(d) {
            return projection([d.Lon, d.Lat])[0]; })
        .attr("cy", function(d) { return projection([d.Lon, d.Lat])[1]; });

        updateCircles(circles, data);


};

function createDropdown(data){
    //add select element
    var dropdown = d3.select("body")
        .append("select")
        .attr("class", "dropdown")
        .on("change", function(){
            changeAttribute(this.value, data)
        });

    //add initial option
    var titleOption = dropdown.append("option")
        .attr("class", "titleOption")
        .attr("disabled", "true")
        .text("Pick a candidate");

    //add attribute name options
    var attrOptions = dropdown.selectAll("attrOptions")
        .data(attrArray)
        .enter()
        .append("option")
        .attr("value", function(d){ return d })
        .text(function(d){ return d });
};

function changeAttribute(attribute, data){
    //change the expressed attribute
    expressed = attribute;
    var circles = d3.selectAll(".circles");
    updateCircles(circles,data);

};


function updateCircles(circles, data)
{
    var domainArray = [];
    for (var i=0; i<data.length; i++){
        var val = parseFloat(data[i][expressed]);
        domainArray.push(val);
    };
        var radiusMin = Math.min.apply(Math, domainArray);
        var radiusMax = Math.max.apply(Math, domainArray);

var setRadius = d3.scale.sqrt()
        .range([4, 40])
        .domain([radiusMin, radiusMax]);
    //create a second svg element to hold the bar chart
var circleRadius= circles.attr("r", function(d){
            return setRadius(d[expressed]);
        });
};

function overlay(path,map,test1,test2,test3,projection){
    $(".test1-section").click(function(){
        var test1Div = document.getElementById('test1-centers');
        var test1InsetDiv = document.getElementById('test1-inset');
        if (d3.selectAll(".circles")[0].length > 0){
            removeCPC = d3.selectAll(".circles").remove();
            test1InsetDiv.style.visibility = "hidden";
        } else {
            setCircles2(path,map,test1,projection);
            test1InsetDiv.style.visibility = "visible";
        }
    });

        $(".test2-section").click(function(){
        var test2Div = document.getElementById('test2-centers');
        var test2InsetDiv = document.getElementById('test2-inset');
        if (d3.selectAll(".circles")[0].length > 0){
            removeCPC = d3.selectAll(".circles").remove();
            test2InsetDiv.style.visibility = "hidden";
        } else {
            setCircles2(path,map,test2,projection);
            test2InsetDiv.style.visibility = "visible";
        }
    });

    $(".test3-section").click(function(){
        var test3Div = document.getElementById('test3-centers');
        var test3InsetDiv = document.getElementById('test3-inset');
        if (d3.selectAll(".circles")[0].length > 0){
            removeCPC = d3.selectAll(".circles").remove();
            test3InsetDiv.style.visibility = "hidden";
        } else {
            setCircles2(path,map,test3,projection);
            test3InsetDiv.style.visibility = "visible";
        }
    });
}; //END overlay function


function setCircles2 (path,map,data,projection){

         var circles = map.selectAll(".circles")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", function(d){

            return "circles " + d.state;
        })
        .attr("fill", "red")
        .attr('fill-opacity', 0.5)
        .attr("cx", function(d) {
            return projection([d.Lon, d.Lat])[0]; })
        .attr("cy", function(d) { return projection([d.Lon, d.Lat])[1]; });

        updateCircles2(circles,data);

};

function updateCircles2(circles, data)
{
    var domainArray = [];
    for (var i=0; i<data.length; i++){
        var val = parseFloat(data[i][expressed2]);
        domainArray.push(val);
    };
        var radiusMin = Math.min.apply(Math, domainArray);
        var radiusMax = Math.max.apply(Math, domainArray);

var setRadius = d3.scale.sqrt()
        .range([4, 40])
        .domain([radiusMin, radiusMax]);
    //create a second svg element to hold the bar chart
var circleRadius= circles.attr("r", function(d){
            return setRadius(d[expressed2]);
        });
};
