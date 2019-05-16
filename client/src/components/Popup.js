import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import DatePicker from "react-datepicker";

class Popup extends Component {
  createPopup = () => {
    const { popup, title, content, deadline, onChange, onCreate, onDate, onUpdate, removeDate } = this.props
    confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
            <h1>{popup.type}</h1>
              <div>
                <h3>title</h3>
                <input
                  type="text"
                  name="title"
                  autoComplete="off"
                  value={title}
                  onChange={onChange}
                />
                <h3>content</h3>
                <textarea
                  name="content"
                  value={content}
                  onChange={onChange}
                />
                <h3>deadline</h3>
                <DatePicker
                  selected={deadline}
                  onChange={onDate}
                /><p className="remove-mark" onClick={removeDate}>&times;</p>
              </div>
              <button onClick={() => {
                  onClose()
                }}
              >close</button>
              <button onClick={() => {
                if (popup.state === 'update') onUpdate()
                else onCreate()
                onClose()
              }}>save</button>
            </div>
          )
        }
      })
  }
  render() {
    return (
      <div className="popup">
          {this.createPopup()}
      </div>
    );
  }
}

export default Popup;