import React, { useEffect, useRef, useState } from "react";

import "./IP.css";
import { ReactComponent as IconArrow } from "../images/icon-arrow.svg";

const IP_DATA = {
  ip: "...",
  location: "...",
  timezone: "...",
  isp: "...",
};
const API_KEY = process.env.REACT_APP_IP_API_KEY;

const Input = ({ inputRef, clickHandler }) => {
  return (
    <div className="IP__Input-Container">
      <div className="IP__Input-Wrapper">
        <input
          className="IP__Input"
          name="ip"
          type="text"
          placeholder="Enter an IP Address"
          ref={inputRef}
        />
      </div>
      <div className="IP__Button" onClick={() => clickHandler()}>
        <IconArrow />
      </div>
    </div>
  );
};

const InfoDetails = ({ data }) => {
  const { ip, location, timezone, isp } = data;

  return (
    <div className="IP-Info">
      <div className="IP-Info__Field">
        <p className="IP-Field__Label">IP Address</p>
        <p className="IP-Field__Value">{ip}</p>
      </div>
      <div className="IP-Info__Field">
        <p className="IP-Field__Label">Location</p>
        <p className="IP-Field__Value">{location}</p>
      </div>
      <div className="IP-Info__Field">
        <p className="IP-Field__Label">Timezone</p>
        <p className="IP-Field__Value">{timezone}</p>
      </div>
      <div className="IP-Info__Field">
        <p className="IP-Field__Label">ISP</p>
        <p className="IP-Field__Value">{isp}</p>
      </div>
    </div>
  );
};

export default function IP({ setCoords }) {
  const [IPData, setIPData] = useState(IP_DATA);
  const inputRef = useRef(null);

  const fetchIPInfo = async (ip = null) => {
    const res = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${API_KEY}${
        ip !== null ? `&ipAddress=${ip}` : ""
      }`
    );
    const data = await res.json();

    const ip_data = {
      ip: data.ip,
      location: `${data.location.city}, ${data.location.country}`,
      timezone: `UTC ${data.location.timezone}`,
      isp: data.isp,
    };

    const coords = [data.location.lat, data.location.lng];

    setIPData(ip_data);
    setCoords(coords);
  };

  const searchByIP = async () => {
    const ip = inputRef.current.value;

    fetchIPInfo(ip);
  };

  useEffect(() => {
    fetchIPInfo();
  }, []);

  return (
    <div className="IP">
      <h1 className="IP__Title">IP Address Tracker</h1>
      <Input inputRef={inputRef} clickHandler={searchByIP} />
      <InfoDetails data={IPData} />
    </div>
  );
}
