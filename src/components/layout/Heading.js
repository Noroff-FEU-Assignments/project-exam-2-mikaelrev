import React from "react";
import PropTypes from "prop-types";

function Heading({ size = "1", content }) {
  const VariableHeading = `h${size}`;

  return <VariableHeading>{content}</VariableHeading>;
}

Heading.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Heading;
