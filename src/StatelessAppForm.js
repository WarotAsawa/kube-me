import React, {useState} from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Row } from 'react-bootstrap';
import StatelessAppResult from './StatelessAppResult';
import * as Yup from 'yup';

const ApplicationSpecSchema = Yup.object().shape({
	name: Yup.string()
	  .min(2, 'Too Short!')
	  .max(50, 'Too Long!')
	  .required('Name Required'),
	namespace: Yup.string()
		.min(2, 'Too Short!')
	  .max(50, 'Too Long!')
		.required('Namespace Required'),
	replicas: Yup.number()
		.min(1, 'Please input at least 1 !')
	  .max(100, 'Please input less than 100 !')
	  .required('Replica number Required'),
	image: Yup.string()
		.min(2, 'Too Short!')
	  .max(50, 'Too Long!')
		.required('Image name required'),
	port: Yup.number()
		.min(0, 'Please input port number between 0-49151')
		.max(49151, 'Please input port number between 0-49151')
		.required('Port Number Required'),
  }); 
const initialValues =	{
	application: {
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
	},
};

function StatelessAppForm() {
	const [app, setApp] = useState(initialValues);
	return (
		<div className='col'>
			<Row><h1>Application Specification</h1></Row>
			<Formik
				initialValues={initialValues}
				// validationSchema={ApplicationSpecSchema}
				onSubmit={async values => {
					await new Promise(r => setTimeout(r, 500));
					//alert(JSON.stringify(values, null, 2));
					setApp(values);
				}}	
			>
			{({ values }) => (
				<Form inline>
					<Row className='my-1'>
						<h5 className='w-25'>Name:</h5>
						<Field className='w-75' name="application.name" />
					</Row>
					<Row className='my-1'>
					<h5 className='w-25'>NameSpace:</h5>
						<Field className='w-75' name="application.namespace" />
					</Row>
					<Row className='my-1'>
					<h5 className='w-25'>Replicas:</h5>
						<Field className='w-75' name="application.replicas" />
					</Row>
					<Row className='my-1'><h3 className='my-2'>Container Specification:</h3></Row>
					<Row className='my-1'>
					<label className='w-25'>Image Name: </label>
						<Field className='w-75' name="application.image" />
					</Row>
					<Row className='my-1'><h4 className='my-2'>Resources</h4></Row>
					<Row><h5 className='text-primary'>Requests:</h5></Row>
					<Row className='my-1'>
						<label className='w-25'> CPU: </label>
						<Field className='w-75' name="application.requestCpu" />
					</Row>
					<Row className='my-1'>
						<label className='w-25'> Memory: </label>
						<Field className='w-75' name="application.requestMemory" />
					</Row>
					<Row><h5 className='text-secondary'>Limits:</h5></Row>
					<Row className='my-1'>
						<label className='w-25'> CPU: </label>
						<Field className='w-75' name="application.limitCpu" />
					</Row>
					<Row className='my-1'>
						<label className='w-25'> Memory: </label>
						<Field className='w-75' name="application.limitMemory" />
					</Row>
					{/* Environment Block */}
					<Row className='my-1'><h4 className='my-2'>Environment:</h4></Row>
					<FieldArray name="application.envs">
						{({ insert, remove, push }) => (
							<div>
								{values.application.envs.length > 0 &&
								values.application.envs.map((env, index) => (
									<div className='row my-1' key={index}>
										<div className="col-5">
											<label className="w-20 mr-1" htmlFor={`application.envs.${index}.name`}>Name:</label>
											<Field className="w-75" 
												name={`application.envs.${index}.name`}
												placeholder="MY-ENV"
												type="text"
											/>
											<ErrorMessage
												name={`application.envs.${index}.name`}
												component="div"
												className="field-error"
											/>
										</div>
										<div className="col-5">
											<label className="w-20 mr-1" htmlFor={`application.envs.${index}.value`}>Value:</label>
											<Field className="w-75" 
												name={`application.envs.${index}.value`}
												placeholder="MY-VALUE"
												type="text"
											/>
											<ErrorMessage
												name={`application.envs.${index}.value`}
												component="div"
												className="field-error"
											/>
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
            <Field type="radio" name="application.service" value="ClusterIP" />
            ClusterIP
          </label>
          <label className='w-25'>
            <Field type="radio" name="application.service" value="NodePort" />
            NodePort
          </label>
					</Row>
					<Row ><h5>Ports:</h5></Row>
					<FieldArray name="application.ports">
						{({ insert, remove, push }) => (
							<div>
								{values.application.ports.length > 0 &&
									values.application.ports.map((port, index) => (
										<div className='row' key={index}>
											<div className="col w-25">
												<label className="row w-75" htmlFor={`application.ports.${index}.name`}>Name:</label>
												<Field className="row w-100" 
													name={`application.ports.${index}.name`}
													placeholder="web-http"
													type="text"
												/>
												<ErrorMessage
													name={`application.ports.${index}.name`}
													component="div"
													className="field-error"
												/>
											</div>
											<div className="col w-25">
												<label className="row w-75" htmlFor={`application.ports.${index}.number`}>Port No:</label>
												<Field className="row w-75"
													name={`application.ports.${index}.number`}
													placeholder="80"
													type="text"
												/>
												<ErrorMessage
													name={`application.ports.${index}.number`}
													component="div"
													className="field-error"
												/>
											</div>
											<div className="col w-25">
												<label className="row w-75" htmlFor={`application.ports.${index}.protocol`}>Protocol:</label>
												<div className="row w-75">
													<label className='mr-3'>
         									  <Field type="radio" name={`application.ports.${index}.protocol`} value="TCP" />
         									  TCP
         									</label>
         									<label>
         									  <Field type="radio" name={`application.ports.${index}.protocol`} value="UDP" />
         									  UDP
         									</label>
												</div>
												<ErrorMessage
													name={`application.ports.${index}.protocol`}
													component="div"
													className="field-error"
												/>
											</div>
											<div className="col w-25">
												<label className="row w-75" htmlFor={`application.ports.${index}.expose`}>Exposed:</label>
												<label className='mr-3'>
         								  <Field type="radio" name={`application.ports.${index}.expose`} value="true" />
         								  TRUE
         								</label>
         								<label>
         								  <Field type="radio" name={`application.ports.${index}.expose`} value="false" />
         								  FALSE
         								</label>
												<ErrorMessage
													name={`application.ports.${index}.expose`}
													component="div"
													className="field-error"
												/>
											</div>
											<div className="col">
												<button
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
					<button type="submit" class="btn btn-secondary my-5">KUBE NOW !</button>
				</Form>
			)}
			</Formik>
			<StatelessAppResult app={app.application}>{" "}</StatelessAppResult>
		</div>
	);
}

export default StatelessAppForm;