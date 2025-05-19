pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'adem1967/node-app'
        DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
    }
    triggers {
        githubPush()
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Adem1967/node-app.git'
            }
        }

        stage('Install Dependencies & Run Tests') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                sh '''
                docker rm -f node-app-staging || true
                docker run -d --name node-app-staging -p 3001:3000 ${DOCKER_IMAGE}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Manual Approval for Production') {
            steps {
                input message: "Deploy to Production?"
            }
        }

        stage('Deploy to Production') {
            steps {
                sh '''
                docker rm -f node-app-prod || true
                docker run -d --name node-app-prod -p 3000:3000 ${DOCKER_IMAGE}:${BUILD_NUMBER}
                '''
            }
        }
    }
}
