import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ disabled, value, onClick }) => (
    <button
        className="button"
        disabled={ disabled }
        onClick={ e => onClick(e) }
    >
        { value }
    </button>
);

Button.propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
};

Button.defaultProps = {
    disabled: false
};

export default Button;
