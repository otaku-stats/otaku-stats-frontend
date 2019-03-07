import React, { Component } from 'react'
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import './QueryBuilder.css';
import Input from '../../elements/input/Input';
import Button from '../../elements/button/Button';

const OperatorConstants = {
    AND: 'AND',
    OR: 'OR'
};

const queryColumns = [
    {
        name: 'Name',
        data_type: 'string'
    },
    {
        name: 'Description',
        data_type: 'string'
    },
    {
        name: 'Genre',
        data_type: 'string'
    },
    {
        name: 'Release Date',
        data_type: 'date'
    },
    {
        name: 'Rating',
        data_type: 'number'
    }
];

const emptyExpression = {
    l_operand: '',
    r_operand: '',
    data_type: '',
};

const initialState = {
    expressions: [
        emptyExpression
    ],
    operator: OperatorConstants.AND
};

class QueryBuilder extends Component {
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
            expressions[expressionIndex].data_type = queryColumns.find(col => value === col.name).data_type;
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
        //TODO implement this
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
                        <div key={ 'col-' + index } className="form-row">
                            <div className="expression">
                                <select
                                    className="column-select"
                                    onChange={ e => this.handleExpressionInputChange(e.target.value, 'l_operand', index) }
                                    defaultValue="Add criteria"
                                >
                                    <option value="Add criteria" disabled hidden>Add criteria</option>
                                    { queryColumns.map((column, index) => {
                                        return (
                                            <option
                                                key={ 'option-' + index }
                                                value={ column.name }
                                            >
                                                { column.name }
                                            </option>
                                        )})
                                    }
                                </select>
                                <Input
                                    disabled={ expression.l_operand === '' }
                                    fullWidth
                                    onChange={ e => this.handleExpressionInputChange(e.target.value, 'r_operand', index) }
                                    value={ expression.r_operand }
                                    minimal
                                />
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
                            </div>
                            {/*show AND/OR operator options only if there is more than one expression */}
                            { index === 0 && expressions.length > 1 &&
                                <div className="operator-change">
                                    <a
                                        className={ classNames('operator', operator === OperatorConstants.AND ? 'active' : 'inactive') }
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
                            {/*show the selected operator between expressions after the first one */}
                            { index >= 1 && index !== expressions.length - 1 &&
                                <span className="operator active">
                                    { operator }
                                </span>
                            }
                        </div>
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

export default connect(mapStateToProps)(QueryBuilder);