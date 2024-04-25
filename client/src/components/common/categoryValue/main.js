import { useEffect, useState } from "react";

const CategoryValues = () => {
    const [values, setValues] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:9999/Categories")
        .then(res => res.json())
        .then(data => setValues(data));
    }, []);
    return values;
}
 
export default CategoryValues;