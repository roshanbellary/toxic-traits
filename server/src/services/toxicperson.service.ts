/*
 * TODO: Fill this out with the service layer for your toxic person! Hint: tale a look at user.service.ts and see how that service
 * uses the User model to save and update to the database.
 */
import { ToxicPerson } from '../models/toxicperson.model';

/*
params:
_id -> string
firstName -> string
lastName -> string
pictureUrl -> string
toxicTraits -> [string]

*/

// Create a toxic person - Roshan Bellary
// eslint-disable-next-line no-multi-assign
const createToxicPerson = async (
  firstName: string,
  lastName: string,
  pictureUrl: string,
  toxicTraits: [string],
) => {
  const newToxicPerson = new ToxicPerson({
    firstName,
    lastName,
    pictureUrl,
    toxicTraits,
  });
  const user = await newToxicPerson.save();
  return user;
};
// Deleting a toxic person - Logan Brassington
const deleteToxicPerson = async (_id: string) => {
  const deletedPerson = await ToxicPerson.findByIdAndDelete(_id).exec();
  return deletedPerson;
};

// Delete a toxic trait from a specific person - Roshan Belary
const deleteToxicTraitFromPerson = async (
  _id: string,
  toxicTrait: string,
  toxicTraits: [string],
) => {
  const index = toxicTraits.indexOf(toxicTrait);
  if (index > -1) {
    toxicTraits.splice(index, 1);
  }
  const toxicPerson = await ToxicPerson.findByIdAndUpdate(_id, [
    { $set: { toxicTraits: { $eq: toxicTraits } } },
  ]).exec();
  return toxicPerson;
};
// Get all toxic traits for a specific person - Charles
const getToxicTraitsFromPerson = async (_id: string) => {
  const toxicTraits = await ToxicPerson.findById(_id, 'toxicTraits').exec();
  return toxicTraits;
};

// Create a toxic trait for a specific person - Logan Brassington
const addToxicTraitToPerson = async (_id: string, toxicTrait: string) => {
  const toxicPerson = await ToxicPerson.findByIdAndUpdate(
    _id,
    { $push: { toxicTraits: toxicTrait } },
    { new: true },
  ).exec();
  return toxicPerson;
};

const getAllToxicPeople = async () => {
  const toxicPeople = await ToxicPerson.find().exec();
  return toxicPeople;
};

const getToxicPersonById = async (id: string) => {
  const toxicPerson = await ToxicPerson.findById(id).exec();
  return toxicPerson;
};

export {
  createToxicPerson,
  deleteToxicPerson,
  deleteToxicTraitFromPerson,
  getToxicTraitsFromPerson,
  addToxicTraitToPerson,
  getAllToxicPeople,
  getToxicPersonById,
};
