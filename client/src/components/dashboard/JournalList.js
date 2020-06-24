import React from 'react';
import JournalItem from './JournalItem';

const JournalList = ({ journals }) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Notes</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {journals.map((journal) => (
          <JournalItem key={journal._id} journal={journal} />
        ))}
      </tbody>
    </table>
  );
};

export default JournalList;
