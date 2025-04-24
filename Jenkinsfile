pipeline {
    agent { label 'dind' }

    parameters {
        choice(name: 'DEPLOY', choices: ['Non', 'Oui'], description: 'Souhaitez-vous déployer ?')
    }

    stages {
        stage('Cloner le repo') {
            steps {
                git url: 'https://github.com/NoaMatout/chuck_citations-api', branch: 'main'
                sh 'ls -la'
            }
        }

        stage('Build & push image') {
            steps {
                sh '''
                docker build -t registry.home.arpa:5000/chuck_api:latest .
                docker push registry.home.arpa:5000/chuck_api:latest
                '''
            }
        }

        stage('Déploiement ?') {
            when {
                expression { return params.DEPLOY == 'Oui' }
            }
            steps {
                sshagent(credentials: ['ssh-dind-prod']) {
                    sh '''
                    echo "[INFO] Connexion à la VM prod et redéploiement..."
                    ssh -o StrictHostKeyChecking=no vagrant@192.168.56.152 '
                        cd ~/prod.home.arpa && \
                        docker compose pull && \
                        docker compose up -d --force-recreate
                    '
                    '''
                }
            }
        }
    }
}
