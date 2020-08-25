import React from 'react';
import './App.css';
import { ReportHeader } from './ReportHeader';
import { SearchBox } from './SearchBox';
import { NotesButton } from './NotesButton';
import { Tooltip } from './Tooltip';
import { Note } from './Note';

let idArray = [];
const maxNotes = 50;

for (var index = 0; index < maxNotes; index++) {
  idArray.push(index);
}
let notesShown = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { noteList: new Map(), tooltipStyle: { display: "none" } };
    this.addNoteWrapper = this.addNoteWrapper.bind(this);
    this.deleteAllNotes = this.deleteAllNotes.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.search = this.search.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.toggleNotes = this.toggleNotes.bind(this);
  }

  componentWillMount() {
    var storageAllowed = false;
    if (typeof (Storage) !== "undefined") {
      storageAllowed = true;
    }
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (storageAllowed && !isIE) {
      this.loadNotes();
    } else {
      alert("Browser not supported. Use Chrome or Firefox for sticky notes to work.");
    }
  }

  componentDidMount() {
    for (let id = 0; id < maxNotes; id++) {
      var noteText = localStorage.getItem(id);
      if (noteText != null) {
        document.getElementById("txt" + id).value = noteText;
      }
    }
  }

  getElementsByClassName(node, classname) {
    var elements = [];
    var re = new RegExp("(^| )" + classname + "( |$)");
    var els = node.getElementsByTagName("*");
    for (var i = 0, j = els.length; i < j; i++)
      if (re.test(els[i].className))
        elements.push(els[i]);
    return elements;
  }

  loadNotes() {
    for (let id = 0; id < maxNotes; id++) {
      var noteText = localStorage.getItem(id);
      if (noteText != null) {
        idArray[id] = -1;
        this.addNote(id);
      }
    }
  }

  search(evt) {//variables
    var i;
    var content;
    var searchText = evt.target.value.toLowerCase().trim();
    var notes = this.getElementsByClassName(document.getElementById("App"), "note");

    if (searchText.indexOf("*") == -1) {//Code for single key search
      if (searchText.lastIndexOf("count:") == 0) {//code for counting no of occurence of search key
        var text = searchText.substr(6).trim();
        var count = 0;
        if (text.length > 0) {
          for (i = 0; i < notes.length; i++) {
            var noteTextArea = this.getElementsByClassName(notes[i], "cnt");
            content = noteTextArea[0].value.replace(/(\n)+/g, " ").toLowerCase();
            if (content.indexOf(text) != -1) {
              count = count + 1;
            }
            notes[i].style.display = "";
          }
          document.getElementById("searchResult").innerText = "Hit: " + count;
          document.getElementById("searchResult").style.display = "block";
        } else {
          document.getElementById("searchResult").style.display = "none";
        }
      } else {//code for searching single key
        document.getElementById("searchResult").style.display = "none";

        for (i = 0; i < notes.length; i++) {
          var noteTextArea = this.getElementsByClassName(notes[i], "cnt");
          content = noteTextArea[0].value.replace(/(\n)+/g, " ").toLowerCase();
          if (content.indexOf(searchText) == -1) {
            notes[i].style.display = "none";
          } else {
            notes[i].style.display = "";
          }
        }
      }
    } else {//code for multiple key search
      var j;
      var searchKeys = searchText.split("*");
      document.getElementById("searchResult").style.display = "none";

      for (i = 0; i < notes.length; i++) {
        var noteTextArea = this.getElementsByClassName(notes[i], "cnt");
        content = noteTextArea[0].value.replace(/(\n)+/g, " ").toLowerCase();
        for (j = 0; j < searchKeys.length; j++) {
          if (searchKeys[j] !== "") {
            if (content.indexOf(searchKeys[j]) == -1) {
              notes[i].style.display = "none";
              break;
            } else {
              notes[i].style.display = "";
            }
          }
        }
      }

    }
  }

  clearSearch() {
    var searchInput = document.getElementById("searchInput");
    searchInput.value = "";
    let evt = { target: { value: "" } };
    this.search(evt);
  }

  getId() {
    let id;
    for (id = 0; id < maxNotes; id++) {
      if (idArray[id] != -1) {
        idArray[id] = -1;
        return id;
      }
    }
    if (id == maxNotes) {
      return -1;
    }
  }

  deleteAllNotes() {
    var id;
    for (id = 0; id < maxNotes; id++) {
      this.deleteNote(id);
    }
  }

  deleteNote(id) {
    this.state.noteList.delete(id);
    this.setState({ noteList: this.state.noteList });
    this.releaseId(id);
    localStorage.removeItem(id);
  }

  releaseId(id) {
    idArray[id] = id;
  }

  saveNote(id) {
    var text = document.getElementById("txt" + id).value;
    if (text.trim() != "") {
      localStorage.setItem(id, text);
    }
  }

  noteFocusIn(id) {
    document.getElementById("note" + id).style.zIndex = 970;
    document.getElementById("txt" + id).focus();
  }

  noteFocusOut(id) {
    document.getElementById("note" + id).style.zIndex = 960;
  }

  addNoteWrapper() {
    var id = this.getId();
    this.addNote(id);
  }

  addNote(id) {
    if (id != -1) {
      let note = <Note id={id} key={id}
        noteFocusOut={() => this.noteFocusOut(id)}
        noteFocusIn={() => this.noteFocusIn(id)}
        deleteNote={() => this.deleteNote(id)}
        saveNote={() => this.saveNote(id)} />;
      this.state.noteList.set(id, note);
      this.setState({
        noteList: this.state.noteList
      });
    } else {
      this.setState({ tooltipStyle: { display: "" } });
      setInterval(this.hideTooltip, 5000);
    }
  }

  hideTooltip() {
    this.setState({ tooltipStyle: { display: "none" } });
  }

  toggleNotes() {
    let notes = this.getElementsByClassName(document.getElementById("App"), "note");
    if (notesShown) {
      for (let i = 0; i < notes.length; i++) {
        notes[i].style.display = "none";
      }
      notesShown = false;
    } else {
      for (let i = 0; i < notes.length; i++) {
        notes[i].style.display = "inline-block";
      }
      notesShown = true;
    }
  }

  render() {
    let notes = Array.from(this.state.noteList).map(([k, v]) => v);
    return (
      <div className="App" id="App">
        <ReportHeader />

        <SearchBox handleKeyUp={this.search} onClick={this.clearSearch} />

        <NotesButton id="addNotes" label="Add Notes" className="addNotes notesButton" onClick={this.addNoteWrapper} />

        <Tooltip showTooltip={this.state.tooltipStyle} maxNotes={maxNotes} />

        <NotesButton id="notesToggle" label="Show/Hide Notes" className="notesToggle notesButton" onClick={this.toggleNotes} />

        <NotesButton id="deleteIcon" label="Delete All Notes" className="deleteNotes notesButton" onClick={this.deleteAllNotes} />

        {notes}
      </div>
    );
  }
}

export default App;
