var attrArray = ["Total", "Per Capita"];
var expressed = attrArray[0];
var fullDate = ["March 2015", "April 2015","May 2015", "June 2015",  "July 2015","August 2015","September 2015","October 2015","November 2015","December 2015","January 2016","February 2016","March 2016"];
var timelineArray = ["March_15", "April_15","May_15", "June_15", "July_15","August_15","September_15","October_15","November_15","December_15","January_16","February_16","March_16"];
var count = 12;
var timeExpressed = timelineArray[12];
var eventArray=["Ben Carson, Donald Trump and Ted Cruz joined in election", "Rick Santorum, Hilary Clinton and Bernie Sanders joined the election","Carly Fiorina, Mike Huckabee, Martin O'Malley joined the election", "Rick Perry, Jeb Bush, Jill Stein, Bobby Jindal joined in election",  "James Webb, John Kasich joined in election","Lawrence Lessig joined the election","Rick Perry withdrawed election; South Carolina finalizes ballot for primary","First Democratic debate is held; James Webb withdrawed","Lawrence Lessig withdrawed; Alabama primary; Fourth Republican debate","Fifth Republican debate; Third Democratic debate","Third Democratic forum; Sixth and seventh Republican debates; Fourth Democratic debate","The Iowa Democratic caucus is won by Hillary Clinton; The Iowa Republican caucus is won by Ted Cruz"," Super Tuesday;Lots to stuffs.."]
var eventExpressed = eventArray[12];
var yearExpressedText;
var chartHeight = 200;
var chartWidth = 882;
var dateScale, sliderScale, slider;
var interval;
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
        .defer(d3.json,"data/US_shapefile.topojson")
        .await(callback); // waits til both sets of data are loaded before it sends the data to the callback function

    // callback function that takes the data as two parameters and an error parameter that will report any errors that occur
    function callback(error, Bush, Carson, Christie, Clinton, Cruz, Fiorina, Graham, Huckabee, Jindal, Kasich, Lessig, OMalley, Pataki, Paul, Perry, Rubio, Sanders, Santorum, Stein, Trump, Walker, Webb, total, unitedStates) {

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
         drawMenuInfo(timeExpressed);
         createButton(us,projection);
    };
};

function drawMenuInfo(time){
    //create event and time
    var a = timelineArray.indexOf(timeExpressed);

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
        .text(eventArray[a]);
};

function drawMenuInfo2(time){
       //create event and time
    var a = timelineArray.indexOf(time);
    console.log(a);

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
        .text(eventArray[a]);
};

function createButton(us,projection) {

    //step forward functionality
    $(".stepForward").click(function(){
        if (count < timelineArray.length-1){
            count++;
            timeExpressed = timelineArray[count];
        } else {
          count = 0;
          timeExpressed = timelineArray[count];
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
        if (count < timelineArray.length && count > 0){
            count= count-1;
            timeExpressed = timelineArray[count];

        } else {
            count = 12;
            timeExpressed = timelineArray[count];
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

    createSlider(us,projection);
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

                    timeExpressed = d;
                    count = timelineArray.indexOf(d);

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


// function createSequencesd()
// {
//     var timeScale = d3.time.scale()
//         .domain([timelineArray[0], d3.time.years(new Date(timelineArray[timelineArray.length-1]), 1)]); //domain is an array of 2 values: the first and last years in the keyArray (1973 and 2014)


//   var axis = d3.svg.axis()
//         .scale(timeScale)
//         .orient("bottom")
//         .ticks(d3.time.years, 1)

//         //distance between axis line and labels



//     //sets the thickness of the line between the ticks and the corresponding squares in the chart
//     var timelineLine = axis.tickSize(1);

//     //sets the margins for the timeline transform
//     var timelineMargin = {top: 50, right: 20, bottom: 30, left:40};


//     //draw the timeline as a g element on the chart
//     var timeline = d3.select("#mapContainer")
//    .append("svg")
//         .attr("height", chartHeight)
//         .attr("width", chartWidth)
//         .attr('transform', 'translate(' + timelineMargin.left + ',' + (chartHeight - timelineMargin.top - timelineMargin.bottom) + ')') //set the starting x,y coordinates for where the axis will be drawn
//         .attr("class", "timeline")
//         .call(axis); //calls the axis function on the timeline
// }


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


function createradio(data, path, map, Bush, Carson, Christie, Clinton, Cruz, Fiorina, Graham, Huckabee, Jindal, Kasich, Lessig, OMalley, Pataki, Paul, Perry, Rubio, Sanders, Santorum, Stein, Trump, Walker, Webb,total, projection,us){

    var filterPhases = ["Total", "PerCapita"],
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
            changeAttribute(this.value, data);
            radioName = d;
        })

    .property("checked", function(d, i) {return i===j;})

    labelEnter.append("label").text(function(d) {return d;});

};

function changeAttribute(attribute, data){
    //change the expressed attribute
    expressed = attribute;
    var circles = d3.selectAll(".circles");
    updateCircles(circles, data);
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
            .range([0, 70])
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


    if(timeExpressed == timelineArray[0]){
        var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(function(d){
                return setRadius(d.March_15);
            })
            .startAngle(Math.PI)
            .endAngle(Math.PI*2)

          radiusMin = d3.min(candidate_a, function(d){
              return d.March_15
          })

          radiusMax = d3.max(candidate_a, function(d){
              return d.March_15
          })

          setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);

    } else if (timeExpressed == timelineArray[12]) {
        var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(function(d){
                return setRadius(d.March_16);
            })
            .startAngle(Math.PI)
            .endAngle(Math.PI*2)
      radiusMin = d3.min(candidate_a, function(d){
          return d.March_16
      })

      radiusMax = d3.max(candidate_a, function(d){
          return d.March_16
      })

      setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);

    } else if (timeExpressed == timelineArray[1] ) {
        var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(function(d){
                return setRadius(d.April_15);
            })
            .startAngle(Math.PI)
            .endAngle(Math.PI*2)

        radiusMin = d3.min(candidate_a, function(d){
            return d.April_15
        })

        radiusMax = d3.max(candidate_a, function(d){
            return d.April_15
        })

        setRadius = d3.scale.sqrt()
          .domain([radiusMin, radiusMax])
          .range([0, 70]);

    } else if (timeExpressed == timelineArray[2]) {
        var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(function(d){
                return setRadius(d.May_15);
            })
            .startAngle(Math.PI)
            .endAngle(Math.PI*2)

        radiusMin = d3.min(candidate_a, function(d){
            return d.May_15
        })

        radiusMax = d3.max(candidate_a, function(d){
            return d.May_15
        })

        setRadius = d3.scale.sqrt()
          .domain([radiusMin, radiusMax])
          .range([0, 70]);

    } else if (timeExpressed == timelineArray[3]) {
        var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(function(d){
                return setRadius(d.June_15);
            })
            .startAngle(Math.PI)
            .endAngle(Math.PI*2)

        radiusMin = d3.min(candidate_a, function(d){
            return d.June_15
        })

        radiusMax = d3.max(candidate_a, function(d){
            return d.June_15
        })

        setRadius = d3.scale.sqrt()
          .domain([radiusMin, radiusMax])
          .range([0, 70]);


    } else if (timeExpressed == timelineArray[4] ) {var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.July_15);
        })
        .startAngle(Math.PI)
        .endAngle(Math.PI*2)

      radiusMin = d3.min(candidate_a, function(d){
        return d.July_15
      })

      radiusMax = d3.max(candidate_a, function(d){
        return d.July_15
      })

setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}

else if (timeExpressed == timelineArray[5]) {var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.August_15);
        })
        .startAngle(Math.PI)
        .endAngle(Math.PI*2)

      radiusMin = d3.min(candidate_a, function(d){
        return d.August_15
      })

      radiusMax = d3.max(candidate_a, function(d){
        return d.August_15
      })

setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);

}

else if (timeExpressed == timelineArray[6]) {var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.September_15);
        })
        .startAngle(Math.PI)
        .endAngle(Math.PI*2)

      radiusMin = d3.min(candidate_a, function(d){
        return d.September_15
      })

      radiusMax = d3.max(candidate_a, function(d){
        return d.September_15
      })

setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}

else if (timeExpressed == timelineArray[7]) {var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.October_15);
        })
        .startAngle(Math.PI)
        .endAngle(Math.PI*2)

      radiusMin = d3.min(candidate_a, function(d){
        return d.October_15
      })

      radiusMax = d3.max(candidate_a, function(d){
        return d.October_15
      })

setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}

else if (timeExpressed == timelineArray[8]) {var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.November_15);
        })
        .startAngle(Math.PI)
        .endAngle(Math.PI*2)

      radiusMin = d3.min(candidate_a, function(d){
        return d.November_15
      })

      radiusMax = d3.max(candidate_a, function(d){
        return d.November_15
      })

setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}


else if (timeExpressed == timelineArray[9]) {var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.December_15);
        })
        .startAngle(Math.PI)
        .endAngle(Math.PI*2)

      radiusMin = d3.min(candidate_a, function(d){
        return d.December_15
      })

      radiusMax = d3.max(candidate_a, function(d){
        return d.December_15
      })

setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}

else if (timeExpressed == timelineArray[10]) {var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.January_16);
        })
        .startAngle(Math.PI)
        .endAngle(Math.PI*2)

      radiusMin = d3.min(candidate_a, function(d){
        return d.January_16
      })

      radiusMax = d3.max(candidate_a, function(d){
        return d.January_16
      })

setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}

else if (timeExpressed == timelineArray[11]) {var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.February_16);
        })
        .startAngle(Math.PI)
        .endAngle(Math.PI*2)

      radiusMin = d3.min(candidate_a, function(d){
        return d.February_16
      })

      radiusMax = d3.max(candidate_a, function(d){
        return d.February_16
      })

setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}

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


if(timeExpressed == timelineArray[0])
{
 var arc2 = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.March_15);
        })
        .startAngle(0)
        .endAngle(Math.PI)

      radiusMin = d3.min(candidate_b, function(d){
        return d.March_15
      })

      radiusMax = d3.max(candidate_b, function(d){
        return d.March_15
      })

setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}
else if (timeExpressed == timelineArray[12])
  {
 var arc2 = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.March_16);
        })
        .startAngle(0)
        .endAngle(Math.PI)

      radiusMin = d3.min(candidate_b, function(d){
        return d.March_16
      })

      radiusMax = d3.max(candidate_b, function(d){
        return d.March_16
      })

setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}
else if (timeExpressed == timelineArray[1])
  {
 var arc2 = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.April_15);
        })
        .startAngle(0)
        .endAngle(Math.PI)

      radiusMin = d3.min(candidate_b, function(d){
        return d.April_15
      })

      radiusMax = d3.max(candidate_b, function(d){
        return d.April_15
      })
      }
else if (timeExpressed == timelineArray[2])
  {
 var arc2 = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.May_15);
        })
        .startAngle(0)
        .endAngle(Math.PI)

      radiusMin = d3.min(candidate_b, function(d){
        return d.May_15
      })

      radiusMax = d3.max(candidate_b, function(d){
        return d.May_15
      })

setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}
else if (timeExpressed == timelineArray[3])
  {
 var arc2 = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.June_15);
        })
        .startAngle(0)
        .endAngle(Math.PI)

      radiusMin = d3.min(candidate_b, function(d){
        return d.June_15
      })

      radiusMax = d3.max(candidate_b, function(d){
        return d.June_15
      })

setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}
else if (timeExpressed == timelineArray[4])
  {
 var arc2 = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.July_15);
        })
        .startAngle(0)
        .endAngle(Math.PI)

      radiusMin = d3.min(candidate_b, function(d){
        return d.July_15
      })
      radiusMax = d3.max(candidate_b, function(d){
        return d.July_15
      })
setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}
else if (timeExpressed == timelineArray[5])
  {
 var arc2 = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.August_15);
        })
        .startAngle(0)
        .endAngle(Math.PI)

      radiusMin = d3.min(candidate_b, function(d){
        return d.August_15
      })
      radiusMax = d3.max(candidate_b, function(d){
        return d.August_15
      })
      setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}
else if (timeExpressed == timelineArray[6])
  {
 var arc2 = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.September_15);
        })
        .startAngle(0)
        .endAngle(Math.PI)

      radiusMin = d3.min(candidate_b, function(d){
        return d.September_15
      })
      radiusMax = d3.max(candidate_b, function(d){
        return d.September_15
      })
      setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 10]);
}
else if (timeExpressed == timelineArray[7])
  {
 var arc2 = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.October_15);
        })
        .startAngle(0)
        .endAngle(Math.PI)

      radiusMin = d3.min(candidate_b, function(d){
        return d.October_15
      })
      radiusMax = d3.max(candidate_b, function(d){
        return d.October_15
      })
      setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}
else if (timeExpressed == timelineArray[8])
  {
 var arc2 = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.November_15);
        })
        .startAngle(0)
        .endAngle(Math.PI)

      radiusMin = d3.min(candidate_b, function(d){
        return d.November_15
      })
      radiusMax = d3.max(candidate_b, function(d){
        return d.November_15
      })
      setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}
else if (timeExpressed == timelineArray[9])
  {
 var arc2 = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.December_15);
        })
        .startAngle(0)
        .endAngle(Math.PI)

      radiusMin = d3.min(candidate_b, function(d){
        return d.December_15
      })
      radiusMax = d3.max(candidate_b, function(d){
        return d.December_15
      })
      setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}
else if (timeExpressed == timelineArray[10])
  {
 var arc2 = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.January_16);
        })
        .startAngle(0)
        .endAngle(Math.PI)

      radiusMin = d3.min(candidate_b, function(d){
        return d.January_16
      })
      radiusMax = d3.max(candidate_b, function(d){
        return d.January_16
      })
      setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}
else if (timeExpressed == timelineArray[11])
  {
 var arc2 = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(function(d){
            return setRadius(d.February_16);
        })
        .startAngle(0)
        .endAngle(Math.PI)

      radiusMin = d3.min(candidate_b, function(d){
        return d.February_16
      })
      radiusMax = d3.max(candidate_b, function(d){
        return d.February_16
      })
      setRadius = d3.scale.sqrt()
              .domain([radiusMin, radiusMax])
              .range([0, 70]);
}


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

function CreateSplitLegend(minRadius, maxRadius){
    var legend = svg.append("g")
    legend.selectAll("text")
        .data(["Legend"]).enter().append('text')
        .attr("x", function(){return projection([-74.672189, 30.967841])[0]-radiusMin(mean)-5; })
        .attr("y", function(){return projection([-74.672189, 30.967841])[1]-radiusMax(position)-5; })
        .html(function (d){return d})
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
