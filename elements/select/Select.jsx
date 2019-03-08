import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Select.css';

const Select = ({ onChange, options, disabled, fullWidth }) => (
    <select
        onChange={ e => onChange(e) }
        defaultValue="Add criteria"
        disabled={ disabled }
        className={ classNames('select', fullWidth && 'full-width') }
    >
        <option value="Add criteria" disabled hidden>Add criteria</option>
        { options.map((option, index) => {
            return (
                <option
                    className="option"
                    key={ 'option-' + index }
                    value={ option.value }
                >
                    { option.label }
                </option>
            )})
        }
    </select>
);

Select.propTypes = {
    options: PropTypes.array.isRequired,    // either 'primary' or 'secondary'
    disabled: PropTypes.bool,
    onChange: PropTypes.func,               // function to execute on selecting an option
    fullWidth: PropTypes.bool,              // make select expand to width of container
};

Select.defaultProps = {
    disabled: false,
    fullWidth: false
};

export default Select;
