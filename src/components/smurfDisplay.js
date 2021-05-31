import React from 'react';
import { connect } from 'react-redux';
import Smurf from './Smurf';

export class smurfDisplay extends React.Component {
    render() {
        const { smurfs } = this.props

        console.log('Smurf Display Component', smurfs)
        return(
            <div>
                {smurfs.length > 0 &&
                    smurfs.map((smurf) => {
                        return <Smurf smurf = {smurf} key = {smurf.id} />
                    })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.smurfs)
    return {
        smurfs: state.smurfs,
        isLoading: state.isLoading,
    }
}

export default connect (mapStateToProps)(smurfDisplay)