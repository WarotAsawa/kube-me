import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { DownloadString } from './DownloadString';
import { CopyToClipBoard } from './CopyToClipBoard';

let deployYaml = "";
let deployFileName = "";
let serviceYaml = "";
let serviceFileName = "";

function StatelessAppResult(props) {
	deployYaml = GenerateDeploymentYAML(props.app);
	serviceYaml = GenerateServiceYAML(props.app);
	deployFileName = 'deploy-'+props.app.name;
	serviceFileName = 'svc-'+props.app.name;

  return(
		<Row>
    		<Col>
      			<Row><h3>Deployment yaml output</h3></Row>
				<Row className='pr-2'>
					<Card boarder='secondary' className='mb-2 w-100 h-100'>
    					<Card.Header className='bg-secondary'>{deployFileName}.yaml</Card.Header>
    					<Card.Body>
							<Card.Text name="deploymentYaml" style={{"whiteSpace": "pre", "fontFamily":"consolas", "lineHeight":"1.5"}}>
								{deployYaml}
     						</Card.Text>
    					</Card.Body>
  					</Card> 
				</Row>
				<Row>
					<Button 
						name="copyDeployment"
						className='float-left'
						onClick={() => {
							CopyToClipBoard(deployYaml);
							alert(deployFileName+'.yaml has been copied to clipboard.');}
						} 
						variant="info">
						Copy to Clipboard
					</Button>{' '}
					<Button
						name="downloadDeployment"
						className='ml-2'
						onClick={() => {
							DownloadString(deployYaml,"text",deployFileName+".yaml")}
						} 
						variant="success">
						Download .yaml file
					</Button>{' '}
				</Row>
			</Col>
			<Col>
				<Row><h3>Service yaml output</h3></Row>
				<Row className='pr-2'>
					<Card boarder='info' className='mb-2 w-100 h-100'>
						<Card.Header className='bg-info'>{serviceFileName}.yaml</Card.Header>
						<Card.Body>
							<Card.Text name="serviceYaml" style={{"whiteSpace": "pre", "fontFamily":"consolas", "lineHeight":"1.5"}}>
								{serviceYaml}
      						</Card.Text>
						</Card.Body>
					</Card>
				</Row>
				<Row>
					<Button
						name="copyService"
						className='float-left'
						onClick={() => {
							CopyToClipBoard(serviceYaml);
							alert(serviceFileName+'.yaml has been copied to clipboard.');}
						} 
						variant="info">
							Copy to Clipboard
					</Button>{' '}
					<Button
						name="downloadService"
						className='ml-2'
						onClick={() => {
							DownloadString(serviceYaml,"text",serviceFileName+".yaml")}
						} 
						variant="success">
							Download .yaml file
					</Button>{' '}
				</Row>
			</Col>
	</Row>
  );
}

function GenerateDeploymentYAML(data) {
	const yaml = require('js-yaml');
	let output = {};
	let container = {};
	output.apiVersion = "apps/v1";
	output.kind = "Deployment";
	output.metadata = {};
	output.metadata.name = data.name;
	output.metadata.namespace = data.namespace;
	output.metadata.labels = {};
	output.metadata.labels.app = data.name;
	output.spec = {};
	output.spec.replicas = data.replicas;
	output.spec.selector = {};
	output.spec.selector.matchLabels = {};
	output.spec.selector.matchLabels.app = data.name;
	output.spec.template = {};
	output.spec.template.metadata = {};
	output.spec.template.metadata.labels = {};
	output.spec.template.metadata.labels.app = data.name;
	container.name = data.name;
	container.image = data.image;
	output.spec.template.spec = {};
	if (data.requestCpu!=="" || data.requestMemory!=="" || data.limitCpu!=="" || data.limitCpu!=="" ) {
		container.resources = {};
		if (data.requestCpu!=="" || data.requestMemory!=="") {
			container.resources.requests = {};
			if (data.requestCpu!=="")  container.resources.requests.cpu = data.requestCpu;
			if (data.requestMemory!=="")  container.resources.requests.memory = data.requestMemory;
		}
		if (data.limitCpu!=="" || data.limitMemory!=="") {
			container.resources.limits = {};
			if (data.limitCpu!=="")  container.resources.limits.cpu = data.limitCpu;
			if (data.limitMemory!=="")  container.resources.limits.memory = data.limitMemory;
		}
	}
	if (data.envs.length > 0) {
		container.env = data.envs;
	}
	
	if (data.ports.length > 0) {
		container.ports = [];
		data.ports.forEach(port => container.ports.push({"name":port.name, "containerPort":parseInt(port.number,10), "protocol":port.protocol}));
	}
	output.spec.template.spec.containers = [container];
	const result = yaml.dump(output);
	//console.log(result);
	return result;
}

function GenerateServiceYAML(data) {
	const yaml = require('js-yaml');
	let output = {};
	let container = {};
	output.apiVersion = "v1";
	output.kind = "Service";
	output.metadata = {};
	output.metadata.name = data.name;
	output.metadata.namespace = data.namespace;
	output.metadata.labels = {};
	output.metadata.labels.app = data.name;
	output.spec = {};
	output.spec.type = data.service;
	output.spec.selector = {};
	output.spec.selector.app = data.name;
	if (data.ports.length > 0) {
		output.spec.ports = [];
		for (let i = 0; i < data.ports.length; i++) {
			if (data.ports[i].expose === 'true') {
				output.spec.ports.push({"name":data.ports[i].name, "protocol":data.ports[i].protocol, "port":parseInt(data.ports[i].number,10),"targetPort":parseInt(data.ports[i].number,10)});
			}
		}
	}
	const result = yaml.dump(output);
	return result;
}


export default StatelessAppResult;