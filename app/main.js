import * as d3 from "d3";

var data = {
    name : "a",
    children :[
        {
            name : "b",
            children :[]
        },
        {
            name : "b",
            children :[
                {
                    name : "d",
                    children :[]
                },
                {
                    name : "e",
                    children :[]
                }
            ]
        },
        {
            name : "c",
            children :[
                {
                    name : "f",
                    children :[]
                }
            ]
        }
    ]
};

var needdata = d3.hierarchy(data);
console.log(needdata);

var height = window.screen.availHeight * 0.9;
var width = document.body.clientWidth * 0.9;
console.log(height,width);
var tree = d3.tree()
            .size([width,height-300]);
console.log(tree);

var treedata = tree(needdata);
var allnodes = treedata.descendants();

var svg = d3.select("body")
        .append("svg")
        .attr("width",width)
        .attr("height",height - 200);
var links = treedata.links();
var connectLines = svg.selectAll("polyline")
    .data(links)
    .enter()
    .append("polyline")
    .attr("points",function (d) {
        var center = (d.source.y+d.target.y)/2 + 20;
        var start = d.source.y + 20;
        var end = d.target.y + 20;
        var points = d.source.x + ","+ start + " " + d.source.x + "," + center + " " + d.target.x + ","+ center + " " + d.target.x + "," + end;
        return points;
    })
    .style("stroke","black")
    .style("fill","white")
    .style("stroke-width","2");
var rects = svg.selectAll("rect")
    .data(allnodes)
    .enter()
    .append("rect")
    .attr("x",function (d) {
        return d.x - 40;
    })
    .attr("y",function (d) {
        return d.y - 20;
    })
    .attr("width",80)
    .attr("height",100)
    .style("fill","white");
var circles = svg.selectAll("text")
            .data(allnodes)
            .enter()
            .append("text")
            .attr("x",function (d) {
                return d.x;
            })
            .attr("y",function (d) {
                return d.y + 40;
            })
            .attr('text-anchor', 'middle')
            .style('font-size', '20px')
            .text(function (d) {
                console.log(d.data.name);
                return d.data.name;
            })
            .attr('dy', 8);




