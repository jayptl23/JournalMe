import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteNote, getNote } from '../../actions/journals';

const NoteItem = ({
  note: { title, body, date, _id },
  getNote,
  deleteNote,
  journals: { journal },
}) => {
  const onClick = (e) => {
    deleteNote(journal._id, _id);
  };

  const handleEdit = (e) => {
    getNote(journal._id, _id);
  };

  return (
    <div className='post p-1 my-1'>
      <h4>{title}</h4>
      <div>
        <p className='my-1'>{body}</p>
        <p className='post-date'>
          <Moment fromat='YYYY/MM/DD'>{date}</Moment>
        </p>
        <Link to={`/note/${journal._id}/${_id}`}>
          {' '}
          <button
            type='button'
            className='btn btn-primary'
            onClick={handleEdit}
          >
            Edit
          </button>
        </Link>
        <button type='button' className='btn btn-danger' onClick={onClick}>
          <i className='fas fa-times'></i>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  journals: state.journals,
});

export default connect(mapStateToProps, { deleteNote, getNote })(NoteItem);
