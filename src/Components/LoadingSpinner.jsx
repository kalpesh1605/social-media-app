const LoadingSpinner = () => {
    return (
        <div>
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status" style={{width:"5rem", height:"5rem"}}>
                </div>
            </div>
            <center><span className="">Loading...</span></center>
        </div>
    );
}

export default LoadingSpinner;