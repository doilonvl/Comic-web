
import { ChevronRight } from "react-bootstrap-icons"; 
const StoryDescription = ({ sid, story }) => { 
    return (
        <>
            <p >{story.description}</p>
            <span className="text-info read_more custom-cursor">Xem thêm<ChevronRight size={14} /></span>
        </>
    );
}

export default StoryDescription;