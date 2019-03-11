import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import './SearchQueryBuilder.css';
import Input from '../../elements/input/Input';
import Button from '../../elements/button/Button';
import Select from '../../elements/select/Select';
import { AppConstants } from '../../resources/AppConstants';

const OperatorConstants = {
    AND: 'AND',
    OR: 'OR'
};

const queryColumns = [
    {
        label: 'Title',
        value: 'title',
        data_type: 'string'
    },
    {
        label: 'Synopsis',
        value: 'synopsis',
        data_type: 'string'
    },
    {
        label: 'Genre',
        value: 'genre',
        data_type: 'string'
    },
    {
        label: 'Release Date',
        value: 'release date',
        data_type: 'date'
    },
    {
        label: 'Min. score',
        value: 'score',
        data_type: 'number'
    },
    {
        label: 'Type',
        value: 'type',
        options: ['TV', 'Movie'], //TODO implement an options dropdown if any column has options
        data_type: 'string'
    }
];

const emptyExpression = {
    l_operand: queryColumns[0].value,
    r_operand: '',
    data_type: queryColumns[0].data_type
};

const initialState = {
    expressions: [
        emptyExpression
    ],
    operator: OperatorConstants.AND
};

class SearchQueryBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleExpressionInputChange(e, propName, expressionIndex) {
        // deep clone our array of objects (https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript)
        const expressions = this.state.expressions.map(a => ({...a}));
        // get value from select element. checking undefineds here because value could be 0
        const value = e.value !== undefined && e.label !== undefined ? e.value : e;

        expressions[expressionIndex][propName] = value;

        if (propName === 'l_operand') {
            expressions[expressionIndex].data_type = queryColumns.find(col => value === col.value).data_type;
        }

        this.setState({
            expressions
        });
    }

    addOrRemoveExpression(type, index) {
        // deep clone our array of objects (https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript)
        const expressions = this.state.expressions.map(a => ({...a}));

        if (type === 'add') {
            expressions.push(emptyExpression);
        } else if (type === 'remove') {
            expressions.splice(index, 1);
        }

        this.setState({
            expressions
        });
    }

    clearForm() {
        this.setState(initialState);
    }

    searchAnime() {

    }

    render() {
        const { expressions, operator } = this.state;

        return (
            <form className="search-form">
                { expressions.map((expression, index) => {
                    return (
                        <Fragment key={ 'col-' + index }>
                        <div className="form-row">
                            <div className="select-container">
                                <Select
                                    options={ queryColumns }
                                    onChange={ e => this.handleExpressionInputChange(e.target.value, 'l_operand', index) }
                                    size={ AppConstants.Sizes.fill }
                                    selected={ expression.l_operand }
                                />
                            </div>
                            <div className="input-container">
                                <Input
                                    // disabled={ expression.l_operand === '' }
                                    fullWidth
                                    onChange={ e => this.handleExpressionInputChange(e.target.value, 'r_operand', index) }
                                    value={ expression.r_operand }
                                    minimal
                                />
                            </div>
                            <div className="add-remove-icons">
                                { expressions.length > 1 &&
                                    <a onClick={ () => this.addOrRemoveExpression('remove', index) }>
                                        <FontAwesomeIcon icon={ faMinusCircle } />
                                    </a>
                                }
                                {/* offer option to add another expression at the last expression */}
                                { index === expressions.length - 1  &&
                                    <a onClick={ () => this.addOrRemoveExpression('add', index) }>
                                        <FontAwesomeIcon icon={ faPlusCircle } />
                                    </a>
                                }
                            </div>
                            {/*show AND/OR operator options only if there is more than one expression */}
                            { index === 0 && expressions.length > 1 &&
                                <div className="operator-switch">
                                    <a
                                        className={ classNames('operator first-option', operator === OperatorConstants.AND ? 'active' : 'inactive') }
                                        onClick={ () => this.setState({ operator: OperatorConstants.AND }) }
                                    >
                                        { OperatorConstants.AND }
                                    </a>
                                    <a
                                        className={ classNames('operator', operator === OperatorConstants.OR ? 'active' : 'inactive') }
                                        onClick={ () => this.setState({ operator: OperatorConstants.OR }) }
                                    >
                                        { OperatorConstants.OR }
                                    </a>
                                </div>
                            }

                        </div>
                        {/*show the selected operator between expressions after the first one */}
                        { index >= 0 && index !== expressions.length - 1 &&
                            <div className="operator active operator-between">
                                { operator }
                            </div>
                        }
                        </Fragment>
                    );
                }) }
                <div className="form-actions">
                    <Button value="Search" type="primary" onClick={ () => this.searchAnime() }/>
                    <Button value="Cancel" onClick={ () => this.clearForm() }/>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        animeStats: state.stats.animeStats
    }
};

export default connect(mapStateToProps)(SearchQueryBuilder);