import React, { Component } from "react";
import "./graph.css";
import data from "../../data/small.json";
//import dataOne from "../../data/dummy_data_reference.json";
import Graph from "./Graph";
// get the json data
//var color = d3.scaleOrdinal("#98abc5", "#8a89a6");

export default class D3DirectedGraph extends Component {
  constructor(props) {
    super(props);
    this.parseData = this.parseData.bind(this);
    this.parseDataSourceTarget = this.parseDataSourceTarget.bind(this);
    this.pushData = this.pushData.bind(this);
    this.removeDupe = this.removeDupe.bind(this);
    // this.state = {
    //  data: dataOne
    // };
  }

  // remove the duplicates

  removeDupe(arr, id) {
    var remove_arr = [];
    var lookupObject = {};

    for (var i in arr) {
      lookupObject[arr[i][id]] = arr[i];
    }

    for (i in lookupObject) {
      remove_arr.push(lookupObject[i]);
    }
    return remove_arr;
  }
  // this function parse the data and combine into id.
  // this reference the nodes json
  parseData(data_json) {
    var email_arr = [];

    data_json.forEach(function(element) {
      var email_from = {
        id: "",
        group: 1
      };
      var email_to = {
        id: "",
        group: 2
      };

      var element_parsed = element["message"].split("\n");
      //console.log(element_parsed);
      element_parsed.forEach(function(message) {
        if (message.split(": ")[0] === "To") {
          email_to["id"] = message.split(": ")[1];
        }
        if (message.split(": ")[0] === "From") {
          email_from["id"] = message.split(": ")[1];
        }
      });
      email_arr.push(email_from);
      email_arr.push(email_to);
    });
    //console.log(this.removeDupe(email_arr, "id"));
    return this.removeDupe(email_arr, "id");
  }

  // this function parse the data and combine into id
  // this reference the links json
  parseDataSourceTarget(data_json) {
    var linkarr = [];
    data_json.forEach(function(element) {
      var links_obj = {
        source: "",
        target: "",
        value: 1
      };

      var element_parse = element["message"].split("\n");
      element_parse.forEach(function(message) {
        if (message.split(": ")[0] === "To") {
          links_obj["target"] = message.split(": ")[1];
        }
        if (message.split(": ")[0] === "From") {
          links_obj["source"] = message.split(": ")[1];
        }
      });
      linkarr.push(links_obj);
    });
    return linkarr;
  }

  pushData(push_array, push_arraylink) {
    var nodearray = [];
    var pusharrayhere = push_array;
    var pushlinkarray = push_arraylink;

    var node_obj = {
      nodes: "",
      links: ""
    };

    node_obj["nodes"] = pusharrayhere;
    node_obj["links"] = pushlinkarray;
    nodearray.push(node_obj);

    return nodearray;
  }

  render() {
    var email_arr = this.parseData(data);
    var link_arr = this.parseDataSourceTarget(data);
    var push_arr = this.pushData(email_arr, link_arr);
    //console.log(email_arr);
    //console.log(link_ap);
    //console.log(push_arr[0]);
    //console.log(this.state.data);

    const params = {
      data: push_arr[0],
      width: "960",
      height: "600",
      options: {
        margin: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10
        }
      }
    };
    return (
      <div>
        <Graph {...params} />
      </div>
    );
  }
}
