import React from 'react'
import { connect } from 'react-redux'
import apis from '../apis'
import { ADD_SMURF, SET_ERROR } from '../types'

class AddForm extends React.Component {
    state = {
        id: new Date(),
        name: '',
        position: '',
        nickname: '',
        description: '',
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    addSmurf = () => {
        apis.post('/smurfs', this.state)
            .then((res) => {
                this.props.dispatch({
                    type: ADD_SMURF,
                    payload: res.data,
                })
            })
            .catch((err) =>
                this.props.dispatch({ type: SET_ERROR, payload: err.message })
            )
        this.setState({})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (!this.state.name) {
                throw new Error('Please enter a name')
            }
            if (!this.state.nickname) {
                throw new Error('Please enter a nickname')
            }
            if (!this.state.position) {
                throw new Error('Please enter a position')
            }
            this.addSmurf()
        } catch (error) {
            this.props.dispatch({ type: SET_ERROR, payload: error.message })
        }
    }

    render() {
        console.log(this.state)
        return (
            <section>
                <h2>Add Smurf</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <br />
                        <input
                            onChange={this.handleChange}
                            name="name"
                            id="name"
                            value={this.state.name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Position:</label>
                        <br />
                        <input
                            onChange={this.handleChange}
                            name="position"
                            id="name"
                            value={this.state.position}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Nickname:</label>
                        <br />
                        <input
                            onChange={this.handleChange}
                            name="nickname"
                            id="name"
                            value={this.state.nickname}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Description:</label>
                        <br />
                        <input
                            onChange={this.handleChange}
                            name="description"
                            id="name"
                            value={this.state.description}
                        />
                    </div>
                    <div
                        data-testid="errorAlert"
                        className="alert alert-danger"
                        role="alert"
                    >
                        Error:
                        {this.props.error === null
                            ? ' No Errors'
                            : this.props.error}
                    </div>
                    <button>Submit Smurf</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        smurfs: state.smurfs,
        isLoading: state.isLoading,
        error: state.error,
    }
}

export default connect(mapStateToProps, (dispatch) => ({ dispatch }))(AddForm)

//Task List:
//1. Connect the errorMessage, setError and addSmurf actions to the AddForm component.
//2. Replace all instances of the errorMessage static variable with your error message state value. 
//3. Within the handleSubmit function, replace the static assignment to errorMessage with a call to the setError action. Test that an error is displayed when this validation code fails.
//4. Within the handleSubmit function, call your addSmurf action with the smurf name, position, nickname and summury passed as arguments. Test that a smurf is correctly added to when the form is submitted.