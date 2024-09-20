const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const { CognitoUserPool, CognitoUser } = require('amazon-cognito-identity-js');

const app = express();
app.use(bodyParser.json());

const poolData = {
    UserPoolId: 'ap-south-1_02GdgF0x4',  // Your User Pool ID
    ClientId: '19ekqosinh7s7hb5jqikej5c2d'  // Your Client ID
};

// Route to fetch logged-in user's data
app.get('/user', (req, res) => {
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
        cognitoUser.getSession((err, session) => {
            if (err) {
                return res.status(401).send('User not authenticated');
            }

            cognitoUser.getUserAttributes((err, attributes) => {
                if (err) {
                    return res.status(500).send('Error fetching attributes');
                }

                // Find and send the name attribute
                const nameAttr = attributes.find(attr => attr.getName() === 'name');
                res.json({ name: nameAttr ? nameAttr.getValue() : 'Guest' });
            });
        });
    } else {
        res.status(401).send('No user logged in');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
