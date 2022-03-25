import React from "react";
import Tempelate from "./Tempelate";
import NumberFormat from "react-number-format";

function Container(props) {
  const { totalConfirmed, totalRecovered, totalDeaths, country } = props;

  return (
    <div>
      <h1
        style={{
          textTransform: "capitalize",
        }}
      >
        {" "}
        {country === "" ? "Corona Cases All Around World" : country}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "honeydew",
        }}
      >
        <Tempelate>
          <span className="tryit">Total Confirmed </span> <br />
          <span>
            {
              <NumberFormat
                value={totalConfirmed}
                displayType="text"
                thousandSeparator={true}
              />
            }
          </span>
        </Tempelate>

        <Tempelate>
          <span className="tryit">Total Recovered </span> <br />
          <span>
            {
              <NumberFormat
                value={totalRecovered}
                displayType="text"
                thousandSeparator={true}
              />
            }
          </span>
        </Tempelate>

        <Tempelate>
          <span className="tryit">Total Deaths </span> <br />
          <span>
            {
              <NumberFormat
                value={totalDeaths}
                displayType="text"
                thousandSeparator={true}
              />
            }
          </span>
        </Tempelate>
      </div>
    </div>
  );
}

export default Container;
