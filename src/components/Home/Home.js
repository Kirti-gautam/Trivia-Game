import React, {useState,useEffect} from "react";
import "./Home.css";

export default function Home() {
    const [data,setData] = useState({});
    const [isLoader,setIsLoader]= useState(false);
    const [status,setStatus] = useState("");
    const [error,setError] = useState('');
    async function fetchData() {
        let response={};
        setIsLoader(true); 
        try{
            response = await (await fetch("https://jservice.io/api/random")).json();
            setData(() => ({
                question: response[0].question,
                answer : response[0].answer.replace(/(<([^>]+)>)/gi,"")
            }))
            
        }catch(e) {
            setError(e.message)
        }
        
            setIsLoader(false);
        
    }
   
function validateInput(answer){
    if(answer.trim()==="" || answer.length===0){
        return false;
    }
    return true;
}

    function handleSubmit(e){
        e.preventDefault();
        const answer = e.target.elements.answer.value;
        if(validateInput(answer)){
        let val =data.answer;
        if(answer.toLowerCase() == val.toLowerCase()){
            setStatus("Correct");
        }else{
            setStatus("Incorrect");
        }    
        setTimeout(() => 
        {
        //setAnswer("");
        setStatus("");
        fetchData();},2000);   
        }
    }
    
    useEffect(()=>{
        fetchData();
    },[]);

    if(error){
        return <span className="error">{error}</span>;
    }
    
    return (
        <>
        <h1 className="heading">TRIVIA GAME</h1>
        <div className="mainCard">
            {isLoader ? <div >Loading ...</div> : <>
            <p className="question">{data.question}</p>
            <form onSubmit={handleSubmit}>
                <label>Answer</label><input type="text" name="answer" placeholder="Write answer here ..."  required></input>
                <br />
                <input type="submit" value="Submit" className="button" />
            </form>
            <div className="checkAnswer">{status}</div>
            </>
            }
        </div>
        </>
    )
}