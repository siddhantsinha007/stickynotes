import React from 'react';

export class SearchBox extends React.Component {
    render() {
        return (
            <div className="searchDiv" id="search">
                <table id="searchTable" cellPadding="4">
                    <tbody>
                        <tr>
                            <td><span><u>S</u>earch in Notes </span></td>
                        </tr>
                        <tr>
                            <td><input id="searchInput" type="text" placeholder="Search" onKeyUp={this.props.handleKeyUp} className="searchInput"
                                accessKey="S" /></td>
                            <td><button type="submit" className="clearButton" onClick={this.props.onClick}>Clear</button></td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="textStart"><span id="searchResult" className="hitCountText"></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}