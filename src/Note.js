import React from 'react';

export class Note extends React.Component {
    render() {
        return (
            <div className="note" id={"note" + this.props.id} onBlur={this.props.noteFocusOut} onFocus={this.props.noteFocusIn}>
                <div id={"note" + this.props.id + "header"} className="noteHeader" onClick={this.props.noteFocusIn}>
                    <a onClick={this.props.deleteNote} className="button remove">X</a>
                </div>
                <div className="note_cnt">
                    <textarea className="cnt" id={"txt" + this.props.id} onChange={this.props.saveNote} placeholder="Add notes here" rows="6"></textarea>
                </div>
            </div>
        );
    }
}