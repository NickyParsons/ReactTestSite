import React from "react";
import { Link } from "react-router-dom";
  
export default function Nav() {
    return <div>
        <Link to="/test" className="textLink">Test</Link><span> | </span>
        <Link to="/counter" className="textLink">Counter</Link>
    </div>;
}