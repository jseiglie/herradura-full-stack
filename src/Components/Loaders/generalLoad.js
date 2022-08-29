import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const GeneralLoad = (props) => {
  const [data, setData] = useState([]);
  const url = props.url;

  const loader = async (url) => {
    const resp = await axios.get(`${process.env.REACT_APP_APIURL}/${url}`);
    setData(resp.data);
    console.log(data);
  };

  useEffect(() => { 
    loader(url);
    props.receiveData(data, url);
  }, []);

  return <div>generalLoad</div>;
};

GeneralLoad.propTypes = {};

export default GeneralLoad;
