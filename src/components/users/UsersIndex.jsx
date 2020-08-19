import React from 'react';
import PropTypes from 'prop-types';
import Index from '../shared/Index';

export default function UsersIndex(props) {
  const { link } = props;
  return <Index link={link} />;
}

UsersIndex.propTypes = {
  link: PropTypes.string,
};
