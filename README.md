# FProject_Backend

## Database Requirements
### Create 2 or more models, each with 2 or more fields
>
We created 3 different model User, University and Favorite University
>
https://github.com/Shion1314/FProject_Backend/blame/5e21ff3b0a51f8b61e3a5936663cdd5462a5e620/Database/Model/User.js#L52C3-L52C23
>
https://github.com/Shion1314/FProject_Backend/blame/f7d71b1a7126afa421354afb84579e6da3bc8b40/Database/Model/University.js#L41
>
https://github.com/Shion1314/FProject_Backend/blame/bc9b5776a66c3f24a27529c96ea21dc231b35919/Database/Model/FavoriteUniversity.js#L35

### 2 or models should be associated with each other
>
The University table is associate with the FavoriteUniversity and user is also associate with FavoriteUniversity
>
https://github.com/Shion1314/FProject_Backend/blame/1bca2c60900c1228a0a133d4d6d933ceac8b44c0/Database/Model/FavoriteUniversity.js#L41-L49
>
>
## API Requirements

### Write routes to add new instances to each model
>
* https://github.com/Shion1314/FProject_Backend/blame/65e0d6ee8714af3d767f2356ebf98021513bc1e9/Route/university.js#L165-L168
* https://github.com/Shion1314/FProject_Backend/blame/31de35e74306a8d4a39ba5e590fab3eafba2371e/Route/favorites.js#L30-L66
  

### Write routes that returns all instances from each model

### Write routes that return individual instances from each model based on their IDs

### Write routes to update instances in each model

### Write routes to remove instances form each model, based on their IDs

### Write a route that returns one instance from a model, and all instances associated with it in a different model
