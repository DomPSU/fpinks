import React from 'react';
import PropTypes from 'prop-types';
import Index from '../shared/Index';

export default function InksIndex(props) {
  const { link } = props;
  return <Index link={link} />;
}

InksIndex.propTypes = {
  link: PropTypes.string,
};
