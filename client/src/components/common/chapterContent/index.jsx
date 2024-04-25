import { PencilSquare, X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteIndex, setContentValue } from "../data/dataContent/dataSlice";

const Content = ({ settings }) => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.content.content);
  const chapter = useSelector((state) => state.listChapter.chapter);

  const contentStyle = {
    fontSize: `${settings.fontSize}px`,
    fontFamily: settings.fontFamily,
    marginTop: "20px",
  };

  const handleUpdate = (p, i) => {
    dispatch(setContentValue({ value: p, index: i }));
  };
  return (
    <div style={contentStyle}>
      {Object.keys(content).length !== 0 &&
        content.paragraph.map((p, i) => (
          <p key={i} className="lh-sm">
            {p.includes("'") ? p.replaceAll(/'/g, '"') : p}
            {chapter && chapter.active === 0 && (
              <>
                <X
                  size={28}
                  onClick={() =>
                    dispatch(deleteIndex({ index: i, contentId: content.id }))
                  }
                />
                <PencilSquare size={20} onClick={() => handleUpdate(p, i)} />
              </>
            )}
          </p>
        ))}
    </div>
  );
};

export default Content;
