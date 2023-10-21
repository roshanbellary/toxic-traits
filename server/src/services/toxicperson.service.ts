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

// Delete a toxic trait from a specific person - Roshan Belary

// Get all toxic traits for a specific person - Charles

// Create a toxic trait for a specific person - Logan Brassington

export default { createToxicPerson };
