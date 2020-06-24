import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import NoteItem from './NoteItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getJournal } from '../../actions/journals';

const Notes = ({ getJournal, journals: { journal }, match }) => {
  useEffect(() => {
    getJournal(match.params.id);
  }, [getJournal, match.params.id]);

  return journal === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Notes</h1>
      <Link to={`/note/${journal._id}`}>
        <div className='bg-primary p'>
          <h3 style={{ textAlign: 'center' }}>Add A Note</h3>
        </div>
      </Link>
      <div className='posts'>
        {journal.notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  journals: state.journals,
});

export default connect(mapStateToProps, { getJournal })(Notes);
