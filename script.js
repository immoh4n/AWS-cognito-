// Configure Cognito
const poolData = {
    UserPoolId: 'ap-south-1_02GdgF0x4', // Your User Pool ID
    ClientId: '19ekqosinh7s7hb5jqikej5c2d', // Your Client ID
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Check if the user is logged in
const cognitoUser = userPool.getCurrentUser();

if (cognitoUser) {
    console.log("User found: ", cognitoUser);
    cognitoUser.getSession(function(err, session) {
        if (err) {
            console.error("Error getting session: ", err);
            return;
        }

        if (session.isValid()) {
            console.log("Session is valid. Fetching user attributes...");
            
            // Get user attributes
            cognitoUser.getUserAttributes(function(err, attributes) {
                if (err) {
                    console.error("Error fetching attributes: ", err);
                } else {
                    console.log("Attributes fetched: ", attributes);
                    attributes.forEach(attr => {
                        console.log(attr.getName(), attr.getValue()); // Debug attribute names and values
                        if (attr.getName() === 'name') {
                            const userName = attr.getValue();
                            document.getElementById('user-name').innerText = `Welcome, ${userName}`;
                        }
                    });
                }
            });
        } else {
            console.log("Session is not valid.");
        }
    });
} else {
    console.log("No user is logged in");
}
