# use lightweight node as base image
FROM node:alpine

# env variables
ENV PORT 3001

# set working directory to /app
WORKDIR /app

# copy package.json first, and install dependencies (for caching)
COPY package.json .
RUN ["yarn"]

# copy rest of files
COPY . .

# expose port 3001
EXPOSE 3001

# switch to non-root user "node" to run app
USER node

# run app
CMD ["yarn", "start"]