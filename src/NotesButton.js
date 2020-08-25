import React from 'react';

export class NotesButton extends React.Component {
    render() {
        return (
            <div id={this.props.id} className={this.props.className} onClick={this.props.onClick}>
                <div className="addNotesHeader">{this.props.label}</div>
            </div>
        );
    }
}