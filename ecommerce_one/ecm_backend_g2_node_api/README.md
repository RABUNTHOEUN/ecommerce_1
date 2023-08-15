
# Init node project
    - has node in pc (node -v)
    - create folder project(emc_backend_g2_node_api)
    - goto root
    > npm init ///(type Enter 9 time and say "yes")
    - create index.js 
    - run node file
        > node index.js
# Create folder stucture
    - create src
        src/cofig
        src/controller
        src/route
        src/util

# Install dependancy
    - exress js
        > npm install express
        > npm install mysql

# Route param 

    * Parameter 
    # query parameter 
        - req.query 
        // ex: http://localhost:8080/api/customer/get-list?name=dara&gender=male // ?name=dara (name is key, dara value)
    # params parameter
        - req.params 
        // ex: http://localhost:8080/api/customer/get-list/:id  // need declare in route
        // ex: http://localhost:8080/api/customer/get-list/101 => req.params.name
    # body parameter
        - req.body 
        * note add in index.js => app.use(express.json()) //add allow body paremeter
        // ex: http://localhost:8080/api/customer/get-lis

