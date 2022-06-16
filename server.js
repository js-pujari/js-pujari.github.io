var express = require('express')
const DapiApp = require('@dapi-co/dapi-node')
var cors = require('cors')

const app = express()
const port = 8060 // default port to listen
app.use(cors())
app.use(express.json())

const dapi = new DapiApp.default({
    // appSecret: '21f805a7e190538bc2a383e610475296824f19828b9dfdd84e74be3b398834b5', //TEST
    appSecret: 'b025d23dd0ce1a65a7ed78fdb3b00dc598df06a9d50f497b4b5b05e783a480f1', //PP-TEST
})

// define a route handler for the sdk
app.post('/dapi', async (req, res) => {
    console.log(req.body);
    try {

        const dapiResponse = await dapi.handleSDKDapiRequests(req.body, req.headers)
        console.log({ dapiResponse })
        res.send(dapiResponse)

    } catch (error) {

        //Handle Network Errors
        console.dir(error)
    }
})

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})