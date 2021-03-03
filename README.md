# KUBE-ME

**KUBE-ME** is a simple web-application which help you generate Kubernetes Deployment, Services and StatefulSet from your Container Image. Kube-me is very easy to use. You can simply input only few parameter and you get the **.yaml** file, so you don't have to waste your time to type your own .yaml file any more.

![Home Page](public/assets/img/home-sc.jpg?raw=true)

## Prerequisite

**KUBE-ME** runs on Node JS 12 and ReactJS 1.13 . You need to install NodeJS on your machine first. The other depencies and be found in **package.json** file. Simply use this command to install all dependencies.

    npm install

## How to run

Fist of all, you need to clone this repository.

    git clone https://github.com/WarotAsawa/kube-me.git

Then go into kube-me directory.

    cd kube-me

Since **KUBE-ME** is a NodeJS Application, so you can use this command to run.

    npm start

## Using KUBE-ME

**KUBE-ME** use HTTP on port **3000**. Just open your browser and go to these URLs.

**Local Host**:

    http://localhost:3000

**Server:**

    http://<Server's IP Address>:3000



## Getting your .yaml file

 Open KUBE-ME and click on START KUBING. You can select either Stateless Application or Stateful Application. Here is the differences between two application types:

 1. **Stateless Application**: Provides **Deployment** and **Service** in yaml format
 2. **Stateful Application**: Provides **StatefulSet** and **Headless** Service in yaml format

You can just simply Copy the result to Clipboard or Download it as a file as you like!

![App Page](public/assets/img/app-sc.png?raw=true)
