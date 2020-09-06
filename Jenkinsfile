pipeline {
	/*
	Prepare: Pull Code from Git (dev banch), build temp docker image. 
	Test: Test code on Docker and if pass
	Result: IF Pass then merge code to master, go to BUILD.
	IF Failed. Do nothing
	Build: build production docker image. Push new image to hub
	Deploy: kubectl apply changed deployment
	*/

	//Run only on dev-node slave
	agent { label 'gotham-ci'}
	parameters {
		string(name: 'TEST_PORT', defaultValue: '3000', description: 'Port for testing')
		string(name: 'PROD_PORT', defaultValue: '30555', description: 'Port for production')
		string(name: 'TEST_URL', defaultValue: 'http://localhost', description: 'URL for docker testing')
		string(name: 'PROD_URL', defaultValue: 'http://k8s-7.ezmeral.hpe.lab', description: 'URL for docker testing')
	}
	stages {
		stage('Prepare Test') {
			steps {
				echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
				dir('/root/kube-me') {
					echo "Git Check out to Branch: dev"
					sh "git checkout dev"
					echo "Pull latest code from WarotAsawa/kube-me Branch: dev"
					sh "git pull"
				}
			}
		}
		stage('Build Test') {
			steps {
				dir('/root/kube-me') {
					echo "Building temp docker image"
					sh "docker build -t temp-kube-me:dev ."
				}
			}
		}
		stage('Run Test') {
			steps {
				dir('/root/kube-me') {
					echo "Running temp docker image with port 3000"
					sh "docker run --name tempweb -d -p ${params.TEST_PORT}:3000 temp-kube-me:dev"
					echo "Waiting for NodeJS Service to be Ready"
					sleep(time: 30, unit: "SECONDS")
					retry(3) {
						sleep(time: 10, unit: "SECONDS")
						echo "Test web connectivity"
						sh "docker exec -i tempweb npm test"
					}
					echo "Test Pass. Cleaning up containers"
					sh "docker stop tempweb"
					sh "docker rm tempweb"
				}
			}
		}
		stage('Build Prod') {
			steps {
				dir('/root/kube-me') {
					echo "Merge to master and push"
					sh "git checkout master"
					sh "git merge dev"
					sh "git push"
					echo "Checkout git back to dev branch"
					sh "git checkout dev"
					echo "Building production docker image"
					sh "docker build -t asawakow/kube-me:dev ."
					echo "Push Image to docker.hub"
					sh "docker push asawakow/kube-me:dev"
				}
			}
		}
		stage('Deploy Prod on k8s') {
			steps {
				dir('/root/kube-me/src/kubectl') {
					echo "Sleep 15s for docker hub to ready"
					sleep(time: 15, unit: "SECONDS")
					echo "Re-deployging Web-App"
					sh "kubectl delete -f deploy-kube-me.yaml"
					sh "kubectl apply -f deploy-kube-me.yaml"
					echo "Applying Services"
					sh "kubectl apply -f svc-kube-me.yaml"
				}
			}
		}
		stage('Verify deployment') {
			steps {
				retry(3) {
					sleep(time: 15, unit: "SECONDS")
					echo "Test web connectivity"
					sh "curl -I ${params.PROD_URL}:${params.PROD_PORT}"
				}
				echo "Test Pass. All Done"
			}
		}
	}
}
