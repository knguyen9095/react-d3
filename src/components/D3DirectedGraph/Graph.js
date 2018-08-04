// d3 based from https://bl.ocks.org/mbostock/4062045
import d3Wrap from "react-d3-wrap";
import * as d3 from "d3";

import "./graph.css";

const Graph = d3Wrap({
  initialize(svg, data, options) {},

  update(svg, data, options) {
    const width = this.props.width;
    const height = this.props.height;

    const chart = d3.select(svg).attr("class", "force-directed");
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const radius = 10;

    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id(function(d) {
            return d.id;
          })
          .distance(100)
      )

      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Update links
    let link = chart.selectAll("line").data(data.links);

    link.exit().remove();

    // Enter links
    let linkEnter = link
      .enter()
      .append("line")
      .attr("stroke-width", function(d) {
        return Math.sqrt(d.value);
      });

    link = linkEnter.merge(link);

    // Update nodes
    let node = chart
      .selectAll("g")
      .data(data.nodes)
      .enter()
      .append("g");

    node.exit().remove();

    //Enter nodes
    let nodeEnter = node
      //.enter()
      .append("circle")
      .attr("r", radius)
      .attr("fill", function(d) {
        return color(d.group);
      })
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    node = nodeEnter.merge(node);

    //update the labels

    //update the text
    let label = chart.selectAll("text").data(data.nodes);
    label.exit().remove();

    //enter the text
    let labelEnter = label
      .enter()
      .append("text")
      .attr("dx", 20)
      .attr("dy", ".5em")
      .text(function(d) {
        return d.id;
      });
    label = labelEnter.merge(label);

    //console.log(node);

    node.append("title").text(function(d) {
      return d.id;
    });

    simulation.nodes(data.nodes).on("tick", ticked);

    simulation.force("link").links(data.links);

    simulation.alpha(1).restart();

    function ticked() {
      node
        .attr("cx", function(d) {
          return (d.x = Math.max(radius, Math.min(width - radius, d.x)));
        })
        .attr("cy", function(d) {
          return (d.y = Math.max(radius, Math.min(height - radius, d.y)));
        });

      link
        .attr("x1", function(d) {
          return d.source.x;
        })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return d.target.x;
        })
        .attr("y2", function(d) {
          return d.target.y;
        });

      label
        .attr("x", function(d) {
          return d.x;
        })
        .attr("y", function(d) {
          return d.y;
        });
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  },

  destroy() {
    // Optional clean up when a component is being unmounted...
  }
});

export default Graph;
