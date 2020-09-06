import React, {useState} from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Row } from 'react-bootstrap';
import StatelessAppResult from './StatelessAppResult';
import * as Yup from 'yup';

const nameRegex = /^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]+$/;
const cpuRegex = /^([0-9]{1,5})[m]?$/;
const capacityRegex = /^([0-9]{1,9})([EPTGMK]?[i]?)$/;

const ApplicationSpecSchema = Yup.object().shape({
	name: Yup.string()
  	.min(2, 'Too Short!')
  	.max(50, 'Too Long!')
  	.matches(nameRegex, "Must start-end with alphanumeric char and can contain '-' ex: web-app2")
  	.required('Name Required'),
	namespace: Yup.string()
	.min(2, 'Too Short!')
	.max(50, 'Too Long!')
	.matches(nameRegex, "Must start-end with alphanumeric char and can contain '-' ex: web-app2")
	.required('Namespace Required'),
	replicas: Yup.number().integer()
	.min(1, 'Please input at least 1 !')
	.max(100, 'Please input less than 100 !')
	.required('Replica number Required'),
	image: Yup.string()
	.min(2, 'Too Short!')
	.max(100, 'Too Long!')
 	.required('Image name required'),
	requestCpu: Yup.string()
	.matches(cpuRegex, "Must be 1-5 numbers with m unit ex: 1, 2, 100m, 200m"),
	limitCpu: Yup.string()
	.matches(cpuRegex, "Must be 1-5 numbers with m unit ex: 1, 2, 100m, 200m"),
	requestMemory: Yup.string()
	.matches(capacityRegex, "Must be number with units ex: 127M, 256Mi, 1G, 2Gi"),
	limitMemory: Yup.string()
	.matches(capacityRegex, "Must be number with units ex: 127M, 256Mi, 1G, 2Gi"),
	 ports: Yup.array().of(Yup.object().shape({
		name: Yup.string()
		.min(1, 'Too Short !')
		.max(100, 'Too Long !')
		.matches(nameRegex, "Must start-end with lowercase alphanumeric char and can contain '-' ex: web-app2")
		.required('Port Name Required'),
  		number: Yup.number().integer()
		.min(0, 'Please input port number between 0-49151')
		.max(49151, 'Please input port number between 0-49151')
		.required('Port Number Required'),
	})),
	envs: Yup.array().of(Yup.object().shape({
		name: Yup.string()
		.min(1, 'Too Short !')
		.max(100, 'Too Long !')
		.required('Env Name Required'),
  		value: Yup.string()
		.min(1, 'Too Short !')
		.max(100, 'Too Long !')
		.required('Env Value Required'),
	})),
}); 

const initialValues =	{
	name: 'my-app',
	namespace: 'my-namespace',
	replicas: 3,
	image: 'nginx:latest',
	requestCpu: '100m',
	requestMemory: '64Mi',
	limitCpu: '200m',
	limitMemory: '128Mi',
	service: 'ClusterIP',
	envs: [{name: 'MY-ENV', value: 'MY-VALUE'}],
	ports: [{name: 'web', number: '80', protocol: 'TCP', expose: 'true'}]
};

function StatelessAppForm() {
	const [app, setApp] = useState(initialValues);
	return (
		<div className='col'>
			<Row><h1>Application Specification</h1></Row>
			<Formik
				initialValues={initialValues}
				validationSchema={ApplicationSpecSchema}
				onSubmit={async values => {
					await new Promise(r => setTimeout(r, 500));
					//alert(JSON.stringify(values, null, 2));
					setApp(values);
				}}	
			>
			{({ values }) => (
				<Form inline="true">
					<Row className='my-1'>
						<h5 className='w-25 my-auto'>Name:</h5><Field className='w-75' name="name" />
					</Row>
					<Row className='text-danger'><ErrorMessage name="name"/></Row>
					<Row className='my-1'>
						<h5 className='w-25 my-auto'>NameSpace:</h5><Field className='w-75' name="namespace" />
					</Row>
					<Row className='text-danger'><ErrorMessage name="namespace"/></Row>
					<Row className='my-1'>
						<h5 className='w-25 my-auto'>Replicas:</h5><Field className='w-75' name="replicas" type='number'/>
					</Row>
					<Row className='text-danger'><ErrorMessage name="replicas"/></Row>
					<Row className='my-1'><h3 className='my-2'>Container Specification:</h3></Row>
					<Row className='my-1'>
						<label className='w-25 my-auto'>Image Name: </label><Field className='w-75' name="image" />
					</Row>
					<Row className='text-danger'><ErrorMessage name="image"/></Row>
					<Row className='my-1'><h4 className='my-2'>Resources</h4></Row>
					<Row><h5 className='text-primary'>Requests:</h5></Row>
					<Row className='my-1'>
						<label className='w-25 my-auto'> CPU: </label><Field className='w-75' name="requestCpu" />
					</Row>
					<Row className='text-danger'><ErrorMessage name="requestCpu"/></Row>
					<Row className='my-1'>
						<label className='w-25 my-auto'> Memory: </label><Field className='w-75' name="requestMemory" />
					</Row>
					<Row className='text-danger'><ErrorMessage name="requestMemory"/></Row>
					<Row><h5 className='text-secondary'>Limits:</h5></Row>
					<Row className='my-1'>
						<label className='w-25 my-auto'> CPU: </label><Field className='w-75' name="limitCpu" />
					</Row>
					<Row className='text-danger'><ErrorMessage name="limitCpu"/></Row>
					<Row className='my-1'>
						<label className='w-25 my-auto'> Memory: </label><Field className='w-75' name="limitMemory" />
					</Row>
					<Row className='text-danger'><ErrorMessage name="limitMemory"/></Row>
					{/* Environment Block */}
					<Row className='my-1'><h4 className='my-2'>Environment:</h4></Row>
					<FieldArray name="envs">
						{({ insert, remove, push }) => (
							<div>
								{values.envs.length > 0 &&
								values.envs.map((env, index) => (
									<div className='row my-1' key={index}>
										<div className="col-5">
											<label className="w-20 mr-1" htmlFor={`envs.${index}.name`}>Name:</label>
											<Field className="w-75" name={`envs.${index}.name`}/>
											<Row className='text-danger'><ErrorMessage name={`envs.${index}.name`}/></Row>
										</div>
										<div className="col-5">
											<label className="w-20 mr-1" htmlFor={`envs.${index}.value`}>Value:</label>
											<Field className="w-75" name={`envs.${index}.value`}/>
											<Row className='text-danger'><ErrorMessage name={`envs.${index}.value`}/></Row>
										</div>
										<div className="col-2">
											<button
												type="button"
												className="btn btn-secondary"
												onClick={() => remove(index)}
											>
												X
											</button>
										</div>
									</div>
								)
							)}
							<div className='row'>
								<button
									type="button"
									className="btn btn-primary float-right"
									onClick={() => push({name: 'MY-ENV', value: 'MY-VALUE'})}
								>
									Add More Env
								</button>
							</div>
						</div>
					)}
					</FieldArray>
					{/* Services Block */}
					<Row className='my-1'><h3 className='my-2'>Service Endpoint:</h3></Row>
					<Row className='my-1'>
						<h5 className='w-25'>Service Type: </h5>
						<label className='w-25'>
            			<Field type="radio" name="service" value="ClusterIP" /> ClusterIP
						</label>
          				<label className='w-25'>
          				<Field type="radio" name="service" value="NodePort" /> NodePort
          				</label>
					</Row>
					<Row ><h5>Ports:</h5></Row>
					<FieldArray name="ports">
						{({ insert, remove, push }) => (
							<div>
								{values.ports.length > 0 &&
									values.ports.map((port, index) => (
										<div className='row' key={index}>
											<div className="col w-25 my-auto">
												<label className="row w-75" htmlFor={`ports.${index}.name`}>Name:</label>
												<Field className="row w-100" name={`ports.${index}.name`}/>
												<Row className='text-danger'><ErrorMessage name={`ports.${index}.name`}/></Row>
											</div>
											<div className="col w-25 my-auto">
												<label className="row w-75" htmlFor={`ports.${index}.number`}>Port No:</label>
												<Field className="row w-75" name={`ports.${index}.number`} type="number"/>
												<Row className='text-danger'><ErrorMessage name={`ports.${index}.number`}/></Row>
											</div>
											<div className="col w-25 my-auto">
												<label className="row w-75" htmlFor={`ports.${index}.protocol`}>Protocol:</label>
												<div className="row w-75">
													<label className='mr-3'>
         									  			<Field type="radio" name={`ports.${index}.protocol`} value="TCP" />
         									  			TCP
         											</label>
         											<label>
         									 			<Field type="radio" name={`ports.${index}.protocol`} value="UDP" />
         									  			UDP
         											</label>
												</div>
											</div>
											<div className="col w-25 my-auto">
												<label className="row w-75" htmlFor={`ports.${index}.expose`}>Exposed:</label>
												<label className='mr-3'>
         								  			<Field type="radio" name={`ports.${index}.expose`} value="true" />
         								  			TRUE
         										</label>
         										<label>
         								  			<Field type="radio" name={`ports.${index}.expose`} value="false" />
         								  			FALSE
         										</label>
											</div>
											<div className="col">
												<button
													name={`ports.${index}.removePort`}
													type="button"
													className="btn btn-secondary"
													onClick={() => remove(index)}
												>
													X
												</button>
											</div>
										</div>
									))}
								<div className='row'>
									<button
										name='addPort'
										type="button"
										className="btn btn-primary float-right mt-1"
										onClick={() => push({name: 'web', number: '80', protocol: 'TCP', expose: 'true'})}
									>
									Add More Port
								</button>
								</div>
							</div>
						)}
					</FieldArray>
					<button name="submitStateless" type="submit" className="btn btn-secondary my-5">KUBE NOW !</button>
				</Form>
			)}
			</Formik>
			<StatelessAppResult app={app}>{" "}</StatelessAppResult>
		</div>
	);
}

export default StatelessAppForm;