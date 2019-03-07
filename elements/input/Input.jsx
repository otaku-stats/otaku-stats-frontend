import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Input.css';

const Input = ({ disabled, autoFocus, value, onChange, fullWidth, placeholder, onSearchClick, minimal }) => (
    <Fragment>
        <input
            type="text"
            className={ classNames('input', fullWidth && 'fullWidth', onSearchClick && 'room-for-search-icon',
                minimal && 'minimal') }
            disabled={ disabled }
            autoFocus={ autoFocus }
            value={ value }
            onChange={ e => onChange(e) }
            placeholder={ placeholder }
        />
        { onSearchClick &&
            <a className="search-click-area" onClick={ () => onSearchClick() }>
                <FontAwesomeIcon icon={ faSearch } className="search-icon" />
            </a>
        }
    </Fragment>
);

Input.propTypes = {
    autoFocus: PropTypes.bool,      // autofocus on this input on page load
    disabled: PropTypes.bool,
    onChange: PropTypes.func,       // function to invoke on chanigng the input value
    value: PropTypes.string,
    fullWidth: PropTypes.bool,      // make input expand to width of container
    placeholder: PropTypes.string,  // placeholder text value
    onSearchClick: PropTypes.func,  // indicates that this is a search-specific input, and this is the function to execute on clicking search button
    minimal: PropTypes.bool         // give the input a minimal style
};

Input.defaultProps = {
    disabled: false,
    autofocus: false,
    fullWidth: false,
    minimal: false
};

export default Input;
