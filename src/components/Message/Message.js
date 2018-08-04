import React, { Component } from "react";
import "./Message.css";
import data from "../../data/small.json"; // get the json data
import MessageData from ".";

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.parseData = this.parseData.bind(this);
  }

  // this function parse the data and store into the new item object
  // which returns into an array,  and pass it on to MessageData

  parseData(data_json) {
    var email_arr = [];
    data_json.forEach(function(element) {
      var email_obj = {
        message_id: "",
        email_content: "",
        x_filename: "",
        email_date: "",
        email_subject: "",
        email_from: "",
        email_from_address: "",
        email_to: ""
      };

      var start_email_content = false;
      var element_parsed = element["message"].split("\n");
      //console.log(element_parsed);
      element_parsed.forEach(function(message) {
        if (start_email_content) {
          // when x final is found concat the rest into a string
          // push the line together in a string
          email_obj["email_content"] = email_obj["email_content"] + message;
        }

        if (message.split(": ")[0] === "Message-ID") {
          email_obj["message_id"] = message.split(": ")[1];
        }

        if (message.split(": ")[0] === "X-FileName") {
          email_obj["x_filename"] = message.split(": ")[1];
          start_email_content = true;
        }

        if (message.split(": ")[0] === "Date") {
          email_obj["email_date"] = message.split(": ")[1];
        }

        if (message.split(": ")[0] === "Subject") {
          email_obj["email_subject"] = message;
        }

        if (message.split(": ")[0] === "From") {
          email_obj["email_from_address"] = message.split(": ")[1];
        }
        if (message.split(": ")[0] === "X-From") {
          email_obj["email_from"] = message.split(": ")[1];
        }
        if (message.split(": ")[0] === "X-To") {
          email_obj["email_to"] = message.split(": ")[1];
        }
      });

      email_arr.push(email_obj);
      //console.log("========================");
    });

    return email_arr;
  }

  render() {
    var email_arr = this.parseData(data);
    return (
      <div>
        <MessageData data={data} email_arr={email_arr} />
      </div>
    );
  }
}
