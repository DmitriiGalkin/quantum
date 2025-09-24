pipeline {
    agent any

    stages {
//         stage('Application') {
//             steps {
//                 echo 'Application install & build'
//                 sh 'cd app && yarn'
//                 sh 'cd app && npm run build'
//             }
//         }
            stage('Api') {
                steps {
                    echo 'API install & run'
                    sh 'cd server && yarn'
                    sh 'cd server && pm2 start src/index.js -f'
                }
            }
    }
}