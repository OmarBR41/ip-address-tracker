import React, { useEffect, useRef, useState } from "react";

import "./IP.css";
import { ReactComponent as IconArrow } from "../images/icon-arrow.svg";
import { isValidIPV4Addr, isValidDomain } from '../utils/validations';

const IP_DATA = {
  ip: "...",
  location: "...",
  timezone: "...",
  isp: "...",
};
const API_KEY = process.env.REACT_APP_IP_API_KEY;
const DEFAULT_IP = "8.8.8.8";

const Input = ({ inputRef, clickHandler }) => (
  <div className="IP__Input-Container">
    <div className="IP__Input-Wrapper">
      <input
        ref={inputRef}
        name="ip"
        className="IP__Input"
        placeholder="Search by IP or domain"
        type="text"
        defaultValue={DEFAULT_IP}
      />
    </div>
    <div className="IP__Button" onClick={() => clickHandler()}>
      <IconArrow />
    </div>
  </div>
);

const InfoDetails = ({ data }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { ip, location, timezone, isp } = data;

  return (
    <div className={`IP-Info ${isOpen ? "IP-Info--Open" : ""}`}>
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
      <div
        className="IP-Info__Toggle"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <IconArrow />
        <span>
          <IconArrow />
        </span>
      </div>
    </div>
  );
};

export default function IP({ setCoords }) {
  const [IPData, setIPData] = useState(IP_DATA);
  const inputRef = useRef(null);

  const fetchIPInfo = useRef(() => {});

  fetchIPInfo.current = async (queryType, value) => {
    try {
      const res = await fetch(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}&${queryType}=${value}`);
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
    } catch (err) {
      alert("The IPify API might be getting blocked by an AdBlocker. Please pause any AdBlocker you have, use an incognito window or another browser to keep using this site.")
      console.error(err)
    }
  };

  const search = () => {
    const input = inputRef.current.value;
    let type = 'ipAddress';

    if (!isValidIPV4Addr(input) && isValidDomain(input)) {
      type = 'domain'
    }
    fetchIPInfo.current(type, input);
  };

  useEffect(() => {
    fetchIPInfo.current('ipAddress', DEFAULT_IP);
  }, []);

  return (
    <div className="IP">
      <h1 className="IP__Title">IP Address Tracker</h1>
      <Input inputRef={inputRef} clickHandler={search} />
      <InfoDetails data={IPData} />
    </div>
  );
}
