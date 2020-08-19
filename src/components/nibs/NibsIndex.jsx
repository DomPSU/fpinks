import React from 'react';
import PropTypes from 'prop-types';
import Index from '../shared/Index';

export default function NibsIndex(props) {
  const { link } = props;
  return <Index link={link} />;
}

NibsIndex.propTypes = {
  link: PropTypes.string,
};
