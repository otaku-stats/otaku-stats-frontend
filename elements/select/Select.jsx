import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Select.css';
import { AppConstants } from '../../resources/AppConstants';

const Select = ({ onChange, options, disabled, size, selected }) => (
    <select
        onChange={ e => onChange(e) }
        value={ selected }
        disabled={ disabled }
        className={ classNames('select', size && 'size-' + size) }
    >
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
    options: PropTypes.array.isRequired,                // either 'primary' or 'secondary'
    onChange: PropTypes.func.isRequired,                // function to execute on selecting an option
    selected: PropTypes.any,                            // value of the selected option (yay controlled component!)
    disabled: PropTypes.bool,
    size: PropTypes.oneOf([AppConstants.Sizes.sm, AppConstants.Sizes.md, AppConstants.Sizes.lg,
        AppConstants.Sizes.fill])                       // width of select
};

Select.defaultProps = {
    disabled: false,
    fullWidth: false,
    size: 'lg'
};

export default Select;
