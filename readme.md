
In the **config.js** file, located in the **src** folder, find **config.host** and **config.authKey** and replace the placeholder values with the values obtained for your account.

## Deploy this sample to Azure

1. If you haven't already, enable a git repository for your Azure Website. You can find instructions on how to do this [here](https://azure.microsoft.com/en-us/documentation/articles/web-sites-publish-source-control-git/#step4).

2. Add your Azure Website as a git remote.

		git remote add azure https://username@your-website.scm.azurewebsites.net:443/your-website.git

3. Deploy by pushing to the remote.

		git push azure master

4. In a few seconds, git will finish publishing your web application and launch a browser where you can see your handy work running in Azure.

## More information

- [Build a Node.js web application using DocumentDB](https://azure.microsoft.com/en-us/documentation/articles/documentdb-nodejs-application/)