import { storyDAO } from "../../repositories/index.js";

export async function toggleActiveStatus(req, res) {
    try {
      const story = await storyDAO.toggleActiveStatus(req.params.id);
      if (!story) {
        return res.status(404).send('Story not found');
      }
  
      res.json(story);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Something went wrong.' });
    }
  }