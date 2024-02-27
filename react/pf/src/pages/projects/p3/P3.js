import './p3.css'

export default function P3 (){

   
    return(<>
         <div className="project">
            <div className="title">Review</div>
            <div className="wrapper">
                <div className="profile">
                    <p>name</p>
                    <p>job</p>
                    <p>desc</p>
                </div>
                <div className="buttons">
                    <button onClick={decrease}></button>
                    <button onClick={reset}>Suprise me</button>
                    <button onClick={increase}></button>
                </div>
            </div>
        </div>

    </>)
}

