const express = require("express");
const z = require("zod");
const sequelize = require("sequelize");

const users = require("../Database/Model/User");
const validateBody = require("../Middleware/validate-body");

const router = express.Router();

router.get("/@me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      message: "You are not logged in.",
    });
  }

  res.json({
    user: {
      email: req.session.user.email,
      firstName: req.session.user.firstName,
      id: req.session.user.id,
      lastName: req.session.user.lastName,
      university:req.session.user.university,
    },
  });
});

router.post(
  "/login",
  validateBody(
    z.object({
      email: z.string().email().min(1),
      password: z.string().min(1),
    })
  ),
  async (req, res, next) => {
    if (req.session.user) {
      return res.status(403).json({
        message: "You are already logged in.",
      });
    }

    const { email, password } = req.body;

    const user = await users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials provided.",
      });
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials provided.",
      });
    }

    req.session.regenerate((error) => {
      if (error) {
        return next(error);
      }

      req.session.user = user;

      res.status(200).json({
        message: "Login successful.",
        user: {
          email: user.email,
          firstName: user.firstName,
          id: user.id,
          lastName: user.lastName,
          university:user.university,
        },
        
      });
    });
  }
);

router.post("/logout", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      message: "You are not logged in.",
    });
  }

  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }

    res.status(204).end();
  });
});

router.post(
  "/register",
  validateBody(
    z.object({
      firstName: z.string().min(1).max(255),
      lastName: z.string().min(1).max(255),
      email: z.string().email().min(1).max(255),
      password: z.string().min(1),
    })
  ),
  async (req, res, next) => {
    if (req.session.user) {
      return res.status(403).json({
        message: "You are already logged in.",
      });
    }

    const { firstName, lastName, email, password } = req.body;

    const existingUser = await users.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already in use.",
      });
    }

    const user = await users.create({
      firstName,
      lastName,
      email,
      password,
    });

    req.session.regenerate((error) => {
      if (error) {
        return next(error);
      }

      req.session.user = user;

      res.status(204).end();
    });
  }
);

router.put("/:id", async (req, res) => {
  try {
    await users.update(req.body, { where: { id: req.params.id } });
    const updatedUser = await users.findByPk(req.params.id);
    res.status(201).json(updatedUser);
  } catch (error) {
    // Handle errors
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Fetch the user information
    const user = await users.findByPk(req.params.id);

    if (!user) {
      // Return a 404 Not Found if the user is not found
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user information
    res.status(200).json(user);

  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;

