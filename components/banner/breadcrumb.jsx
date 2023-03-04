import React from "react";
import { ConstantsList } from "../../constants";
import Link from "next/link";

function BreadCrumb(props) {
  const str = props.name;
  const newStr = `${str[0].toUpperCase()}${str.slice(1)}`;

  return (
    <div>
      <section id="breadcrumb" className="space">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 breadcrumb-block">
              <h2>{newStr}</h2>
            </div>
            <div className="col-sm-6 breadcrumb-block text-right">
              <ol className="breadcrumb">
                <li>
                  <span>You are here:</span>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li className="active">{props.name}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BreadCrumb;
