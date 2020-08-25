import React from 'react';

export class Tooltip extends React.Component {
    render() {
        return (
            <div id="tooltip" className="tooltip" style={this.props.showTooltip}>
                <div id="tooltipHeader" className="addNotesHeader">Max limit reached. You can create maximum of {this.props.maxNotes} Notes</div>
            </div>
        );
    }
}