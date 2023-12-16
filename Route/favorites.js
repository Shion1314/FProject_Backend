const express = require("express");
const z = require("zod");

const db = require("../Database/Connect");

const FavoriteUniversity = require("../Database/Model/FavoriteUniversity");
const University = require("../Database/Model/University");

const requireUser = require("../Middleware/require-user");
const validateBody = require("../Middleware/validate-body");

const router = express.Router();

router.use(requireUser());

router.get("/", async (req, res) => {
  const favorites = await FavoriteUniversity.findAll({
    include: University,
    order: [["rank", "ASC"]],
    where: {
      userId: req.user.id,
    },
  });

  res.json({
    favorites: favorites.map((favorite) => favorite.University),
  });
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
        userId: req.user.id,
      },
    });

    if (alreadyFavorited) {
      return res.status(403).json({
        message: `You have already favorited ${alreadyFavorited.University.university_name}.`,
      });
    }

    const nextRank = await FavoriteUniversity.count({
      where: {
        userId: req.user.id,
      },
    });

    await FavoriteUniversity.create({
      rank: nextRank + 1,
      universityId: req.body.universityId,
      userId: req.user.id,
    });

    res.status(204).end();
  }
);

router.delete("/:id", async (req, res) => {
  const favorite = await FavoriteUniversity.findOne({
    where: {
      universityId: req.params.id,
      userId: req.user.id,
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

router.patch(
  "/:id/rank",
  validateBody(
    z.object({
      newRank: z.number().int().positive().gte(1),
    })
  ),
  async (req, res) => {
    const { newRank } = req.body;

    const maxRank = await FavoriteUniversity.count({
      where: {
        userId: req.user.id,
      },
    });

    if (newRank > maxRank) {
      return res.status(400).json({
        message: `New rank must be between 1 and ${maxRank}.`,
      });
    }

    const [destinationFavorite, sourceFavorite] = await Promise.all([
      FavoriteUniversity.findOne({
        where: {
          rank: newRank,
          userId: req.user.id,
        },
      }),
      FavoriteUniversity.findOne({
        where: {
          universityId: req.params.id,
          userId: req.user.id,
        },
      }),
    ]);

    if (!sourceFavorite) {
      return res.status(404).json({
        message: `University with ID ${req.params.id} not found in favorites.`,
      });
    }

    await db.transaction(async (transaction) => {
      if (destinationFavorite) {
        await destinationFavorite.update(
          {
            rank: sourceFavorite.rank,
          },
          {
            transaction,
          }
        );
      }

      await sourceFavorite.update(
        {
          rank: newRank,
        },
        {
          transaction,
        }
      );
    });

    res.status(204).end();
  }
);

module.exports = router;
