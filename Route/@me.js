const express = require("express");
const z = require("zod");

const db = require("../Database/Connect");

const FavoriteUniversity = require("../Database/Model/FavoriteUniversity");
const Users = require("../Database/Model/User");

const requireUser = require("../Middleware/require-user");
const validateBody = require("../Middleware/validate-body");

const router = express.Router();

router.use(requireUser());

router.get("/", (req, res) => {
  res.json({
    user: {
      email: req.user.email,
      firstName: req.user.firstName,
      id: req.user.id,
      lastName: req.user.lastName,
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
    const isPasswordValid = await req.user.validatePassword(req.body.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password provided.",
      });
    }

    await db.transaction(async (transaction) => {
      await FavoriteUniversity.destroy(
        {
          where: {
            userId: req.user.id,
          },
        },
        {
          transaction,
        }
      );

      await Users.destroy(
        {
          where: {
            id: req.user.id,
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
    const { newPassword, oldPassword } = req.body;

    const isPasswordValid = await req.user.validatePassword(oldPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password provided.",
      });
    }

    await req.user.update({
      password: newPassword,
    });

    res.status(204).end();
  }
);

module.exports = router;
