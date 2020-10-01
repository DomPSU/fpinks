import React from 'react';
import PropTypes from 'prop-types';

export default function GenericMessage(props) {
  const { message } = props;
  return <h1 className="text-center pt-5">{message}</h1>;
}

GenericMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
