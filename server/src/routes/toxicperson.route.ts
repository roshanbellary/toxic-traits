/*
 * TODO: Fill this out with the routes layer for your toxic person! Hint: tale a look at admin.route.ts and see how that file
 * defines the routes that will be hit by the backend, and which functions they call from the controller layer to perform the
 * desired function.
 */
import express from 'express';
import {
  createToxicPerson,
  deleteToxicPersonById,
  deleteToxicTraitFromPerson,
  getToxicTraitsFromPerson,
  addToxicTraitToPerson,
  getAllToxicPeople,
  getToxicPersonById,
} from '../controllers/toxicperson.controller';

const router = express.Router();

router.get('/', getAllToxicPeople);
router.post('/', createToxicPerson);
router.delete('/:id', deleteToxicPersonById);
router.delete('/:id/:toxicTrait', deleteToxicTraitFromPerson);
router.get('/:id/toxictraits', getToxicTraitsFromPerson);
router.post('/:id/toxictraits', addToxicTraitToPerson);
router.get('/:id', getToxicPersonById);

export default router;
