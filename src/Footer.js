import React from 'react';

function Footer() {
  return(
		<div className="py-5 bg-dark">
    	<div className="container">
      	<div className="row">
        	<div className="col-md-9">
          	<p className="lead">Follow my Blog or Channel&nbsp; --&gt;</p>
       		</div>
        	<div className="col-4 col-md-1 align-self-center my-3">
        		<a href="https://warotasawa.wordpress.com" target="blank"><img className="img-fluid d-block mx-auto" src="/assets/img/wordpress.png" alt="Wordpress" width="50"></img></a>
        	</div>
        	<div className="col-4 col-md-1 align-self-center my-3">
        	  <a href="https://www.youtube.com/channel/UCVm2ulAeYbjqXENg0LgVc_g" target="blank"><img className="img-fluid d-block mx-auto" src="/assets/img/youtube.png" alt="Youtube" width="50"></img></a>
        	</div>
        	<div className="col-4 col-md-1 align-self-center my-3">
        	  <a href="https://www.instagram.com" target="blank"></a>
        	</div>
      	</div>
      	<div className="row">
        	<div className="col-12 my-3 text-center">
        	  <p className="text-muted">© Copyright 2018 Pingendo - All rights reserved.</p>
        	</div>
      	</div>
    	</div>
  	</div>
  );
}
export default Footer;