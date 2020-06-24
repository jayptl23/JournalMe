import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createJournal } from '../../actions/journals';

const CreateJournal = ({ createJournal }) => {
  const [journalName, setJournalName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    createJournal(journalName);
    setJournalName('');
  };
  return (
    <>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Journal Name'
            name='name'
            value={journalName}
            onChange={(e) => setJournalName(e.target.value)}
          />
        </div>
        <input
          type='submit'
          value='Add Journal'
          className='btn btn-primary my-1'
        />
      </form>
    </>
  );
};

export default connect(null, { createJournal })(CreateJournal);
