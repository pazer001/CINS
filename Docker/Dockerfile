FROM ubuntu:17.04
RUN apt-get update
RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y openssh-server
RUN apt-get install -y sudo
RUN apt-get install -y net-tools
RUN export NODE_ENV=Production
RUN apt-get update
EXPOSE 80
EXPOSE 22