const express = require('express');
const Journal = require('../models/journal');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// @route   POST /api/journals
// @desc    Create a journal
// @access  Private
router.post(
  '/',
  [auth, [check('name', 'Please enter a journal name').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      const journals = await Journal.find({ name });

      // Check if journal with specified name exists
      let exists = false;
      if (journals.length != 0) {
        journals.forEach((journal) => {
          if (journal.owner.toString() === req.user.id) {
            exists = true;
          }
        });
      }
      if (exists) {
        return res.status(400).json({ msg: 'Journal already exists' });
      }

      // Create + save journal
      const journal = new Journal({ name: name, owner: req.user.id });
      await journal.save();

      return res.status(200).json(journal);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route   GET /api/journals
// @desc    Get all journals the user owns
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const journals = await Journal.find({ owner: req.user.id });
    return res.status(200).json(journals);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET /api/journals/:id
// @desc    Get a specific journal
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    // Check if journal exists
    if (!journal) {
      return res.status(404).json({ msg: 'Journal not found' });
    }

    // Check if user owns journal
    if (journal.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    return res.status(200).json(journal);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(401).json({ msg: 'Journal not found' });
    }
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   DELETE /api/journals/:id
// @desc    Delete a journal
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    // Check if journal exists
    if (!journal) {
      return res.status(404).json({ msg: 'Journal not found' });
    }

    // Check if user own journal
    if (journal.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await journal.remove();
    return res.status(200).json({ msg: 'Journal deleted' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(401).json({ msg: 'Journal not found' });
    }
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET /api/journals/:journalId/:noteId
// @desc    Get a note by ID
// @access  Private
router.get('/:journalId/:noteId', auth, async (req, res) => {
  try {
    // look for journal by id -- check for existence and ownership
    const journal = await Journal.findById(req.params.journalId);
    if (!journal) {
      return res.status(404).json({ msg: 'Journal not found' });
    }

    // Check if user own journal
    if (journal.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const note = journal.notes.filter(
      (note) => note._id.toString() === req.params.noteId
    );
    if (note.length == 0) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    return res.status(200).json(note[0]);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(401).json({ msg: 'Journal not found' });
    }
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   POST /api/journals/:id
// @desc    Add a note
// @access  Private
router.post(
  '/:id',
  [
    auth,
    [
      check('title', 'Please enter a title').notEmpty(),
      check('body', 'Please fill out the body').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, body } = req.body;

    try {
      const journal = await Journal.findById(req.params.id);
      if (!journal) {
        return res.status(404).json({ msg: 'Journal not found' });
      }

      // Check if user own journal
      if (journal.owner.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      // Check if note exists
      let exists = false;
      journal.notes.forEach((note) => {
        if (note.title === title) {
          exists = true;
        }
      });
      if (exists) {
        return res.status(400).json({ msg: 'Note already exists' });
      }

      // Create + add new note
      const newNote = { title, body };
      journal.notes.unshift(newNote);
      journal.noteCount++;
      await journal.save();

      return res.status(200).json(journal);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(401).json({ msg: 'Journal not found' });
      }
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route   PUT /api/journals/:journalId/:noteId
// @desc    Update a note
// @access  Private
router.put(
  '/:journalId/:noteId',
  [
    auth,
    [
      check('title', 'Please enter a title').notEmpty(),
      check('body', 'Please fill out the body').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, body } = req.body;

    try {
      const journal = await Journal.findById(req.params.journalId);
      if (!journal) {
        return res.status(404).json({ msg: 'Journal not found' });
      }

      // Check if user own journal
      if (journal.owner.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      /*
      // Update the note
      let exists = false;
      for (i = 0; i < journal.notes.length; i++) {
        if (journal.notes[i]._id.toString() === req.params.noteId) {
          exists = true;
          journal.notes[i].title = title;
          journal.notes[i].body = body;
        }
      }

       if (!exists) {
        return res.status(400).json({ msg: 'Note not found' });
      }
      */

      let updatedNote = null;
      const newNotes = journal.notes.map((note) => {
        if (note._id.toString() === req.params.noteId) {
          updatedNote = note;
          note.title = title;
          note.body = body;
        }
        return note;
      });
      if (!updatedNote) {
        return res.status(404).json({ msg: 'Note not found' });
      }
      journal.notes = newNotes;
      await journal.save();
      return res.status(200).json(updatedNote);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(401).json({ msg: 'Journal not found' });
      }
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route   DELETE /api/journals/:journal_id/:note_id
// @desc    Delete a note
// @access  Private
router.delete('/:journal_id/:note_id', auth, async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.journal_id);
    // Check if journal exists
    if (!journal) {
      return res.status(404).json({ msg: 'Journal not found' });
    }
    // Check if user owns journal
    if (journal.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Delete note and decrease note count
    let currNoteCount = journal.noteCount;

    let notes = journal.notes.filter(
      (note) => note._id.toString() !== req.params.note_id
    );

    if (notes.length == currNoteCount) {
      return res.status(404).json({ msg: 'Note not found' });
    } else {
      journal.noteCount = notes.length;
    }

    journal.notes = notes;
    await journal.save();

    return res.status(200).json(journal);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(401).json({ msg: 'Journal not found' });
    }
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});
module.exports = router;
