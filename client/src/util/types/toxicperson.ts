/**
 * Interface for the user data type return from the backend
 */
interface IToxicPerson {
  id: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
  toxicTraits: [string];
}

export default IToxicPerson;
