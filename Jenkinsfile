pipeline {
    agent any
    stages {
        stage ('Install') {
            steps{
                sh 'yarn install'   
            }
        }
        stage ('Build') {
            steps{
                script{
                    if (env.BRANCH_NAME == 'master' || env.BRANCH_NAME.startsWith('release-')) {
                        sh 'yarn run build'
                        sh 'echo "build_info = \\"${BRANCH_NAME}.${BUILD_NUMBER}\\"" > build/version.js'
                        sh 'cd ./build && tar -czvf ../build.tar.gz ./'

                        def server = Artifactory.server "artifactory" // Artifactory server ID from Jenkins configuration

                        def uploadSpec = """{
                            "files": [
                                {
                                    "pattern": "./build.tar.gz",
                                    "target": "ui-frontend-adv-""" + 
                                    (env.BRANCH_NAME == 'master' ? 'master' : 'release') + """/build-files/"
                                }
                            ]
                        }"""

                        server.upload(uploadSpec)
                    } else {
                        sh 'yarn run build'
                    }
                }
            }
        }
    }
}
