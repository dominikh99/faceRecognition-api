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

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                        // "base64": IMAGE_BYTES_STRING
                    }
                }
            }
        ]
    });
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs/", requestOptions)
        .then(response => res.json(response))
        .catch(err => res.status(400).json('Unable to work with API'));
}

module.exports = {
    handleImageApi
}