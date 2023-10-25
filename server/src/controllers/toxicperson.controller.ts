import express from 'express';
import { IToxicPerson } from '../models/toxicperson.model';
import {
  createToxicPerson as create,
  deleteToxicPerson as remove,
  deleteToxicTraitFromPerson as removeTrait,
  getToxicTraitsFromPerson as getTraits,
  addToxicTraitToPerson as addTrait,
  getAllToxicPeople as getAll,
  getToxicPersonById as getById,
} from '../services/toxicperson.service';
import ApiError from '../util/apiError';
import StatusCode from '../util/statusCode';

const createToxicPerson = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const toxicPerson: IToxicPerson = req.body;
    const createdToxicPerson = await create(
      toxicPerson.firstName,
      toxicPerson.lastName,
      toxicPerson.pictureUrl,
      toxicPerson.toxicTraits,
    );
    res.status(StatusCode.CREATED).json(createdToxicPerson);
  } catch (error) {
    next(
      ApiError.internal(`Unable to create toxic person ${req.body.firstName}`),
    );
  }
};

const deleteToxicPersonById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const _id: string = req.params.id;
    const deletedToxicPerson = await remove(_id);
    if (!deletedToxicPerson) {
      next(
        ApiError.notFound(
          `Unable to delete because toxic person with id ${_id} does not exist`,
        ),
      );
      return;
    }
    res.status(StatusCode.OK).json(deletedToxicPerson);
  } catch (error) {
    next(ApiError.internal('Unable to delete toxic person '));
  }
};

const deleteToxicTraitFromPerson = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const _id: string = req.params.id;
    const { toxicTrait } = req.params;
    const { toxicTraits } = req.body;
    const deletedToxicTrait = await removeTrait(_id, toxicTrait, toxicTraits);
    if (!deletedToxicTrait) {
      next(
        ApiError.notFound(
          `Unable to delete trait because ${toxicTrait} does not exist`,
        ),
      );
      return;
    }
    res.status(StatusCode.OK).json(deletedToxicTrait);
  } catch (error) {
    next(ApiError.internal('Unable to delete toxic trait'));
  }
};

const getToxicTraitsFromPerson = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const _id: string = req.params.id;
    const toxicTraits = await getTraits(_id);
    if (!toxicTraits) {
      next(
        ApiError.notFound(`Unable to find toxic person ${_id} to get traits`),
      );
      return;
    }
    res.status(StatusCode.OK).json(toxicTraits);
  } catch (error) {
    next(ApiError.internal('Unable to get toxic traits from person'));
  }
};

const addToxicTraitToPerson = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const _id: string = req.params.id;
    const { toxicTrait } = req.body;
    const toxicPerson = await addTrait(_id, toxicTrait);
    if (!toxicPerson) {
      next(
        ApiError.notFound(`Unable to find toxic person ${_id} to add trait`),
      );
      return;
    }
    res.status(StatusCode.OK).json(toxicPerson);
  } catch (error) {
    next(ApiError.internal('Unable to add toxic traits to person'));
  }
};

const getAllToxicPeople = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const toxicPeople = await getAll();
    res.status(StatusCode.OK).json(toxicPeople);
  } catch (error) {
    next(ApiError.internal('Unable to get all toxic people'));
  }
};

const getToxicPersonById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const _id: string = req.params.id;
    const toxicPerson = await getById(_id);
    if (!toxicPerson) {
      next(
        ApiError.notFound(`Unable to find toxic person ${_id} to get person`),
      );
      return;
    }
    res.status(StatusCode.OK).json(toxicPerson);
  } catch (error) {
    next(ApiError.internal('Unable to get toxic person'));
  }
};

export {
  createToxicPerson,
  deleteToxicPersonById,
  deleteToxicTraitFromPerson,
  getToxicTraitsFromPerson,
  addToxicTraitToPerson,
  getAllToxicPeople,
  getToxicPersonById,
};
