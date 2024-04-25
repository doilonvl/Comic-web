

// import { toast } from "react-toastify";
// import { header, PUT } from "./type";
// const handleOnclickRead = (e="", story={}, chapteres=[]) => {  
//     if (chapteres.length === 0) {
//         toast.warning("Truyện hiện đang cập nhật xin chờ thêm.")
//     } else {
//         const newViewStory = {
//             ...story,
//             view: story.view += 1
//         }
//         fetch("http://localhost:9999/Stories/" + story.id, {
//             method: PUT,
//             body: JSON.stringify(newViewStory),
//             headers: header,
//         })
//         if (e.target.innerText === "Đọc từ đầu") {
//             navigate(`/detail/${story.id}/chapter/${1}`)
//         } else if (e.target.innerText === "Đọc mới nhất") {
//             navigate(`/detail/${story.id}/chapter/${chapteres.length}`)
//         }
//     }
// } 
// export default handleOnclickRead;