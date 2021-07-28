##  Table of contents
1. Technologies used
2. Requirements
3. Installation
4. Pull and run with commands 


###  1) Technologies used:-
(a) Nodejs & Express for backend (API layer)
(b) Mongodb database
(c) HTML5/CSS3 for frontend
(d) jQuery and Ajax 
(e) Docker


### 2) Requirements:-
	  * You need to have docker installed on your local machine in order to run this program/code.
  
  
### 3) Installation:-
    * If you don’t have docker installed on your local machine, you can install it from (https://docs.docker.com/engine/install/) depending upon the 
       platform(Mac/Windows).
   	* Once installed, open it on your local machine(docker desktop) and it should be running.


### 4) Pull and run with commands:-
       * To run this program, you need to pull it on your local machine using git command. 
	          >> git clone (https://github.com/rahilmemdani/ecommerce_website_Assignment.git)
       * After pulling it on your local machine, go to the path where this project is residing using terminal.
       * Now, you can run it using the docker command.
   	          >> docker-compose up 
      * To check if the docker container is running type command:- 
              >> docker ps
      * To check the image type command:- 
             >> docker images/docker image ls
      * To check all the containers including non-running containers type command:-
             >> docker ps -a
      * Once it’s up and running go to the browser and paste this link (http://localhost/startPage.html)
      * I have mapped on port 80. So, any other project using this port needs to be stopped, else it won’t work.
      * To stop other containers running use command:-
	         >> docker stop container_id / docker kill $(docker ps -q).
      * If you go through any kind of error so check the logs using command:-
             >> docker logs container_id

