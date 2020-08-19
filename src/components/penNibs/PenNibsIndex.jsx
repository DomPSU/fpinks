import React from 'react';
import PropTypes from 'prop-types';
import Index from '../shared/Index';

export default function PenNibsIndex(props) {
  const { link } = props;
  return <Index link={link} />;
}

PenNibsIndex.propTypes = {
  link: PropTypes.string,
};
