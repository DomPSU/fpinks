import React from 'react';
import PropTypes from 'prop-types';
import Index from '../shared/Index';

export default function WritingSamplesIndex(props) {
  const { link } = props;
  return <Index link={link} />;
}

WritingSamplesIndex.propTypes = {
  link: PropTypes.string,
};
