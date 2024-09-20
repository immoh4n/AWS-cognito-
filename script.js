// Configure Cognito
const poolData = {
    UserPoolId: 'your_user_pool_id', // Replace with your User Pool ID
    ClientId: 'your_client_id', // Replace with your Client ID
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Check if user is logged in
const cognitoUser = userPool.getCurrentUser();

if (cognitoUser) {
    cognitoUser.getSession(function(err, session) {
        if (err) {
            console.log(err);
            return;
        }

        if (session.isValid()) {
            // Get user attributes
            cognitoUser.getUserAttributes(function(err, attributes) {
                if (err) {
                    console.log(err);
                } else {
                    attributes.forEach(attr => {
                        if (attr.getName() === 'name') {
                            const userName = attr.getValue();
                            document.getElementById('user-name').innerText = userName;
                        }
                    });
                }
            });
        }
    });
} else {
    console.log("No user is logged in");
}
