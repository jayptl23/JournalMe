import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNote } from '../../actions/journals';

const NoteForm = ({ addNote, match, history }) => {
  const [formData, setFormData] = useState({ title: '', body: '' });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addNote(match.params.journalId, formData, history);
  };

  return (
    <>
      <p className='lead'>Say Something!</p>
      <div className='post-form'>
        <form className='form my-1' onSubmit={(e) => onSubmit(e)}>
          <input
            type='text'
            name='title'
            onChange={(e) => onChange(e)}
            value={formData.title}
            placeholder='Note Name'
          />
          <textarea
            cols='30'
            rows='10'
            name='body'
            placeholder='Enter text'
            value={formData.body}
            onChange={(e) => onChange(e)}
          ></textarea>
          <input type='submit' className='btn btn-primary my-1' />
        </form>
      </div>
    </>
  );
};

export default connect(null, { addNote })(withRouter(NoteForm));
