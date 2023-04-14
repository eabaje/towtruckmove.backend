import { useEffect, useState } from "react";
import PropTypes from "prop-types";
const CustomPopup = (props) => {
  const [show, setShow] = useState(false);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);
  console.log("props.show", props.show);
  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0",
      }}
      className="overlay"
    >
      <div className="popup">
        {props.title && <h2>{props.title}</h2>}

        <span className="close" onClick={closeHandler}>
          &times;
        </span>
        <div
          style={{
            height: props.height ? props.height : "auto",
          }}
          className="content"
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

CustomPopup.propTypes = {
  // title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default CustomPopup;
