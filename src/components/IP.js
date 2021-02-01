import React, { useRef } from "react";

import { ReactComponent as IconArrow } from "../images/icon-arrow.svg";

import "./IP.css";

const IP_DATA = {
  ip: "192.212.174.101",
  location: "Brooklyn, NY 10001",
  timezone: "UTC -05:00",
  isp: "SpaceX Starlink",
};

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

export default function IP() {
  const inputRef = useRef(null);

  const fetchIPInfo = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div className="IP">
      <h1 className="IP__Title">IP Address Tracker</h1>
      <Input inputRef={inputRef} clickHandler={fetchIPInfo} />
      <InfoDetails data={IP_DATA} />
    </div>
  );
}
