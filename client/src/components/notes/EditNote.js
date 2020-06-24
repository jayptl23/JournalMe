import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateNote } from '../../actions/journals';
import Spinner from '../../components/layout/Spinner';

const EditNote = ({ journals: { note }, updateNote, match }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    setFormData({
      title: !note ? '' : note.title,
      body: !note ? '' : note.body,
    });
  }, [note]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedNote = { ...formData };
    updateNote(match.params.journalId, match.params.noteId, updatedNote);
  };

  return note === null ? (
    <Spinner />
  ) : (
    <>
      <p className='lead'>Add your changes...</p>
      <div className='post-form'>
        <form className='form my-1' onSubmit={onSubmit}>
          <input
            type='text'
            name='title'
            onChange={onChange}
            value={formData.title}
            placeholder='Note Name'
          />
          <textarea
            cols='30'
            rows='10'
            name='body'
            placeholder='Enter text'
            value={formData.body}
            onChange={onChange}
          ></textarea>
          <input
            type='submit'
            className='btn btn-primary my-1'
            value='Update'
          />
          <Link
            className='btn btn-dark my-1'
            to={`/notes/${match.params.journalId}`}
          >
            Go back
          </Link>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  journals: state.journals,
});

export default connect(mapStateToProps, { updateNote })(EditNote);
