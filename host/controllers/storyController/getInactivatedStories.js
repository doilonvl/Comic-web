import createError from "http-errors";
import { storyDAO } from "../../repositories/index.js";

const getInactivatedStories = async (req, res, next) => {
        try {
         const inactiveStories = await storyDAO.getInactivatedStories();
         res.json(inactiveStories)
        } catch (error) {
            next(createError(500, error.message));
        }
        
        
}
 
export default getInactivatedStories;