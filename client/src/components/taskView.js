import '../css/taskView.css';
function TaskView() {
    return (
        <div className="bodyClass2">
            <div className="form-container2">
                <div className ="task-container">
                    <h1 className="customh1">Book pickup.</h1>
                    <h2 className="customh2">Requestor: John</h2>
                    <h2 className="customh2">Exam Description:</h2>
                    <p className="customp">I need somebody to pick up my books from the library.</p>
                    <h2 className="IncompleteTask">Incomplete</h2>
                </div>
            </div>
            <div className="form-container2">
                <div className ="task-container">
                    <h1 className="customh1">Book pickup.</h1>
                    <h2 className="customh2">Requestor: Todd</h2>
                    <h2 className="customh2">Task Description:</h2>
                    <p className="customp">Example description.</p>
                    <h2 className="IncompleteTask">Incomplete</h2>
                </div>
            </div>
        </div>
    );
}

export default TaskView