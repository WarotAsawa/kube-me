import React from 'react';
import "./Cover.css";

function Cover() {
  return(
    <div className="section-fade-out pt-5 custom-cover">
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-md-6 my-5 text-lg-left text-center align-self-center">
            <h1 className="display-2"><i className="fa fa-fw fa-cube"></i>KUBE ME</h1>
            <p className="lead">Fastest way to create Kubernetes Deployment, Service and Statefulset from your docker image.</p>
            <div className="row mt-5"></div>
          </div>
          <div className="col-lg-6">
            <img className="img-fluid d-block mx-auto" src="/assets/img/cover-img.svg" alt="Home Page Cover" width="400"></img>
          </div>
        </div>
      </div>  
    </div>
    
  );
}
export default Cover;