// Generated by Selenium IDE
const { Builder, By, Key, until, Capabilities  } = require('selenium-webdriver')
const assert = require('assert')

const expectedDeployment = "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: kube-me\n  namespace: tiny-tenant\n  labels:\n    app: kube-me\nspec:\n  replicas: 5\n  selector:\n    matchLabels:\n      app: kube-me\n  template:\n    metadata:\n      labels:\n        app: kube-me\n    spec:\n      containers:\n        - name: kube-me\n          image: \'asawakow/kube-me:latest\'\n          resources:\n            requests:\n              cpu: 128m\n              memory: 256Mi\n            limits:\n              cpu: 256m\n              memory: 512Mi\n          env:\n            - name: PORT-NO\n              value: \'3000\'\n            - name: IMAGE\n              value: KUBE-ME\n          ports:\n            - name: http-kubeme\n              containerPort: 3000\n              protocol: TCP";
const expectedService = "apiVersion: v1\nkind: Service\nmetadata:\n  name: kube-me\n  namespace: tiny-tenant\n  labels:\n    app: kube-me\nspec:\n  type: NodePort\n  selector:\n    app: kube-me\n  ports:\n    - name: http-kubeme\n      protocol: TCP\n      port: 3000\n      targetPort: 3000";
const expectedStatefulSet = "apiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: ss-kube-me\n  namespace: tiny-tenant\n  labels:\n    app: kube-me\nspec:\n  serviceName: kube-me\n  replicas: 4\n  selector:\n    matchLabels:\n      app: kube-me\n  template:\n    metadata:\n      labels:\n        app: kube-me\n    spec:\n      containers:\n        - name: kube-me\n          image: 'asawakow/kube-me:latest'\n          resources:\n            requests:\n              cpu: 128m\n              memory: 128Mi\n            limits:\n              cpu: 256m\n              memory: 512Mi\n          env:\n            - name: stateful\n              value: 'yes'\n            - name: my-env\n              value: '3000'\n          ports:\n            - name: http-web\n              containerPort: 3000\n              protocol: TCP\n          volumeMounts:\n            - name: data\n              mountPath: /usr/share/nginx/html\n            - name: log\n              mountPath: /var/log\n  volumeClaimTemplates:\n    - metadata:\n        name: data\n      spec:\n        accessModes:\n          - ReadWriteOnce\n        storageClassName: my-storage-class\n        resources:\n          requests:\n            storage: 1Gi\n    - metadata:\n        name: log\n      spec:\n        accessModes:\n          - ReadWriteOnce\n        storageClassName: nimble-default-class\n        resources:\n          requests:\n            storage: 5Gi";
const expectedHeadless = "apiVersion: v1\nkind: Service\nmetadata:\n  name: kube-me\n  namespace: tiny-tenant\n  labels:\n    app: kube-me\nspec:\n  clusterIP: None\n  selector:\n    app: kube-me\n  ports:\n    - name: http-web\n      protocol: TCP\n      port: 3000\n      targetPort: 3000";
//Read .env file
const dotenv = require('dotenv');
dotenv.config();
//Set up envs
const testHost = process.env.TEST_HOST;
const testPort = process.env.TEST_PORT;
const browserHost = process.env.BROWSER_HOST;
const browserPort = process.env.BROWSER_PORT;
//Set up URLs
const browserURL = "http://"+browserHost+":"+browserPort+"/wd/hub";
const testURL = "http://"+testHost+":"+testPort+"/";

describe('kube-me-prebuild', function() {
	this.timeout(30000)
	let driver
	let vars
	beforeEach(async function() {
		console.log("Using Browser : "+browserURL)
		driver = await new Builder()
		.usingServer(browserURL) 
		.forBrowser('firefox')
		.build();
		vars = {};
	})
	afterEach(async function() {
		await driver.quit();
	})
	it('kube-me-stateless-test', async function() {
		console.log("Connecting to " + testURL);
		await driver.get(testURL);
		console.log("Successfully connected " + testURL);
		await ClickComponent(driver,'css',".container > .btn");
		console.log("linkText('STATELESS APPLICATION')).click()");
		await driver.findElement(By.linkText("STATELESS APPLICATION")).click();
		await KeyComponent(driver, 'name', "name", "kube-me");
		await KeyComponent(driver, 'name', "namespace", "tiny-tenant");
		await KeyComponent(driver, 'name', "replicas", "5");
		await KeyComponent(driver, 'name', "image", "asawakow/kube-me:latest");
		await KeyComponent(driver, 'name', "requestCpu", "128m");
		await KeyComponent(driver, 'name', "requestMemory", "256Mi");
		await KeyComponent(driver, 'name', "limitCpu", "256m");
		await KeyComponent(driver, 'name', "limitMemory", "512Mi");
		await KeyComponent(driver, 'name', "envs.0.name", "PORT-NO");
		await KeyComponent(driver, 'name', "envs.0.value", "3000");
		await ClickComponent(driver,'css','.fade:nth-child(1) div:nth-child(22) > .row > .btn');
		await KeyComponent(driver, 'name', "envs.1.name", "IMAGE");
		await KeyComponent(driver, 'name', "envs.1.value", "KUBE-ME");
		await ClickComponent(driver,'css',".row:nth-child(3) > .btn-primary");
		await ClickComponent(driver,'css',".row:nth-child(3) > .col-2 > .btn");
		await ClickComponent(driver,'css',".w-25:nth-child(3) > input");
		await KeyComponent(driver, 'name', "ports.0.name", "http-kubeme");
		await KeyComponent(driver, 'name', "ports.0.number", "3000");
		await ClickComponent(driver,'name',"ports.0.protocol");
		await ClickComponent(driver,'name',"ports.0.expose");
		await ClickComponent(driver,'name',"submitStateless");

		console.log("Delay 3 sec to field to updated");
		await driver.sleep(3000);
		//await sleep(3000);
		console.log("Comparing Deployment YAML");
		let deployYaml = await driver.findElement(By.css(".fade:nth-child(1) .col:nth-child(1) .col:nth-child(1) .card-text:nth-child(1)")).getText();
		console.log("Deployment");
		console.log(deployYaml);
		console.log("Expected Deployment");
		console.log(expectedDeployment);
		
		
		console.log("Comparing Service YAML");
		let serviceYaml = await driver.findElement(By.css(".fade:nth-child(1) .col:nth-child(2) .card-text:nth-child(1)")).getText();
		console.log("Service");
		console.log(serviceYaml);
		console.log("Expected Service");
		console.log(expectedService);
		console.log("Deployment Pass: ");
		console.log(deployYaml==expectedDeployment);
		console.log("Service Pass: ");
		console.log(serviceYaml==expectedService);
		assert(deployYaml == expectedDeployment)
		assert(serviceYaml == expectedService)
	})
	it('kube-me-stateful-test', async function() {
		console.log("Connecting to " + testURL);
		await driver.get(testURL);
		console.log("Successfully connected " + testURL);
		await ClickComponent(driver,'css',".container > .btn");
		console.log("linkText('STATEFUL APPLICATION')).click()");
		await driver.findElement(By.linkText("STATEFUL APPLICATION")).click();
		await KeyComponent(driver, 'css', ".fade:nth-child(2) .my-1:nth-child(1) > .w-75", "kube-me");
		await KeyComponent(driver, 'css', ".fade:nth-child(2) .my-1:nth-child(3) > .w-75", "tiny-tenant");
		await KeyComponent(driver, 'css', ".fade:nth-child(2) .my-1:nth-child(5) > .w-75", "4");
		await KeyComponent(driver, 'css', ".fade:nth-child(2) .my-1:nth-child(8) > .w-75", "asawakow/kube-me:latest");
		await KeyComponent(driver, 'css', ".fade:nth-child(2) .my-1:nth-child(12) > .w-75", "128m");
		await KeyComponent(driver, 'css', ".fade:nth-child(2) .my-1:nth-child(14) > .w-75", "128Mi");
		await KeyComponent(driver, 'css', ".fade:nth-child(2) .my-1:nth-child(17) > .w-75", "256m");
		await KeyComponent(driver, 'css', ".fade:nth-child(2) .my-1:nth-child(19) > .w-75", "512Mi");
		await KeyComponent(driver, 'css', ".fade:nth-child(2) .col-5:nth-child(1) > .w-75", "stateful");
		await KeyComponent(driver, 'css', ".fade:nth-child(2) .col-5:nth-child(2) > .w-75", "yes");
		await ClickComponent(driver,'css','.fade:nth-child(2) div:nth-child(22) > .row > .btn');
		await KeyComponent(driver, 'name', "envs.1.name", "my-env");
		await KeyComponent(driver, 'name', "envs.1.value", "3000");
		await ClickComponent(driver,'css','div:nth-child(24) > .row > .btn');
		await KeyComponent(driver, 'name', "volumeMounts.1.name", "log");
		await KeyComponent(driver, 'name', "volumeMounts.1.mountPath", "/var/log");
		await KeyComponent(driver, 'name', "volumeMounts.1.storageClassName", "nimble-default-class");
		await KeyComponent(driver, 'name', "volumeMounts.1.size", "5Gi");
		await KeyComponent(driver, 'css', "div:nth-child(27) .w-100", "http-web");
		await KeyComponent(driver, 'css', "div:nth-child(27) .col:nth-child(2) > .row:nth-child(2)", "3000");
		await ClickComponent(driver,'name',"submitStateful");

		console.log("Delay 3 sec to field to updated");
		await driver.sleep(3000);
		//await sleep(3000);
		console.log("Comparing StatefulSet YAML");
		let statefulSetYaml = await driver.findElement(By.css(".fade:nth-child(2) .col:nth-child(1) .col:nth-child(1) .card-text:nth-child(1)")).getText();
		console.log("StatefulSet");
		console.log(statefulSetYaml);
		console.log("Expected StatefulSet");
		console.log(expectedStatefulSet);
		
		
		console.log("Comparing Service YAML");
		let headlessYaml = await driver.findElement(By.css(".fade:nth-child(2) .col:nth-child(2) .card-text:nth-child(1)")).getText();
		console.log("Headless Service");
		console.log(headlessYaml);
		console.log("Expected Headless Service");
		console.log(expectedHeadless);
		console.log("StatefulSet Pass: ");
		console.log(statefulSetYaml==expectedStatefulSet);
		console.log("Headless Service Pass: ");
		console.log(headlessYaml==expectedHeadless);
		assert(statefulSetYaml == expectedStatefulSet)
		assert(headlessYaml == expectedHeadless)
	})
})
async function ClickComponent(driver, by, name, isLog=true) {
	if (isLog) console.log("Clicking component "+by+" : "+name);
	if (by == 'name') await driver.findElement(By.name(name)).click();
	else if (by == 'css') await driver.findElement(By.css(name)).click();
	else if (by == 'linkText') await driver.findElement(By.linkText(name)).click();
}
async function KeyComponent(driver, by, name, key, isLog=true) {
	const debugMsg = "Component "+by+" "+name+"'s value: ";
	let resultMsg = "";
	let element;
	if (isLog) console.log("Keying component "+by+" : "+name);
	//Set ELement
	if (by == 'name')  element = driver.findElement(By.name(name));
	else if (by == 'css') element =  driver.findElement(By.css(name));
	//Clear and SendKeys
	await element.clear();
	await element.sendKeys(key); 
	if (isLog) {
		resultMsg = await element.getAttribute("value");
		console.log(debugMsg+resultMsg);
	}
}
function sleep(ms) {
	return new Promise((resolve) => {
	  setTimeout(resolve, ms);
	});
  }   
