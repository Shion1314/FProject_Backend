# FProject_Backend

## Database Requirements

### Create 2 or more models, each with 2 or more fields

We created 3 different models: User, University, and Favorite University.

- [User Model](https://github.com/Shion1314/FProject_Backend/blame/5e21ff3b0a51f8b61e3a5936663cdd5462a5e620/Database/Model/User.js#L52C3-L52C23)
- [University Model](https://github.com/Shion1314/FProject_Backend/blame/f7d71b1a7126afa421354afb84579e6da3bc8b40/Database/Model/University.js#L41)
- [Favorite University Model](https://github.com/Shion1314/FProject_Backend/blame/bc9b5776a66c3f24a27529c96ea21dc231b35919/Database/Model/FavoriteUniversity.js#L35)

### 2 or more models should be associated with each other

The University table is associated with FavoriteUniversity, and User is also associated with FavoriteUniversity.

- [FavoriteUniversity Association](https://github.com/Shion1314/FProject_Backend/blame/1bca2c60900c1228a0a133d4d6d933ceac8b44c0/Database/Model/FavoriteUniversity.js#L41-L49)

## API Requirements

### Write routes to add new instances to each model

- [University Add Route](https://github.com/Shion1314/FProject_Backend/blame/65e0d6ee8714af3d767f2356ebf98021513bc1e9/Route/university.js#L165-L168)
  (Not necessary for adding universities, added for reference)
- [Favorites Add Route](https://github.com/Shion1314/FProject_Backend/blame/31de35e74306a8d4a39ba5e590fab3eafba2371e/Route/favorites.js#L30-L66)
- [Authentication Add Route](https://github.com/Shion1314/FProject_Backend/blame/0898717aec2db2aa0ac5cdb0c9596ebdc5aa1248/Route/auth.js#L78-L126)

### Write routes that return all instances from each model

- [University All Route](https://github.com/Shion1314/FProject_Backend/blame/c08eb4e07b14d187a003bf4c575b8a1d3c96c100/Route/university.js#L144-L163)
- [Favorites All Route](https://github.com/Shion1314/FProject_Backend/blame/1c06565335ca935d2ba199186a8c9232a8fe729a/Route/favorites.js#L16-L28). It only returns all favorites for the authenticated user, since it doesn't make sense to return favorites for other users too.
- [User All Route (Check if correct)](https://github.com/Shion1314/FProject_Backend/blame/9cb35503a8f35e119c0064debc7a5fa63c46c7d4/Route/%40me.js#L16-L25)

### Write routes that return individual instances from each model based on their IDs

- [University Single Instance Route](https://github.com/Shion1314/FProject_Backend/blame/9380034f2a7bf4612869cd575603ee1cfda56e37/Route/university.js#L9-L12)

We don't have an explicit route for `GET /users/:id`, but we do have a [middleware](https://github.com/Shion1314/FProject_Backend/blob/main/Middleware/require-user.js#L3) that retrieves the user ID from the current session, which is then used to find the corresponding user in the database. The `User` model is then appended to the `req` object and then returned using the [`GET /@me`](https://github.com/Shion1314/FProject_Backend/blob/main/Route/%40me.js#L16) endpoint.

We don't have a route for `GET /favorites/:id` because our favorites table is a junction table that represents the relationship between a `User` and `University` and it uses a composite primary key of `userId` and `universityId`. We decided not to add an endpoint that uses either the `userId` or `universityId` to return an individual instance because it didn't make sense from a use-case perspective. If we were to add one, it would probably look something like this, which basically just returns their most favorited university ranked at #1:
```javascript
router.get("/", async (req, res) => {
  const mostFavorited = await FavoriteUniversity.findAll({
    include: University,
    limit: 1,
    order: [["rank", "ASC"]],
    where: {
      userId: req.user.id,
    },
  });

  res.json(mostFavorited);
});
```

### Write routes to update instances in each model

- [University Update Route](https://github.com/Shion1314/FProject_Backend/blame/3bcdbb78a03114295c27dafdc7fb9d1492c5e1f0/Route/university.js#L165-L168)(Not necessary)
- [Update favorite ranking](https://github.com/Shion1314/FProject_Backend/blob/main/Route/favorites.js#L87) This updates the `rank` property of a `FavoritedUniversity` for the currently authenticated user using the university ID.

We don't have an explicit `PATCH /users/:id` endpoint, but we have [`PATCH /@me/change-password`](https://github.com/Shion1314/FProject_Backend/blob/main/Route/%40me.js#L71), which changes the password of the current user.

### Write routes to remove instances from each model, based on their IDs

- [University Remove Route](https://github.com/Shion1314/FProject_Backend/blame/1343159512e1fa47ae829e74f63a8481bb9e52c9/Route/university.js#L170-L178)
  (Not necessary for Frontend)
- [Remove favorite](https://github.com/Shion1314/FProject_Backend/blob/main/Route/favorites.js#L68) This route removes favorited universities by university ID, since `FavoritedUniversity` is a junction table that uses a composite primary key, not an autoincrementing integer.

We don't have an explicit route for `DELETE /users/:id`, but we do have a [`DELETE /@me`](https://github.com/Shion1314/FProject_Backend/blob/main/Route/%40me.js#L27) endpoint that deletes the currently authenticated user. It works the same way as described above for `GET /@me` by using `req.user`, which is the `User` model by querying the database using the user ID in the current session.

### Write a route that returns one instance from a model, and all instances associated with it in a different model

The route to [`retrieve all favorites for the current user`](https://github.com/Shion1314/FProject_Backend/blob/main/Route/favorites.js#L16) returns the associated university of each of their favorites.
