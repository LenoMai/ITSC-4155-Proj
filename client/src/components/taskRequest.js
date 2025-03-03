import '../css/taskRequest.css';

function TaskRequest(){
    return(
        <div className="form-box">
                    <form>
                        <div className="question-box">
                            <label>Task Title: </label>
                            <input type="text" id="title" placeholder="Title..." required/>
                        </div>
                        <div className="question-box">
                            <label>Description: </label>
                            <input type="text" id="description" placeholder="Description..." required/>
                        </div>
                        <div className="question-box">
                            <label>Location: </label>
                            <input type="text" id="location" placeholder="Location..." required/>
                        </div>
                        <button type="submit">Post Task</button>
                    </form>
                </div>
    );
}

export default TaskRequest