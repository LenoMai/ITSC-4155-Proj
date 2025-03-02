import '../css/signup.css';
function SignUp(){
    return(
<div className="bodyClass">
        <div className="form-container">
            <div className="form-header">
                <img src="/images/NORMSLIST.png" alt ="logo"/>
                <div className="green-line"></div>
            </div>
            
            <div className="form-content">
                <div className="form-info-container">
                    <h1>Students helping students.</h1>
                    <h2>Are you a UNCC student needing quick cash or help?</h2>
                    <h2>Sign up for Normslist today!</h2>
                </div>

                <div className="form-box">
                    <form>
                        <div className="question-box">
                            <label htmlFor="email">UNCC Email: </label>
                            <input type="email" id="email" placeholder="user@charlotte.edu" required/>
                        </div>
                        <div className="question-box">
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" required/>
                        </div>
    
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SignUp;