import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_JOURNALS,
  GET_JOURNAL,
  JOURNALS_ERROR,
  ADD_JOURNAL,
  DELETE_JOURNAL,
  GET_NOTE,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
} from './types';

// Get current users journals
export const getJournals = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/journals');
    dispatch({ type: GET_JOURNALS, payload: res.data });
  } catch (err) {
    //console.log(`The error is: ${err}`);
    //console.log(err.response);
    dispatch({
      type: JOURNALS_ERROR,
      payload: {
        msg: err.response.data.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get a specific journal
export const getJournal = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/journals/${id}`);

    dispatch({ type: GET_JOURNAL, payload: res.data });
  } catch (err) {
    //console.log(`The error is: ${err}`);
    //console.log(err.response);
    dispatch({
      type: JOURNALS_ERROR,
      payload: {
        msg: err.response.data.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add journal
export const createJournal = (name) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name });

    const res = await axios.post('/api/journals', body, config);

    //dispatch({ type: GET_JOURNALS, payload: res.data });
    //dispatch(getJournals());
    dispatch({ type: ADD_JOURNAL, payload: res.data });
    dispatch(setAlert('Journal Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: JOURNALS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

// Delete journal
export const deleteJournal = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/journals/${id}`);
    dispatch({ type: DELETE_JOURNAL, payload: id });
    dispatch(setAlert('Journal Deleted', 'success'));
  } catch (err) {
    console.error(err);
    dispatch({
      type: JOURNALS_ERROR,
      payload: {
        msg: err.response.data.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get a specific note
export const getNote = (journalId, noteId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/journals/${journalId}/${noteId}`);
    dispatch({ type: GET_NOTE, payload: res.data });
  } catch (err) {
    //console.log(`The error is: ${err}`);
    //console.log(err.response);
    dispatch({
      type: JOURNALS_ERROR,
      payload: {
        msg: err.response.data.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add a note
export const addNote = (journalId, formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(formData);
    const res = await axios.post(`/api/journals/${journalId}`, body, config);
    dispatch({ type: ADD_NOTE, payload: res.data });
    dispatch(setAlert('Note Created', 'success'));

    if (!edit) {
      history.push(`/notes/${journalId}`);
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: JOURNALS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

// Delete a note
export const deleteNote = (journalId, noteId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/journals/${journalId}/${noteId}`);
    dispatch({ type: DELETE_NOTE, payload: res.data });
    //dispatch(getJournal(journalId)); --> makes another backend reqest
    dispatch(setAlert('Note Deleted', 'success'));
  } catch (err) {
    console.error(err);
    dispatch({
      type: JOURNALS_ERROR,
      payload: {
        msg: err.response.data.statusText,
        status: err.response.status,
      },
    });
  }
};

// Update a note
export const updateNote = (journalId, noteId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(formData);
    const res = await axios.put(
      `/api/journals/${journalId}/${noteId}`,
      body,
      config
    );
    dispatch({ type: UPDATE_NOTE, payload: res.data });
    dispatch(setAlert('Note Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: JOURNALS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};
