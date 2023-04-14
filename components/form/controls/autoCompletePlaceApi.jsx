import { useRef, useEffect } from "react";

const AutoCompletePlace = (props) => {
  //  const autoCompleteRef = useRef();
  //  const inputRef = useRef();
  //  const options = {
  //   componentRestrictions: { country: "ng" },
  //   fields: ["address_components", "geometry", "icon", "name"],
  //   types: ["establishment"]
  //  };

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "ng" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"],
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
    });
  }, []);
  return (
    <>
      <input type="text" ref={inputRef} name={props.name} {...props} />
    </>
  );
};
export default AutoCompletePlace;
