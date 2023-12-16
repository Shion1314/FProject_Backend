const express = require("express");
const z = require("zod");

const FavoriteUniversity = require("../Database/Model/FavoriteUniversity");
const University = require("../Database/Model/University");

const requireSession = require("../Middleware/require-session");
const validateBody = require("../Middleware/validate-body");

const router = express.Router();

router.use(requireSession());

router.get("/", async (req, res) => {
  const favorites = await FavoriteUniversity.findAll({
    include: University,
    where: {
      userId: req.session.user.id,
    },
  });

  res.json({
    favorites: favorites.map((favorite) => favorite.University),
  });
});

router.delete("/:id", async (req, res) => {
  const favorite = await FavoriteUniversity.findOne({
    where: {
      universityId: req.params.id,
      userId: req.session.user.id,
    },
  });

  if (!favorite) {
    return res.status(404).json({
      message: "Favorite not found.",
    });
  }

  await favorite.destroy();

  res.status(204).end();
});

router.post(
  "/",
  validateBody(
    z.object({
      universityId: z.number().int().positive(),
    })
  ),
  async (req, res) => {
    const alreadyFavorited = await FavoriteUniversity.findOne({
      include: University,
      where: {
        universityId: req.body.universityId,
        userId: req.session.user.id,
      },
    });

    if (alreadyFavorited) {
      return res.status(403).json({
        message: `You have already favorited ${alreadyFavorited.University.university_name}.`,
      });
    }

    await FavoriteUniversity.create({
      universityId: req.body.universityId,
      userId: req.session.user.id,
    });

    res.status(204).end();
  }
);

module.exports = router;
