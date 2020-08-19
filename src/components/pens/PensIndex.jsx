import React from 'react';
import PropTypes from 'prop-types';
import Index from '../shared/Index';

export default function PensIndex(props) {
  const { link } = props;
  return <Index link={link} />;
}

PensIndex.propTypes = {
  link: PropTypes.string,
};
