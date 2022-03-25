import React, { useEffect, useState } from "react";
import "./App.css";
import LineGraph from "./Components/LineGraph";
import Container from "./Components/Container";
import axios from "./Components/axios";

function App() {
  const [totalconfirmed, setTotalconfirmed] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [covidSummary, setCovidSummay] = useState({});
  const [country, setCountry] = useState("");
  const [days, setDays] = useState(7);
  const [coronaCountAr, setCoronaCountAr] = useState([]);
  const [label, setLabel] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/summary`)
      .then((res) => {
        setLoading(false);

        if (res.status === 200) {
          setTotalconfirmed(res.data.Global.TotalConfirmed);
          setTotalRecovered(res.data.Global.NewRecovered);
          setTotalDeaths(res.data.Global.TotalDeaths);
          setCovidSummay(res.data);
        }

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2); // 011 -> 11 and 5-> 05
    const _date = d.getDate();

    return `${year}-${month}-${_date}`;
  };

  const changeCountry = (e) => {
    setCountry(e.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - days));

    // console.log(from, to);
    reportByDate(e.target.value, from, to);
  };

  const changeDays = (e) => {
    setDays(e.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - e.target.value));
    reportByDate(country, from, to);
  };

  const reportByDate = (countrySlug, from, to) => {
    axios
      .get(
        `/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`
      )
      .then((res) => {
        console.group(res);

        const yAxisCoronaCount = res.data.map((d) => d.Cases);
        const xAxisLabel = res.data.map((d) => d.Date);
        const covidDetails = covidSummary.Countries.find(
          (country) => country.Slug === countrySlug
        );

        setCoronaCountAr(yAxisCoronaCount);
        setTotalconfirmed(covidDetails.TotalConfirmed);
        setTotalRecovered(covidDetails.TotalRecovered);
        setTotalDeaths(covidDetails.TotalDeaths);
        setLabel(xAxisLabel);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <p>Data is being fetched...</p>;
  }

  return (
    <div className="App">
      <Container
        totalConfirmed={totalconfirmed}
        totalRecovered={totalRecovered}
        totalDeaths={totalDeaths}
        country={country}
      />

      <div
        style={{
          marginTop: "10px",
        }}
      >
        <select
          value={country}
          onChange={changeCountry}
          style={{
            backgroundColor: "lavender",
          }}
        >
          <option value=""> Select Country </option>
          {covidSummary.Countries &&
            covidSummary.Countries.map((country) => (
              <option key={country.Slug} value={country.Slug}>
                {country.Country}
              </option>
            ))}
        </select>
        <select
          value={days}
          onChange={changeDays}
          style={{
            backgroundColor: "honeydew",
          }}
        >
          <option value="7"> Last week</option>
          <option value="30"> Last Month</option>
          <option value="90"> Last Quarter</option>
          <option value="365">Last year</option>
        </select>
      </div>

      <LineGraph yAxis={coronaCountAr} label={label} />
    </div>
  );
}

export default App;
