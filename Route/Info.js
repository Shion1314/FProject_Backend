const express = require('express');
const router = express.Router();
const db = require('../Database/Connect');
const info = require('../Database/Model/University_info');

// Define a route to get university_info based on University_Name
router.get('/', async (req, res) => {
  try {
    const { University_Name } = req.query;

    // If University_Name parameter is provided, fetch specific university info
    if (University_Name) {
      const universityInfo = await info.findOne({
        attributes: ['University_Name', 'GPA', 'Admissions_Rate', 'tution_in_state', 'tution_out_state', 'popular_major'],
        where: { University_Name }
      });

      if (!universityInfo) {
        return res.status(404).json({ message: 'University info not found for the specified name' });
      }

      return res.json(universityInfo);
    }

    // If no parameter provided, fetch all university info
    const allUniversityInfo = await info.findAll({
      attributes: ['University_Name', 'GPA', 'Admissions_Rate', 'tution_in_state', 'tution_out_state', 'popular_major']
    });

    if (!allUniversityInfo || allUniversityInfo.length === 0) {
      return res.status(404).json({ message: 'No university info found' });
    }

    res.json(allUniversityInfo);
  } catch (error) {
    console.error('Error fetching university info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
