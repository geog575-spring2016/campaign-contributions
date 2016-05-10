var attrArray = ["Total", "Per Capita"];
var expressed = attrArray[0];
var fullDate = ["March 2015", "April 2015","May 2015", "June 2015",  "July 2015","August 2015","September 2015","October 2015","November 2015","December 2015","January 2016","February 2016","March 2016"];
var timeArray = ["March_15","April_15","May_15","June_15","July_15","August_15","September_15","October_15","November_15","December_15","January_16","February_16","March_16"];
var timelineArray = ["Mar 15", "Apr 15","May 15", "June 15", "July 15","Aug 15","Sep 15","Oct 15","Nov 15","Dec 15","Jan 16","Feb 16","Mar 16"];
var count = 12;
var timeExpressed = timeArray[12];
var yearExpressedText;
var chartHeight = 200;
var chartWidth = 882;
var candidaterightname, candidateleftname;
var currentFrame = 0;
var map;
var svg;
var newarray;
var projection;
var setRadius;
var radioName = expressed;
var width = window.innerWidth * 0.645,
    height = 470;
var attributeNames = [];
var csvArray = [];
var oldcsvArray = [];
var format = d3.format(",");

window.onload = setMap();
// set the width and height of the map
function setMap() {


    // creating the map as an svg and giving it attributes of width and height
    map = d3.select("#mapContainer")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    projection = d3.geo.albersUsa()
    // no center because it's already centered on the US as part of the projection code
        .scale(1000)
        .translate([width / 2, height / 2.2]); // keeps map centered in the svg container

    // creating a path generator to draw the projection
    var path = d3.geo.path()
        .projection(projection);

    function zoomed() {
            map.style("stroke-width", 1.5 / d3.event.scale + "px");
            map.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    var zoom = d3.behavior.zoom()
        .translate([0, 0])
        .scale(1)
        .scaleExtent([1, 3])
        .on("zoom", zoomed);

    map.call(zoom)
        .call(zoom.event);

    // uses queue.js to parallelize asynchronous loading of the the CSV and shapefile data
    d3_queue.queue()

        .defer(d3.csv, "data/GoodCSVs/JebBush.csv")
        .defer(d3.csv, "data/GoodCSVs/BenCarson.csv")
        .defer(d3.csv, "data/GoodCSVs/ChrisChristie.csv")
        .defer(d3.csv, "data/GoodCSVs/HillaryClinton.csv")
        .defer(d3.csv, "data/GoodCSVs/TedCruz.csv")
        .defer(d3.csv, "data/GoodCSVs/CarlyFiorina.csv")
        .defer(d3.csv, "data/GoodCSVs/LindseyGraham.csv")
        .defer(d3.csv, "data/GoodCSVs/MikeHuckabee.csv")
        .defer(d3.csv, "data/GoodCSVs/BobbyJindal.csv")
        .defer(d3.csv, "data/GoodCSVs/JohnKasich.csv")
        .defer(d3.csv, "data/GoodCSVs/LawrenceLessig.csv")
        .defer(d3.csv, "data/GoodCSVs/MartinOMalley.csv")
        .defer(d3.csv, "data/GoodCSVs/GeorgePataki.csv")
        .defer(d3.csv, "data/GoodCSVs/RandPaul.csv")
        .defer(d3.csv, "data/GoodCSVs/RickPerry.csv")
        .defer(d3.csv, "data/GoodCSVs/MarcoRubio.csv")
        .defer(d3.csv, "data/GoodCSVs/BernieSanders.csv")
        .defer(d3.csv, "data/GoodCSVs/RickSantorum.csv")
        .defer(d3.csv, "data/GoodCSVs/JillStein.csv")
        .defer(d3.csv, "data/GoodCSVs/DonaldTrump.csv")
        .defer(d3.csv, "data/GoodCSVs/ScottWalker.csv")
        .defer(d3.csv, "data/GoodCSVs/JamesWebb.csv")
        .defer(d3.csv, "data/total_contributions_percandidate_perstate.csv")
        .defer(d3.csv, "data/events.csv")
        .defer(d3.json,"data/US_shapefile.topojson")
        .await(callback); // waits til both sets of data are loaded before it sends the data to the callback function

    // callback function that takes the data as two parameters and an error parameter that will report any errors that occur
    function callback(error, Bush, Carson, Christie, Clinton, Cruz, Fiorina, Graham, Huckabee, Jindal, Kasich, Lessig, OMalley, Pataki, Paul, Perry, Rubio, Sanders, Santorum, Stein, Trump, Walker, Webb, total,events, unitedStates) {

        total.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.Total =+ d.Total
        });
        Bush.forEach(function(d){
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Carson.forEach(function(d){
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Christie.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Clinton.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Cruz.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Fiorina.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Graham.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Huckabee.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Jindal.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Kasich.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Lessig.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        OMalley.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Pataki.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Paul.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Perry.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Rubio.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Sanders.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Santorum.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Stein.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Trump.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Walker.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });
        Webb.forEach(function(d) {
            d.Lat= +d.Lat
            d.Lon= +d.Lon
            d.state_total= +d.state_total
        });

        total.sort(function (a, b) {
            return b.Total - a.Total;
            return b.PerCapita - a.PerCapita;
        });


        // translate the topojson to GeoJSON within the DOM
        var us = topojson.feature(unitedStates, unitedStates.objects.US_shapefile).features; // pulls the array of features from the shapefile data and passes it to .data()

        oldcsvArray = [Bush, Carson, Christie, Clinton, Cruz, Fiorina, Graham, Huckabee, Jindal, Kasich, Lessig, OMalley, Pataki, Paul, Perry, Rubio, Sanders, Santorum, Stein, Trump, Walker, Webb,total];

        csvArray = [Bush, Carson, Christie, Clinton, Cruz, Fiorina, Graham, Huckabee, Jindal, Kasich, Lessig, OMalley, Pataki, Paul, Perry, Rubio, Sanders, Santorum, Stein, Trump, Walker, Webb,total];


        for (i=0; i<oldcsvArray.length-1; i++) {
            for (j=0; j<oldcsvArray[i].length; j++) {
                csvArray[i][j].March_16 = parseFloat(oldcsvArray[i][j].March_16);
                csvArray[i][j].March_15 = parseFloat(oldcsvArray[i][j].March_15);
                csvArray[i][j].April_15 = parseFloat(oldcsvArray[i][j].April_15);
                csvArray[i][j].May_15 = parseFloat(oldcsvArray[i][j].May_15);
                csvArray[i][j].June_15 = parseFloat(oldcsvArray[i][j].June_15);
                csvArray[i][j].July_15 = parseFloat(oldcsvArray[i][j].July_15);
                csvArray[i][j].August_15 = parseFloat(oldcsvArray[i][j].August_15);
                csvArray[i][j].September_15 = parseFloat(oldcsvArray[i][j].September_15);
               csvArray[i][j].October_15 = parseFloat(oldcsvArray[i][j].October_15);
               csvArray[i][j].November_15 = parseFloat(oldcsvArray[i][j].November_15);
               csvArray[i][j].December_15 = parseFloat(oldcsvArray[i][j].December_15);
               csvArray[i][j].January_16 = parseFloat(oldcsvArray[i][j].January_16);
               csvArray[i][j].February_16 = parseFloat(oldcsvArray[i][j].February_16);
           }
       }

       attributeNames = ["Jeb Bush (R)","Ben Carson (R)","Chris Christie (R)","Hillary Clinton (D)","Ted Cruz (R)","Carly Fiorina (R)","Lindsey Graham (R)","Mike Huckabee (R)","Bobby Jindal (R)","John Kasich (R)","Lawrence Lessig (D)","Martin OMalley (D)","George Pataki (R)","Rand Paul (R)","Rick Perry (R)","Marco Rubio (R)","Bernie Sanders (D)","Rick Santorum (R)","Jill Stein (Green Party)","Donald Trump (R)","Scott Walker (R)","James Webb (D)"];

       for (i in csvArray){
            joinData(us, csvArray[i], attributeNames[i]);
        };

         setEnumerationUnits(us, map, path);
         setCircles (path,map,total,projection, us);
         createDropdownLeft(us,projection);
         createDropdownRight(us,projection);
         createradio(total,path,map,Bush, Carson, Christie, Clinton, Cruz, Fiorina, Graham, Huckabee, Jindal, Kasich, Lessig, OMalley, Pataki, Paul, Perry, Rubio, Sanders, Santorum, Stein, Trump, Walker, Webb,total, projection,us);
         //createButton(us,projection);
        //createSlider(us,projection);
        drawMenuInfo(timeExpressed);
        CreateSplitLegend();
        // displayEvents(events)
    };
};

function drawMenuInfo(time){
    //create event and time
    var a = timeArray.indexOf(timeExpressed);

    timeExpressedText = d3.select('#infoPanel')
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", "yearExpressedText menu-info")
        .text(fullDate[a])
        .style({'font-size':'36px', 'font-weight': 'strong'});

    eventExpressedText = d3.select('#infoPanel')
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", "eventExpressedText menu-info")
        // .html(displayEvents);

             //alters timeline year text
    var timelineYear = d3.select(".axis")
        .selectAll('g')
        .attr("font-weight", function(d){

            if (timelineArray[a] == d) {
                return "bold";
            } else {
                return "normal";
            }
        }).attr("font-size", function(d){
            if (timelineArray[a] == d){
                return "18px";
            } else {
                return "12px";
            }
        }).attr("stroke", function(d){
            if (timelineArray[a] == d){
                return "#986cb3";
            } else {
                return "gray";
            }
         });
};

// function displayEvents(events) {
//
//     var monthEvents = ;
//
// }

function createButton(us,projection) {

    //step forward functionality
    $(".stepForward").click(function(){
        if (count < timeArray.length-1){
            count++;
            timeExpressed = timeArray[count];
        } else {
          count = 0;
          timeExpressed = timeArray[count];
        };

        var removeOldYear = d3.selectAll(".yearExpressedText").remove();
        var removeOldEvent = d3.selectAll(".eventExpressedText").remove();

        if (candidaterightname && candidateleftname) {
            createRightSplit(candidaterightname,us,projection);
            createLeftSplit(candidateleftname,us,projection);

        } else if (candidaterightname){
            createRightSplit(candidaterightname,us,projection)

        } else if (candidateleftname) {
            createLeftSplit(candidateleftname,us,projection)
        }
            drawMenuInfo(timeExpressed);
    });

    $(".stepBackward").click(function(){
        if (count < timeArray.length && count > 0){
            count= count-1;
            timeExpressed = timeArray[count];

        } else {
            count = 12;
            timeExpressed = timeArray[count];
        };

        var removeOldYear = d3.selectAll(".yearExpressedText").remove();
        var removeOldEvent = d3.selectAll(".eventExpressedText").remove();

         if (candidaterightname && candidateleftname)
        {
          createRightSplit(candidaterightname,us,projection);
        createLeftSplit(candidateleftname,us,projection);}

         else if (candidaterightname)
         {createRightSplit(candidaterightname,us,projection)}
       else if (candidateleftname)
         {
        createLeftSplit(candidateleftname,us,projection)}
        drawMenuInfo(timeExpressed);
    });

};

function createSlider(us,projection){
    var y = d3.scale.ordinal()
       .domain(["Mar 15", "Apr 15","May 15", "June 15", "July 15","Aug 15","Sep 15","Oct 15","Nov 15","Dec 15","Jan 16","Feb 16","Mar 16"])
       .rangeRoundBands([0, 1000]);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("bottom")
        .tickPadding(2)

    var axis = d3.select("#sideColumn")
        .append("svg")
        .attr("class", "axis")
        .attr("transform", "translate(5, 0)")
        .call(yAxis);
console.log(axis);
    //adds mouse events
    axis.selectAll('g')
        .each(function(d){
            d3.select(this)
                .on("mouseover", function(){
                    d3.select(this)
                        .attr("font-weight", "bold")
                        .attr("cursor", "pointer")
                        .attr("font-size", "18px")
                        .attr("stroke", "gray");
                })
                .on("mouseout", function(){
                    d3.select(this)
                        .attr("font-weight", "normal")
                        .attr("font-size", "1em")
                        .attr("stroke", "none")
                        .attr("cursor", "pointer");
                })
                .on("click", function(){
                    d3.select(this)
                        .attr("font-weight", "bold")
                        .attr("cursor", "pointer")
                        .attr("font-size", "18px")
                        .attr("stroke", "#986cb3");


                    count = timelineArray.indexOf(d);
            timeExpressed = timeArray[count];
                    var removeOldYear = d3.selectAll(".yearExpressedText").remove();
                    var removeOldEvent = d3.selectAll(".eventExpressedText").remove();

                    drawMenuInfo(timeExpressed);

                    if (candidaterightname && candidateleftname) {
                        createRightSplit(candidaterightname,us,projection);
                        createLeftSplit(candidateleftname,us,projection);

                    } else if (candidaterightname){
                        createRightSplit(candidaterightname,us,projection)

                    } else if (candidateleftname){
                        createLeftSplit(candidateleftname,us,projection)
                    }
                });
        });
}



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
            .attr("class", "state-boundary") // unique class name in the shapefile properties; in this case names of the states
            .attr("d", path);
};

function setCircles (path, map, data, projection, us){

  var circles = map.selectAll(".circles")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", function(d){
            return "circles " + d.state_total + d.state;
        })
        .attr("fill", "#666")
        .attr("fill-opacity", 0.5)
        .attr("stroke", "white")
        .attr("stroke-width", 0.7)
        .attr("cx", function(d) {
            return projection([d.Lon, d.Lat])[0];
        })
        .attr("cy", function(d) { return projection([d.Lon, d.Lat])[1];
        })
        .on("mouseover", highlightCircles)
        .on("mouseout", dehighlightCircles);

  var desc = circles.append("desc")
        .text('{"stroke": "white", "stroke-width": "0.7", "fill-opacity": "0.5"}');

    updateCircles(circles,data);
};

function setCircles2 (path, map, data, projection, us){

  var circles = map.selectAll(".circles")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", function(d){
            return "circles " + d.state_total + d.state;
        })
        .attr("fill", "#666")
        .attr("fill-opacity", 0.5)
        .attr("stroke", "white")
        .attr("stroke-width", 0.7)
        .attr("cx", function(d) {
            return projection([d.Lon, d.Lat])[0];
        })
        .attr("cy", function(d) { return projection([d.Lon, d.Lat])[1];
        })
        .on("mouseover", highlightCircles)
        .on("mouseout", dehighlightCircles);

  var desc = circles.append("desc")
        .text('{"stroke": "white", "stroke-width": "0.7", "fill-opacity": "0.5"}');

    updateCircles(circles,data);
};

function createradio(data,path,map,Bush, Carson, Christie, Clinton, Cruz, Fiorina, Graham, Huckabee, Jindal, Kasich, Lessig, OMalley, Pataki, Paul, Perry, Rubio, Sanders, Santorum, Stein, Trump, Walker, Webb,total, projection,us){

    var filterPhases = ["Total", "PerCapita", "Compare Candidates"],
    j=0;

    var form1 = d3.select("#sideColumn")
        .append("form")
        .attr("class", "Classification1")

    var labelEnter = form1.selectAll("span")
        .data(filterPhases)
        .enter()
        .append("span");


    labelEnter.append("input")
        .attr({
            type: "radio",
            name: "mode",

        value: function(d) {return d;}
        })
        .on("change", function(d){
              //changeAttribute(this.value, data);
              radioName = d;
              //console.log(d);
              if (d == "Compare Candidates"){
                //console.log("Hi");
                    //changeAttribute(this.value, data);
                    drawMenuInfo(timeExpressed);
                    d3.selectAll(".circles").remove();
                    createButton(us,projection);
                    createSlider(us,projection);
                    $(".stepForward").attr("disabled", false);
                    $(".stepBackward").attr("disabled", false);
                    $('.dropdownLeft').attr("disabled", false);
                    $('.dropdownRight').attr("disabled", false);
                  };
              if (d == "Total"){
                  d3.selectAll(".leftsplit").remove();
                  d3.selectAll(".rightsplit").remove();
                  setCircles2 (path, map, data, projection, us)
                  changeAttribute(this.value, data);
                  $(".yearExpressedText").remove();
                  $(".eventExpressedText").remove();
                  $(".axis").remove();
                  $(".stepForward").attr("disabled", true);
                  $(".stepBackward").attr("disabled", true);
                  $('.dropdownLeft').attr("disabled", true);
                  $('.dropdownRight').attr("disabled", true);
                  //changeAttribute(this.value, data);
                  console.log(this.value);
                  };
              if (d == "PerCapita"){
                d3.selectAll(".leftsplit").remove();
                d3.selectAll(".rightsplit").remove();
                setCircles2 (path, map, data, projection, us)
                changeAttribute(this.value, data);
                $(".yearExpressedText").remove();
                $(".eventExpressedText").remove();
                $(".axis").remove();
                $(".stepForward").attr("disabled", true);
                $(".stepBackward").attr("disabled", true);
                $('.dropdownLeft').attr("disabled", true);
                $('.dropdownRight').attr("disabled", true);
                };
                console.log(this.value);
          })


    .property("checked", function(d, i) {return i===j;})

    labelEnter.append("label").text(function(d) {return d;});

};

function changeAttribute(attribute, data){
    //change the expressed attribute
    expressed = attribute;
    var circles = d3.selectAll(".circles");
    updateCircles(circles, data);
    var circles2 = d3.selectAll("#redraw");
    updateCircles2(circles, data);

}

function updateCircles(circles, data){
    var domainArray = [];
    for (var i=0; i<data.length; i++){
        var val = parseFloat(data[i][expressed]);
        domainArray.push(val);
    };
        radiusMin = Math.min.apply(Math, domainArray);
        radiusMax = Math.max.apply(Math, domainArray);

        setRadius = d3.scale.sqrt()
            .range([0, 100])
            .domain([radiusMin, radiusMax]);
    //create a second svg element to hold the bar chart
    var circleRadius= circles.attr("r", function(d){
        return setRadius(d[expressed]);
    });
};

function updateCircles2(circles, data){
    var domainArray = [];
    for (var i=0; i<data.length; i++){
        var val = parseFloat(data[i][expressed]);
        domainArray.push(val);
    };
        radiusMin = Math.min.apply(Math, domainArray);
        radiusMax = Math.max.apply(Math, domainArray);

        setRadius = d3.scale.sqrt()
            .range([0, 100])
            .domain([radiusMin, radiusMax]);
    //create a second svg element to hold the bar chart
    var circleRadius= circles.attr("r", function(d){
        return setRadius(d[expressed]);
    });
};

function createLeftSplit(caname,us,projection){

    var candidate_a;
    removeCircles = d3.selectAll(".circles").remove();
    remorveSplit = d3.selectAll(".leftsplit").remove();

    for (var i=0; i<attributeNames.length; i++){
        if(attributeNames[i] == caname){
            candidate_a = csvArray[i];
        }
    };



        var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(function(d){
                return setRadius(d[timeExpressed]);
            })
            .startAngle(Math.PI)
            .endAngle(Math.PI*2)

          radiusMin = d3.min(candidate_a, function(d){
              return d[timeExpressed]
          })

          radiusMax = d3.max(candidate_a, function(d){
              return d[timeExpressed]
          })

          setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 40]);


    var candidate1 = map.append("g");

    candidate1.selectAll("path")
        .data(candidate_a)
        .enter()
        .append("path")
        .on("mouseover", function(d){
            highlightSplitsL(d);
        })
        .on("mouseout", function(d){
            dehighlightSplitsL(d);
        })
        .attr("fill", "purple")
        .attr("fill-opacity", 0.5)
        .attr("stroke", "white")
        .attr("stroke-width", "0.7")
        .attr("class", "leftsplit")

        .attr("class", function(d){
            y = timeExpressed
            return "leftsplit " + d.y + d.state
        })
        .attr("id", attributeNames)
        //length of line
        .attr("transform", function(d){
            return "translate(" + projection([d.Lon, d.Lat])[0] + "," + projection([d.Lon, d.Lat])[1]+")";
        })
        .attr("d", arc);
};

//functin to create dropdown 1 for candidates
function createDropdownLeft(us,projection){

    var dropdown = d3.select("#sideColumn")
        .append("select")
        .attr("class", "dropdownLeft")
        .on("change", function(){
            d3.selectAll(".leftsplit").remove();
            candidateleftname = this.value;
            createLeftSplit(this.value,us,projection)
        });

    //add initial option
    var titleOption = dropdown.append("option")
        .attr("class", "titleOption")
        .text("Select a Candidate or Party");

    //add attribute name options
    var attrOptions = dropdown.selectAll("attrOptions")
        .data(attributeNames)
        .enter()
        .append("option")
        .attr("value", function(d){ return d })
        .text(function(d){ return d });

};

function createRightSplit(caname,us,projection){
  var removeCircles = d3.selectAll(".circles").remove();
  var removeright = d3.selectAll(".rightsplit").remove();
var candidate_b;

        for (var i=0; i<attributeNames.length; i++){
          if(attributeNames[i] == caname)
            {candidate_b = csvArray[i];}
        };


 var arc2 = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d[timeExpressed]);
        })
        .startAngle(0)
        .endAngle(Math.PI)

      radiusMin = d3.min(candidate_b, function(d){
        return d[timeExpressed]
      })

      radiusMax = d3.max(candidate_b, function(d){
        return d[timeExpressed]
      })

setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 40]);


    var candidate2 = map.append("g");

    candidate2.selectAll("path")
        .data(candidate_b)
        .enter()
        .append("path")
        .on("mouseover", function(d){
            highlightSplitsR(d);
        })
        .on("mouseout", function(d){
            dehighlightSplitsR(d);
        })
        .attr("fill", "#FFA30D")
        .attr("fill-opacity", 0.5)
        .attr("stroke", "white")
        .attr("stroke-width", 0.7)
        .attr("class", "rightsplit")

        .attr("class", function(d){
            y = timeExpressed
            return "rightsplit " + d.y + d.state
        })
        .attr("id", attributeNames)
        //length of line
        .attr("transform", function(d){
            return "translate(" + projection([d.Lon, d.Lat])[0] + "," + projection([d.Lon, d.Lat])[1]+")";
        })
        .attr("d", arc2)
};

//functin to create dropdown 2 for candidates
function createDropdownRight(us,projection){
    //add select element
    var dropdown = d3.select("#sideColumn")
        .append("select")
        .attr("class", "dropdownRight")
        .on("change", function(){
            d3.selectAll(".rightsplit").remove();
            candidaterightname = this.value;
            createRightSplit(this.value,us,projection)
        });

    //add initial option
    var titleOption = dropdown.append("option")
        .attr("class", "titleOption")
        //.attr("disabled", "true")
        .text("Select a Candidate or Party");

    //add attribute name options
    var attrOptions = dropdown.selectAll("attrOptions")
        .data(attributeNames)
        .enter()
        .append("option")
        .attr("value", function(d){ return d })
        .text(function(d){ return d });
};

function CreateSplitLegend(){
    var legend = d3.selectAll("#infoPanel").append("svg")
        .attr("width", 250)
        .attr("height", 500)

    var legendDetails = legend.append("circle")
        .attr("r", 100)
        .attr("cx", 105)
        .attr("cy", 320)
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", "1.5")

    var legendDetails2 = legend.append("circle")
        .attr("r", 50)
        .attr("cx", 105)
        .attr("cy", 370)
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", "1.5")

  legend.append("text")
      .text("$100,000,000")
      .attr("x", 60)
      .attr("y", 215)
//adding text to legend
  legend.append("text")
      .text("$50,000,000")
      .attr("x", 70)
      .attr("y", 315)

};

function highlightCircles(data) {
    var selected = d3.selectAll("." + data.state_total + data.state)
        .style( {
            "stroke": "#000",
            "stroke-width": "0.7",
            "fill-opacity": "1"
        });
    setLabelCircles(data);
};

function dehighlightCircles (data) {
    var selected = d3.selectAll("." + data.state_total + data.state)
      .style({
        "stroke": function (){
          return getStyle(this, "stroke")
        },
        "stroke-width": function(){
            return getStyle(this, "stroke-width")
        },
        "fill-opacity": function(){
            return getStyle(this, "fill-opacity")
        }
    });

    function getStyle (element, styleName) {
        var styleText = d3.select(element)
            .select("desc")
            .text();

        var styleObject = JSON.parse(styleText);

        return styleObject[styleName];
    };

    d3.select(".infolabel")
        .remove();
};

function highlightSplitsL(data) {
    y = timeExpressed
    map.selectAll("." + data.y + data.state)
        .style( {
            "stroke": "#666",
            "stroke-width": "0.7",
            "fill-opacity": "1"
        });
    setLabelSplits(data)
};

function dehighlightSplitsL (data) {
    y = timeExpressed
    map.selectAll("." + data.y + data.state)
    .style( {
        "stroke": "white",
        "stroke-width": "0.5",
        "fill-opacity": "0.7"
    });
    d3.select(".infolabel")
        .remove();
};

function highlightSplitsR(data) {
    y = timeExpressed
    map.selectAll("." + data.y + data.state)
        .style( {
            "stroke": "#666",
            "stroke-width": "0.7",
            "fill-opacity": "1"
        });
    setLabelSplits(data)
};

function dehighlightSplitsR(data) {
    y = timeExpressed
    map.selectAll("." + data.y + data.state)
    .style( {
        "stroke": "white",
        "stroke-width": "0.5",
        "fill-opacity": "0.7"
    });
    d3.select(".infolabel")
        .remove();
};

function setLabelCircles(data){
    //label content
    var labelAttribute = "<h1>" + data.name +
        "</h1><br><h2<b>$" + format(d3.round(data.Total, 0)) + "</b></h2><br><h2<b>$" + format(d3.round(data.PerCapita, 2)) + "</b></h2>";

    //create info label div
    var infolabel = d3.select("#infoPanel")
        .append("text")
        .attr({
            "class": "infolabel",
            "id": data.state + "_label"
        })
        .html(labelAttribute);
};
function setLabelSplits(data){
    //label content
    var labelAttribute = "<h1>" + data.name +
        "</h1><br><h2<b>$" + format(d3.round(data.state_total, 0)) + "</b></h2>";

    //create info label div
    var infolabel = d3.select("#infoPanel")
        .append("text")
        .attr({
            "class": "infolabel",
            "id": data.state + "_label"
        })
        .html(labelAttribute);
};
