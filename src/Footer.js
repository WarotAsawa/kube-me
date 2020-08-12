import React from 'react';

function Footer() {
  return(
		<div className="py-5 bg-dark">
    	<div className="container">
      	<div className="row">
        	<div className="col-md-9">
			<h1 className="text-info text-bold">Thank you for using KUBE-ME</h1>
          	<p className='lead'>Please follow my Wordpress Blog and Youtube Channel</p>
			<p className='text-info'>WAROT ASAWAKOWITKORN</p>
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
    	</div>
  	</div>
  );
}
export default Footer;