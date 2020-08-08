import React from 'react';

function Footer() {
  return(
		<div class="py-5 bg-dark">
    	<div class="container">
      	<div class="row">
        	<div class="col-md-9">
          	<p class="lead">Follow my Blog or Channel&nbsp; --&gt;</p>
       		</div>
        	<div class="col-4 col-md-1 align-self-center my-3">
        		<a href="https://warotasawa.wordpress.com" target="blank"><img class="img-fluid d-block mx-auto" src="/assets/img/wordpress.png" width="50"></img></a>
        	</div>
        	<div class="col-4 col-md-1 align-self-center my-3">
        	  <a href="https://www.youtube.com/channel/UCVm2ulAeYbjqXENg0LgVc_g" target="blank"><img class="img-fluid d-block mx-auto" src="/assets/img/youtube.png" width="50"></img></a>
        	</div>
        	<div class="col-4 col-md-1 align-self-center my-3">
        	  <a href="https://www.instagram.com" target="blank"></a>
        	</div>
      	</div>
      	<div class="row">
        	<div class="col-12 my-3 text-center">
        	  <p class="text-muted">© Copyright 2018 Pingendo - All rights reserved.</p>
        	</div>
      	</div>
    	</div>
  	</div>
  );
}
export default Footer;