
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { header, POST, PUT } from "./common/utilities/type";

const FormRate = ({ sid, onchangeRateNo, story }) => {
    const navigate = useNavigate("")
    const [rateStories, setRateStories] = useState([])
    const [rateNo, setRateNo] = useState(0)
    const user = JSON.parse(localStorage.getItem("user")) 
    let results
    if (rateStories.length >= 1) {
        let totalRate = rateStories.reduce((accumulator, rateStory) => {
            accumulator += parseInt(rateStory.rateNo)
            return accumulator;
        }, 0)
        let avgRate = totalRate / rateStories.length
        if (avgRate % 1 >= 0.5) {
            results = Math.ceil(avgRate);
        } else if (avgRate % 1 < 0.5) {
            results = Math.floor(avgRate);
        } else if (avgRate % 1 === 0) {
            results = avgRate;
        }
    }
    const handleOnclickRate = (e) => {
        if (user === null) {
            navigate("/login")
        } else {
            setRateNo(e.target.value)
            onchangeRateNo(e.target.value)
            toast.success(`Bạn đã đánh giá ${e.target.value} sao cho ${story.name}`)
            let body = {
                rateNo: parseInt(e.target.value),
                rateStoryId: parseInt(sid),
                userId: user.id
            }
            if (rateStories.length === 0) {
                fetch("http://localhost:9999/rateStory", {
                    method: POST,
                    body: JSON.stringify(body),
                    headers: header
                })
            } else if (rateStories.length !== 0) {
                let count = 0
                rateStories.map(rateStory => {
                    if (rateStory.userId === user.id && rateStory.rateStoryId === parseInt(sid)) {
                        count += 1
                        fetch(`http://localhost:9999/rateStory/${rateStory.id}`, {
                            method: PUT,
                            body: JSON.stringify(body),
                            headers: header
                        })
                    }
                    return true;
                })
                if (count === 0) {
                    fetch("http://localhost:9999/rateStory", {
                        method: POST,
                        body: JSON.stringify(body),
                        headers: header
                    })
                }
            }
        }
    }
    useEffect(() => {
        fetch("http://localhost:9999/rateStory/?rateStoryId=" + sid)
            .then(res => res.json())
            .then(data => setRateStories(data))
    }, [sid, rateNo])
    const handle =() =>{}
    return (
        <div id="rating">
            <input onClick={(e) => handleOnclickRate(e)} checked={results === 5} onChange={()=>handle()} type="radio" id="star5" name="rating" value="5" />
            <label className="full" htmlFor="star5" title="Awesome - 5 stars"></label>

            <input onClick={(e) => handleOnclickRate(e)} checked={results === 4} onChange={()=>handle()} type="radio" id="star4" name="rating" value="4" />
            <label className="full" htmlFor="star4" title="Pretty good - 4 stars"></label>

            <input onClick={(e) => handleOnclickRate(e)} checked={results === 3} onChange={()=>handle()} type="radio" id="star3" name="rating" value="3" />
            <label className="full" htmlFor="star3" title="Meh - 3 stars"></label>

            <input onClick={(e) => handleOnclickRate(e)} checked={results === 2} onChange={()=>handle()} type="radio" id="star2" name="rating" value="2" />
            <label className="full" htmlFor="star2" title="Kinda bad - 2 stars"></label>

            <input onClick={(e) => handleOnclickRate(e)} checked={results === 1} onChange={()=>handle()} type="radio" id="star1" name="rating" value="1" />
            <label className="full" htmlFor="star1" title="Sucks big time - 1 star"></label>
        </div>
    );
}
export default FormRate;