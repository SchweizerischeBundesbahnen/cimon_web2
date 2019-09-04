pipeline {
  agent { label 'nodejs' }

  tools {
    maven 'Apache Maven 3.3'
    jdk 'OpenJDK 1.8 64-Bit'
  }

  stages {

    stage('Prepare') {
      steps {
        sh 'npm ci'
        sh 'npm run lint'
      }
    }

    stage('Unit Tests') {
      steps {
        // Use this as soon as you have adjusted environment.ts with your authconfig
        withCredentials([
          usernamePassword(credentialsId: 'browserstack',
            passwordVariable: 'BROWSERSTACK_ACCESS_KEY',
            usernameVariable: 'BROWSERSTACK_USERNAME')
        ]) {
          sh 'npm run test-browserstack'
          sh 'npm run e2e-browserstack'
          junit '**/reports/*.xml'
        }

        withSonarQubeEnv('Sonar SBB CFF FFS AG') {
          sh 'mvn -B org.jacoco:jacoco-maven-plugin:prepare-agent test'
          sh 'mvn -B sonar:sonar -Dsonar.branch=$BRANCH_NAME'
        }
      }
    }

    stage('When on develop, deploy snapshot and analyze for sonar') {
      when {
        branch 'develop'
      }
      steps {
        // Build frontend code
        sh 'npm run build-prod-ci'

        // Upload to artifactory
        bin_mvnBuildScan(
          targetRepo: "<your-repo>.mvn",
          additionalMavenGoals: "",
          deployArtifacts: true,
          scanBuild: false,
          failBuild: false)

        // Build docker image
        cloud_buildDockerImage(artifactoryProject: "<your-repo>", tag: "latest")
      }
    }

    stage('When on master, we create a release & deploy') {
      when {
        branch 'master'
      }
      steps {
        script {
          // Build frontend code
          sh 'npm run build-prod-ci'

          // Create a release build using gitflow
          def releasedPom = bin_releaseMvn(
            targetRepo: '<your-repo>.mvn',
            additionalMavenGoals: ""
          )

          // Build docker image
          cloud_buildDockerImage(artifactoryProject: "<your-repo>", ocAppVersion: releasedPom.version)

          // deploy prod
          cloud_callDeploy(cluster: "<your-cluster>", project: "<your-openshift-project>", dc: "<your-deployment-config>", credentialId: "<your-credential>")
        }
      }
    }
  }
}
