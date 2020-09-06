import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { DownloadString } from './DownloadString';
import { CopyToClipBoard } from './CopyToClipBoard';

let statefulYaml = "";
let statefulFileName = "";
let serviceYaml = "";
let serviceFileName = "";

function StatefulAppResult(props) {

	statefulYaml = GenerateStatefulSetYAML(props.app);
	serviceYaml = GenerateServiceYAML(props.app);
	statefulFileName = 'ss-'+props.app.name;
	serviceFileName = 'headless-svc-'+props.app.name;
	return(
		<Row>
			<Col>
      			<Row><h3>StatefulSet yaml output</h3></Row>
					<Row className='pr-2'>
						<Card boarder='secondary' className='mb-2 w-100 h-100'>
    					<Card.Header className='bg-secondary'>{statefulFileName}.yaml</Card.Header>
    					<Card.Body>
      						<Card.Text name="statefulYaml" style={{"whiteSpace": "pre", "fontFamily":"consolas", "lineHeight":"1.5"}}>
								{statefulYaml}
      						</Card.Text>
    					</Card.Body>
  					</Card>
					</Row>
				<Row>
					<Button 
						name="copyStateful"
						className='float-left'
						onClick={() => {
							CopyToClipBoard(statefulYaml);
							alert(statefulFileName+'.yaml has been copied to clipboard.');}
						} 
						variant="info">
							Copy to Clipboard
					</Button>{' '}
					<Button
						name="downloadStateful"
						className='ml-2'
						onClick={() => {
							DownloadString(statefulYaml,"text",statefulFileName+".yaml")}
						} 
						variant="success">
							Download .yaml file
					</Button>{' '}
				</Row>
    		</Col>
			<Col>
				<Row><h3>Headless Service yaml output</h3></Row>
				<Row className='pr-2'>
					<Card boarder='info' className='mb-2 w-100 h-100'>
						<Card.Header className='bg-info'>{serviceFileName}.yaml</Card.Header>
						<Card.Body>
							<Card.Text name="headlessYaml" style={{"whiteSpace": "pre", "fontFamily":"consolas", "lineHeight":"1.5"}}>
								{serviceYaml}
      						</Card.Text>
						</Card.Body>
					</Card>
				</Row>
				<Row>
					<Button 
						name="copyHeadless"
						className='float-left'
						onClick={() => {
							CopyToClipBoard(serviceYaml);
							alert(serviceFileName+'.yaml has been copied to clipboard.');}
						} 
						variant="info">
							Copy to Clipboard
					</Button>{' '}
					<Button
						name="downloadHeadless"
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

function GenerateStatefulSetYAML(data) {
	const yaml = require('js-yaml');
	let output = {};
	let container = {};
	output.apiVersion = "apps/v1";
	output.kind = "StatefulSet";
	output.metadata = {};
	output.metadata.name = 'ss-' + data.name;
	output.metadata.namespace = data.namespace;
	output.metadata.labels = {};
	output.metadata.labels.app = data.name;
	output.spec = {};
	output.spec.serviceName = data.name;
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
	if (data.volumeMounts.length > 0) {
		container.volumeMounts = [];
		output.spec.volumeClaimTemplates = [];
		for (let i = 0; i < data.volumeMounts.length; i++) {
			container.volumeMounts.push({"name":data.volumeMounts[i].name, "mountPath":data.volumeMounts[i].mountPath});
			let tempClaim = {};
			tempClaim.metadata={};
			tempClaim.spec={};
			tempClaim.metadata.name = data.volumeMounts[i].name; 
			tempClaim.spec.accessModes= ["ReadWriteOnce"];
			tempClaim.spec.storageClassName= data.volumeMounts[i].storageClassName;
			tempClaim.spec.resources = {};
			tempClaim.spec.resources.requests = {};
			tempClaim.spec.resources.requests.storage = data.volumeMounts[i].size;
			output.spec.volumeClaimTemplates.push(tempClaim);
		}
	}
	output.spec.template.spec.containers = [container];
	const result = yaml.dump(output);
	//console.log(result);
	return result;
}

function GenerateServiceYAML(data) {
	const yaml = require('js-yaml');
	let output = {};
	output.apiVersion = "v1";
	output.kind = "Service";
	output.metadata = {};
	output.metadata.name = data.name;
	output.metadata.namespace = data.namespace;
	output.metadata.labels = {};
	output.metadata.labels.app = data.name;
	output.spec = {};
	output.spec.clusterIP = "None";
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


export default StatefulAppResult;