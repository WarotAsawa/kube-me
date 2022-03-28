pipeline {
  agent {
    node {
      label 'gotham-ci'
    }
  }
  stages {
    stage('Prepare Test') {
      steps {
        echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
        dir(path: '/root/kube-me') {
          echo 'Git Check out to Branch: dev'
          sh 'git checkout dev'
          echo 'Pull latest code from WarotAsawa/kube-me Branch: dev'
          sh 'git pull'
        }
      }
    }
    stage('Build Test') {
      steps {
        dir(path: '/root/kube-me') {
          echo 'Building temp docker image'
          sh 'docker build -t temp-kube-me:dev .'
        }
      }
    }
    stage('Run Test') {
      steps {
        dir(path: '/root/kube-me') {
          echo 'Clean up leftover container'
          sh 'docker stop tempweb || true'
          echo "Running temp docker image with port ${params.TEST_PORT}"
          sh "docker run --name tempweb --rm -d -p ${params.TEST_PORT}:3000 temp-kube-me:dev"
          echo 'Waiting for NodeJS Service to be Ready'
          sleep(time: 30, unit: 'SECONDS')
          retry(count: 3) {
            sleep(time: 10, unit: 'SECONDS')
            echo 'Test web functionalities'
            sh 'docker exec -i tempweb npm test ./test/App.test.js'
          }
          echo 'Test Pass. Cleaning up containers'
          sh 'docker stop tempweb'
        }
      }
    }
    stage('Build Prod') {
      steps {
        dir(path: '/root/kube-me') {
          echo 'Merge to master and push'
          sh 'git checkout master'
          sh 'git merge dev'
          sh 'git push'
          echo 'Checkout git back to dev branch'
          sh 'git checkout dev'
          echo 'Building production docker image'
          sh 'docker build -t asawakow/kube-me:dev .'
          echo 'Push Image to docker.hub'
          sh 'docker push asawakow/kube-me:dev'
        }
      }
    }
    stage('Deploy Prod on k8s') {
      steps {
        dir(path: '/root/kube-me/src/kubectl') {
          echo 'Sleep 15s for docker hub to ready'
          sleep(time: 15, unit: 'SECONDS')
          echo 'Re-deployging Web-App'
          sh 'kubectl delete -f deploy-kube-me.yaml || true'
          sh 'kubectl apply -f deploy-kube-me.yaml'
          echo 'Applying Services'
          sh 'kubectl apply -f svc-kube-me.yaml'
        }

      }
    }
    stage('Verify deployment') {
      steps {
        retry(count: 5) {
          sleep(time: 15, unit: 'SECONDS')
          echo 'Test web connectivity'
          sh "curl -I http://${params.PROD_HOST}:${params.PROD_PORT}"
        }

        echo 'Test Pass. All Done'
      }
    }
  }
  parameters {
    string(name: 'TEST_HOST', defaultValue: 'gotham-ci.hpe.lab', description: 'URL for docker testing')
    string(name: 'TEST_PORT', defaultValue: '3000', description: 'Port for testing')
    string(name: 'BROWSER_HOST', defaultValue: 'gotham-ci.hpe.lab', description: 'URL for Selenium Remote Web Driver')
    string(name: 'BROWSER_PORT', defaultValue: '4444', description: 'Port for Selenium Remote Web Driver')
    string(name: 'PROD_HOST', defaultValue: 'kube-me-ci.ezmeral.hpe.lab', description: 'URL for production endpoint testing')
    string(name: 'PROD_PORT', defaultValue: '80', description: 'Port for production')
  }
}
