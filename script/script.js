var margin = {t:50,r:125,b:50,l:125};
var width = document.getElementById('plot').clientWidth - margin.r - margin.l,
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

console.log(width,height);

var canvas = d3.select('.plot')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height+margin.t+margin.b)
    .append('g')
    .attr('class','plot')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//Scale for the size of the circles
var scaleR = d3.scale.sqrt().domain([5,100]).range([5,100]);


d3.csv('data/olympic_medal_count.csv', parse, dataLoaded);

function dataLoaded(err,rows){

    var year = 1900;
    rows.sort(function(a,b){
        //Note: this is called a "comparator" function
        //which makes sure that the array is sorted from highest to lowest
        return b[year] - a[year];
    });

    //Note: this returns "top5" as a subset of the larger array "rows", containing positions 0,1,2,3,4
    var top5 = rows.slice(0,5);

    //Call the draw function
    draw(top5, year);

    //TODO: fill out this function
    /*d3.selectAll('.btn-group .year').on('click',function(){

        var year = d3.select(this).data('year');
    console.log("Show top 5 medal count for: " + year);
        rows.sort(function(a,b){
        return b[year] - a[year];
        });
        var top5 = rows.slice(0,5);
        draw(top5, year);
 
    });*/

   d3.selectAll('.btn').on('click',function(){

        var year = $(this).data('ty');
    console.log("Show top 5 medal count for: " + year);
        rows.sort(function(a,b){
            //Note: this is called a "comparator" function
            //which makes sure that the array is sorted from highest to lowest
            return b[year] - a[year];
        });

        //Note: this returns positions 0,1,2,3,4 of the "rows" array
        var top5 = rows.slice(0,5);
        draw(top5, year);
    });




}

function draw(data, year){
      
    var  nodes = canvas.selectAll ('.group')
        .data(data, function(d){return d.country;});
    
    var nodesEnter = nodes.enter().append ('g')
    .attr('class', 'group')
    .attr('transform', function(d,i){
            return 'translate(' + i*(width/4) + ',' + 0 + ')';
        });
    nodesEnter.append('circle')
    .attr ('r', function(d){
        return scaleR(d[year]);
    })
    .style('fill', 'rgba(0, 0, 0, .0)')
    .style('stroke', 'rgb(150,00,00')
    .style('stroke-width','2px');
    nodesEnter.append('text')
        .attr('class','name')
        .text(function(d){
            return d.country;
        })
        .attr('transform','translate (0,175)')
        .attr('text-anchor','middle');
    nodesEnter.append('text')
        .attr('class','medals')
        .text(function(d){
            return d[year];
        })
        .attr('text-anchor','middle')
        .style('font-size', '25px')
        .style('fill', 'rgb(150,0,0)')
        .attr('transform','translate(0,10)');
    nodes.exit()
        .transition()
        .attr('transform', function(d,i){
            return 'translate(' + i*(width/4) + ',' + height+ ')';
        })
        .style ('opacity',0)
        .remove();
    var transition = nodes.transition()
        .duration(500)
        .attr('transform', function(d,i){
            return 'translate(' + i*(width/4) + ',' + height/2 + ')';
        })
        transition.select('circle')
        .attr ('r', function(d){
            return scaleR(d[year]);
         })
         transition.select('.medals')
        .text(function(d){
            return d[year];
        })
        

        console.log(nodes);
        

    }



    //TODO: Complete drawing function, accounting for enter, exit, update
    //Note that this function requires two parameters
    //The second parameter, "year", determines which one of the three years (1900,1960,2012) to draw the medal counts based on


function parse(row){
    //@param row is each unparsed row from the dataset
    return {
        country: row['Country'],
        1900: +row['1900'],
        1960: +row['1960'],
        2012: +row['2012']
    };
}