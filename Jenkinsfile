pipeline {
    agent any

    stages {
        stage('Application1') {
            steps {
                echo 'Application install & build'
                sh 'cd app && yarn'
                sh 'cd app && npm run build'
            }
        }
    }
}