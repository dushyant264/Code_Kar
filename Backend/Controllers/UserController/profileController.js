const User = require('../../models/UserModel')
const Problem = require('../../models/ProblemModel')

const ProfileController = {
  getProfileData: async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Get solved problems
      const solvedProblems = await Problem.find({ _id: { $in: user.solvedProblems } });

      // Calculate problem stats
      const problemStats = solvedProblems.reduce((acc, problem) => {
        acc[problem.difficulty.toLowerCase()]++;
        return acc;
      }, { easy: 0, medium: 0, hard: 0 });

      // Calculate total solved
      const totalSolved = solvedProblems.length;

      // Calculate rank (assuming score-based ranking)
      const userRank = await User.countDocuments({ score: { $gt: user.score } }) + 1;

      res.status(200).json({
        name: user.name,
        rank: userRank,
        totalSolved,
        problemStats
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = ProfileController;