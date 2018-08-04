import React from "react";

export default function MessageData(props) {
  //console.log(props.email_arr[0]);
  return (
    <table>
      <tbody>
        {props.email_arr.map(row => (
          <tr>
            <td />

            <div class="inboxMessage">
              <div class="inboxHeader">
                <div class="inboxFrom">
                  {row["email_from"]} [{" "}
                  <a href="/">{row["email_from_address"]}</a> ]
                  <p>
                    {" "}
                    To: <a href="/">{row["email_to"]}</a>
                  </p>
                </div>
                <div class="inboxMainDate">
                  {row["email_date"]}
                  <p>
                    <button class="replyButton">←</button>{" "}
                    <button class="replyButton">Delete</button>
                  </p>
                </div>
              </div>
              <div class="inboxSubject"> {row["email_subject"]} </div>
              <div class="inboxMainMessage">{row["email_content"]}</div>
              <div class="line" />
              <div class="inboxBottom">
                <div class="bottomMessage">
                  Attatchment: {row["x_filename"]}
                </div>
              </div>
            </div>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
