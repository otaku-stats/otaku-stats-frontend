import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Input.css';

const Input = ({ disabled, autoFocus, value, onChange, fullWidth, placeholder, searchButton, onSearchClick }) => (
    <Fragment>
        <input
            type="text"
            className={ classNames('input', fullWidth && 'fullWidth') }
            disabled={ disabled }
            autoFocus={ autoFocus }
            value={ value }
            onChange={ e => onChange(e) }
            placeholder={ placeholder }
        />
        { searchButton && onSearchClick &&
            <a className="search-click-area" onClick={ () => onSearchClick() }>
                <FontAwesomeIcon icon={ faSearch } />
            </a>
        }
    </Fragment>
);

Input.propTypes = {
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    fullWidth: PropTypes.bool,
    placeholder: PropTypes.string,
    searchButton: PropTypes.bool,
    onSearchClick: PropTypes.func
};

Input.defaultProps = {
    disabled: false,
    autofocus: false,
    fullWidth: false,
    searchButton: false
};

export default Input;
