// Configure Cognito
const poolData = {
    UserPoolId: 'ap-south-1_02GdgF0x4', // Your User Pool ID
    ClientId: '19ekqosinh7s7hb5jqikej5c2d', // Your Client ID
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
                            document.getElementById('user-name').innerText = `Welcome, ${userName}`;
                        }
                    });
                }
            });
        }
    });
} else {
    console.log("No user is logged in");
}
