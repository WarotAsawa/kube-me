import React, { Component } from 'react';
import "./Cover.css";

function Cover() {
  return(
    <div class="section-fade-out pt-5 custom-cover">
      <div class="container mt-5 pt-5">
        <div class="row">
          <div class="col-md-6 my-5 text-lg-left text-center align-self-center">
            <h1 class="display-2"><i class="fa fa-fw fa-cube"></i>KUBE ME</h1>
            <p class="lead">Fastest way to create Kubernetes Deployment, Service and Statefulset from your docker image.</p>
            <div class="row mt-5"></div>
          </div>
          <div class="col-lg-6">
            <img class="img-fluid d-block mx-auto" src="/assets/img/cover-img.svg" width="400"></img>
          </div>
        </div>
      </div>  
    </div>
    
  );
}
export default Cover;