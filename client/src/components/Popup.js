import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import DatePicker from "react-datepicker";

class Popup extends Component {
  createPopup = () => {
    const { popup, title, content, dueDate, onChange, onCreate, onDate, onUpdate } = this.props
    confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
            <h1>INPUTBOX BOX</h1>
              <div>
                <input
                  type="text"
                  name="title"
                  autoComplete="off"
                  value={title}
                  onChange={onChange}
                />
                <textarea
                  name="content"
                  value={content}
                  onChange={onChange}
                />
                <DatePicker
                  selected={dueDate}
                  onChange={onDate}
                />
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