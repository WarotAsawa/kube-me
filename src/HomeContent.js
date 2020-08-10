import React from 'react';
import history from './history';

function HomeContent() {
  return(
    <div className="py-5">
      <div className="container">
        <div className="row py-5" >
          <div className="col-md-5 order-2 order-md-1 animate-in-left">
            <img className="img-fluid d-block mx-auto" src="/assets/img/stateless-cover.svg" alt="Stateless Cover" height="100%"></img> 
          </div>
          <div className="col-md-7 align-self-center order-1 order-md-2 my-3 text-md-left text-center">
            <h2>STATELESS APPLICATION</h2>
            <p className="my-4">Simply select your docker image and create your own Deployment and Services in just few steps</p>
            <a className="btn btn-dark" onClick={() => history.push('/Kuber')}>Create Now</a>
          </div>
        </div>
        <div className="row pt-5">
          <div className="align-self-center col-lg-7 text-md-left text-center">
            <h2>STATEFUL APPLICATION</h2>
            <p className="my-4">Have a problem create your own StatefulSet? Create your StatefulSet Yaml in just a few step.&nbsp;</p>
            <a className="btn btn-dark" onClick={() => history.push('/Kuber')}>Create Now</a>
          </div>
          <div className="align-self-center mt-5 col-lg-5 animate-in-right">
						<img className="img-fluid d-block mx-auto" src="/assets/img/stateful-cover.svg" alt="Stateful Cover" height="100%"></img> 
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeContent;