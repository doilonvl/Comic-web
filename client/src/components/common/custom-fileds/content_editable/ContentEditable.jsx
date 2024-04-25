import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTextContentEditable } from "../../app/slices/textSlice"; 
import style from "./style.module.css";
import getParentElement from "../../utilities/getParentElement";

const ContentEditable = (props) => {
    const { inputValue, sendMessage } = props;
    const dispatch = useDispatch();
    const [isContentEditable, setIsContentEditable] = useState(false);
    const value = useSelector(state => state.text.textContentEditable);
    const boxchatIsActive = useSelector(state => state.isActive.boxchat);
    const messages = useSelector(state => state.message.messages);

    const handleElementBonBlur = () => {
        setIsContentEditable(false);
        document.addEventListener("click", handleElementClick);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.shiftKey) {
            if (value.length > 1)
                e.preventDefault()
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);

            const br = document.createElement('br');
            range.deleteContents();
            range.insertNode(br);
            range.setStartAfter(br);
            range.setEndAfter(br); 
            selection.removeAllRanges();
            selection.addRange(range);
        } else if (value.trim().length > 0 && e.key === 'Enter') {
            sendMessage();
            e.preventDefault();
        } else if (e.key === 'Enter') {
            e.preventDefault();
        }
    };
    const handleOnselect = (e) => {
        if (e.target.innerText === '') {
            dispatch(setTextContentEditable(('')));
        }
    };
    useEffect(() => {
        if (isContentEditable) inputValue.current.focus();
        if (value === '\n' && value.length === 1) {
            inputValue.current.innerText = '';
            dispatch(setTextContentEditable(('')));
        }
    }, [isContentEditable, value]);

    useEffect(() => {
        if (inputValue.current) {
            setIsContentEditable(true);
            inputValue.current.focus(); 
        }
    }, [boxchatIsActive, messages]);

    const handleElementClick = (e) => {
        const currentElm = getParentElement(e.target, '#rich_input');
        if (e.target.innerText === 'Gửi' || inputValue.current === currentElm) {
            setIsContentEditable(true);
        }
    };

    return (
        <div
            ref={inputValue}
            contentEditable={isContentEditable}
            onClick={handleElementClick}
            onBlur={handleElementBonBlur}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            id="rich_input"
            placeholder={`Nhập @, tin nhắn tới HN23_CPL_FE`}
            className={`${style.rich_input} ${value ? '' : style.empty}`}
            onSelect={handleOnselect}
            onInput={(e) => {
                dispatch(setTextContentEditable((e.target.innerText)));
            }}
            dangerouslySetInnerHTML={{ __html: '' }}
        />
    );
}

export default ContentEditable;