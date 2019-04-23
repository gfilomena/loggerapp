# Create image based on the official Node 10.14.2 image from dockerhub
FROM node:10.14.2

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json /app/

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /app/

# Expose the port the app runs in
EXPOSE 4000

# Serve the app
CMD ["npm", "start"]



#Command instructions  to use for building the image: docker build -t loggerapp:dev .
#Run a container with the image: docker run -d --name cont1 -p 4000:4000 loggerapp:dev