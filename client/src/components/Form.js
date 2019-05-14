import React from 'react';

const Form = ({ onOpen }) => {
  return (
    <div className="form">
      <div className="create-button" onClick={onOpen}>
        <div>추가</div>
      </div>
    </div>
  );
};

export default Form;