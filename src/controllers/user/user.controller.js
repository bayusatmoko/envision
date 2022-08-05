import { User } from '../../models';
import { successResponse, errorResponse, convertToUTC } from '../../helpers';

export const allUsers = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 2;
    const users = await User.findAndCountAll({
      order: [['createdAt', 'DESC'], ['firstName', 'ASC']],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { users });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const create = async (req, res) => {
  try {
    const {
      email, birthdayDate, location, firstName, lastName,
    } = req.body;

    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      throw new Error('User already exists with same email');
    }

    const payload = {
      email,
      firstName,
      lastName,
      birthdayDate: convertToUTC(birthdayDate, location),
      location
    };

    const newUser = await User.create(payload);
    return successResponse(req, res, {newUser});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const update = async (req, res) => {
  try {
    const {
      email, birthdayDate, location, firstName, lastName,
    } = req.body;

    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const payload = {
      email,
      firstName,
      lastName,
      birthdayDate,
      location
    };

    const newUser = await user.update(payload);
    return successResponse(req, res, {newUser});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
