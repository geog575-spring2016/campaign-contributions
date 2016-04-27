var attrArray = ["Bobby", "CarlyFiorina","ChrisChristie", "GeorgePataki",  "JamesWebb"];
var expressed = attrArray[0];

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
        .defer(d3.csv, "data/bobby.csv")
        .defer(d3.json, "data/US_shapefile.topojson")
        .await(callback); // waits til both sets of data are loaded before it sends the data to the callback function

    // callback function that takes the data as two parameters and an error parameter that will report any errors that occur
    function callback(error, bobby, unitedStates) {
        // translate the topojson to GeoJSON within the DOM
        var us = topojson.feature(unitedStates, unitedStates.objects.US_shapefile).features; // pulls the array of features from the shapefile data and passes it to .data()

         us = joinData(us, bobby);
      
         setEnumerationUnits(us, map, path);
         setCircles (path,map,bobby,projection);
         createDropdown(bobby);
        

    };
};

function joinData(us, bobby){
   
    //loop through csv to assign each set of csv attribute values to geojson region
    for (var i=0; i<bobby.length; i++){
        var csvRegion = bobby[i]; //the current region
        var csvKey = csvRegion.postalcode; //the CSV primary key

         //loop through geojson regions to find correct region
        for (var a=0; a<us.length; a++){
            var geojsonProps = us[a].properties; //the current region geojson properties
            var geojsonKey = geojsonProps.postalcode; //the geojson primary key
           
            //where primary keys match, transfer csv data to geojson properties object
            if (geojsonKey == csvKey){

                //assign all attributes and values
                attrArray.forEach(function(attr){
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
                return "states " + d.properties.postalcode; // unique class name in the shapefile properties; in this case names of the states
            })
            .attr("d", path);
};



function setCircles (path,map,bobby,projection){

         var circles = map.selectAll(".circles")
        .data(bobby)
        .enter()
        .append("circle")
        .attr("class", function(d){
             
            return "circles " + d.postalcode;
        })
        .attr("fill", "grey")
        .attr('fill-opacity', 0.5)
        .attr("cx", function(d) {
            return projection([d.Lon, d.Lat])[0]; }) 
        .attr("cy", function(d) { return projection([d.Lon, d.Lat])[1]; });

        updateCircles(circles,bobby);
 

};

function createDropdown(bobby){
    //add select element
    var dropdown = d3.select("body")
        .append("select")
        .attr("class", "dropdown")
        .on("change", function(){
            changeAttribute(this.value, bobby)
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

function changeAttribute(attribute, bobby){
    //change the expressed attribute
    expressed = attribute;
    var circles = d3.selectAll(".circles");
    updateCircles(circles,bobby);
  
};


function updateCircles(circles, bobby)
{
    var domainArray = [];
    for (var i=0; i<bobby.length; i++){
        var val = parseFloat(bobby[i][expressed]);
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