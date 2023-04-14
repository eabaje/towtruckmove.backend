import { useEffect, useState } from "react";
import PropTypes from "prop-types";
const CustomModal = (props) => {
  const [show, setShow] = useState(false);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);
  console.log("props.show", props.show);

  //   style={{      visibility: show ? "visible" : "hidden",
  //         opacity: show ? "1" : "0",
  //       }}
  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            {props.title && (
              <h5 class="modal-title" id="exampleModalLabel">
                {props.title}
              </h5>
            )}

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">{props.children}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn  btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomModal.propTypes = {
  // title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default CustomModal;
