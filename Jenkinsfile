pipeline {
    agent {
        label 'dind'
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/NoaMatout/chuck_citations-api', branch: 'main'
                sh 'ls -la'
            }
        }

        stage('Build and push image') {
            steps {
                sh '''
                docker build -t registry.home.arpa:5000/chuck_api:latest .
                docker push registry.home.arpa:5000/chuck_api:latest
                '''
            }
        }
    }
}
