const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();

// Initiating facial recognition API
// Your PAT (Personal Access Token) can be found in the Account's Security section
const PAT = process.env.PAT;
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'dominikh99';       
const APP_ID = 'face-recognition';
const MODEL_ID = 'face-detection';

const handleImageApi = (req, res) => {
    const { imageUrl } = req.body;
    const IMAGE_URL = imageUrl;

    // This will be used by every Clarifai endpoint call
    const metadata = new grpc.Metadata();
    metadata.set("authorization", "Key " + PAT);

    // To use a local text file, uncomment the following lines
    // const fs = require("fs");
    // const imageBytes = fs.readFileSync(IMAGE_FILE_LOCATION);

    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            model_id: MODEL_ID,
            inputs: [
                {
                    data: {
                        image: {
                            url: IMAGE_URL,
                            // base64: imageBytes,
                            allow_duplicate_url: true
                        }
                    }
                }
            ]
        },
        metadata,
        (err, response) => {
            if (err) {
                res.status(400).json('Unable to work with API.');
            }

            res.json(response);
        }

    );
}

module.exports = {
    handleImageApi
}