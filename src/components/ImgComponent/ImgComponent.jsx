import React from "react";
import "./imgComponent.css";
import headLogo from "../../assets/img-comp-head-img.svg";

const ImgComponent = (props) => {
  return (
    <div className="imgComponentContainer">
      <div className="imgComponentHeader">
        <img src={headLogo} />
      </div>
      <div className="imgComponentImgContainer">
        <img className="imgComponentImg" src={props.img} />
      </div>
      <div className="imgComponentText">
        <div className="imgComponentTextInner">{props.text}</div>
        <div className="imgComponentSmallText">{props.name}</div>
      </div>
    </div>
  );
};

export default ImgComponent;
