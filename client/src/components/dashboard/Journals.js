import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getJournals } from '../../actions/journals';
import CreateJournal from '../journal-forms/CreateJournal';
import JournalList from './JournalList';

const Journals = ({
  auth: { user },
  journals: { journals, loading },
  getJournals,
}) => {
  useEffect(() => {
    getJournals();
  }, [getJournals]);

  return (loading && journals === null) || user === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>{`${user.name}'s`} Journals</h1>
      {/*
      <p className='lead'>
        <i className='fas fa-user'></i> {user && user.name}
      </p>*/}
      {journals.length === 1 ? (
        <>
          <p>
            You have <strong>1</strong> journal
          </p>
        </>
      ) : (
        <>
          <p>
            You have <strong>{journals.length}</strong> journals
          </p>
        </>
      )}
      <CreateJournal />
      <JournalList journals={journals} />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  journals: state.journals,
});

export default connect(mapStateToProps, { getJournals })(Journals);
