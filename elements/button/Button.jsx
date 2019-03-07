import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Button.css';

const Button = ({ disabled, value, onClick, type }) => (
    <button
        className={ classNames('button', 'type-' + type) }
        disabled={ disabled }
        onClick={ e => onClick(e) }
        type="button"
    >
        { value }
    </button>
);

Button.propTypes = {
    type: PropTypes.string,     // either 'primary' or 'secondary'
    disabled: PropTypes.bool,
    onChange: PropTypes.func,   // function to execute on clicking button
    value: PropTypes.string,    // string value inside of button
};

Button.defaultProps = {
    disabled: false,
    type: 'secondary'
};

export default Button;
