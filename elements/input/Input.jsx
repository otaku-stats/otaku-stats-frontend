import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Input.css';

const Input = ({ disabled, autoFocus, value, onChange, fullWidth, placeholder }) => (
    <input
        type="text"
        className={ classNames('input', fullWidth && 'fullWidth') }
        disabled={ disabled }
        autoFocus={ autoFocus }
        value={ value }
        onChange={ e => onChange(e) }
        placeholder={ placeholder }
    />
);

Input.propTypes = {
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    fullWidth: PropTypes.bool,
    placeholder: PropTypes.string
};

Input.defaultProps = {
    disabled: false,
    autofocus: false,
    fullWidth: false
};

export default Input;
