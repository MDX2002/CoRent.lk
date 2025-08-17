pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "kivindu744/listing-service"
        CONTAINER_NAME = "listing-service"
    }

    stages {
        stage('Checkout Code') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/MDX2002/CoRent.lk.git'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('listing-service') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('listing-service') {
                    bat 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %DOCKER_IMAGE%:%BUILD_NUMBER% ./listing-service"
                bat "docker tag %DOCKER_IMAGE%:%BUILD_NUMBER% %DOCKER_IMAGE%:latest"
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-password', variable: 'DOCKER_PASS')]) {
                    bat "docker login -u kivindu744 -p %DOCKER_PASS%"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat "docker push %DOCKER_IMAGE%:%BUILD_NUMBER%"
                bat "docker push %DOCKER_IMAGE%:latest"
            }
        }

        stage('Deploy Listing Service') {
            steps {
                // Stop the old container if running
                bat "docker stop %CONTAINER_NAME% || echo 'Container not running'"
                bat "docker rm %CONTAINER_NAME% || echo 'Container already removed'"

                // Run new container
                bat """
                docker run -d --name %CONTAINER_NAME% -p 5000:5000 `
                --env-file listing-service/.env `
                %DOCKER_IMAGE%:latest
                """
            }
        }
    }

    post {
        always {
            bat 'docker logout'
        }
    }
}
