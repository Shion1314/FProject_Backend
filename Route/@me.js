const express = require("express");
const z = require("zod");

const db = require("../Database/Connect");

const FavoriteUniversity = require("../Database/Model/FavoriteUniversity");
const Users = require("../Database/Model/User");

const requireSession = require("../Middleware/require-session");
const validateBody = require("../Middleware/validate-body");

const router = express.Router();

router.use(requireSession());

router.get("/", (req, res) => {
  res.json({
    user: {
      email: req.session.user.email,
      firstName: req.session.user.firstName,
      id: req.session.user.id,
      lastName: req.session.user.lastName,
    },
  });
});

router.delete(
  "/",
  validateBody(
    z.object({
      password: z.string().min(1),
    })
  ),
  async (req, res) => {
    const user = await Users.findOne({
      where: {
        id: req.session.user.id,
      },
    });

    if (!user) {
      throw new Error(`User with ID ${req.session.user.id} not found.`);
    }

    const isPasswordValid = await user.validatePassword(req.body.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password provided.",
      });
    }

    await db.transaction(async (transaction) => {
      await FavoriteUniversity.destroy(
        {
          where: {
            userId: req.session.user.id,
          },
        },
        {
          transaction,
        }
      );

      await Users.destroy(
        {
          where: {
            id: req.session.user.id,
          },
        },
        {
          transaction,
        }
      );

      res.status(204).end();
    });
  }
);

router.patch(
  "/change-password",
  validateBody(
    z.object({
      newPassword: z.string().min(1),
      oldPassword: z.string().min(1),
    })
  ),
  async (req, res) => {
    const user = await Users.findOne({
      where: {
        id: req.session.user.id,
      },
    });

    if (!user) {
      throw new Error(`User with ID ${req.session.user.id} not found.`);
    }

    const isPasswordValid = await user.validatePassword(req.body.oldPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password provided.",
      });
    }

    await user.update({
      password: req.body.newPassword,
    });

    res.status(204).end();
  }
);

module.exports = router;
