import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteJournal } from '../../actions/journals';

const JournalItem = ({ journal, deleteJournal }) => {
  const onClick = (e) => {
    deleteJournal(journal._id);
  };

  return (
    <tr>
      <td>
        <Link to={`/notes/${journal._id}`}>{journal.name}</Link>
      </td>
      <td>{journal.noteCount}</td>
      <td>
        <button className='btn btn-danger' onClick={onClick}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default connect(null, { deleteJournal })(JournalItem);
