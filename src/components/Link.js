import React from 'react';
import MuiLink from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Link({...p}) {
	return <MuiLink component={RouterLink} {...p}/>;
}

Link.propTypes = {
	to: PropTypes.string.isRequired,
	children: PropTypes.node,
};
