import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";

export async function cognitoAuthFunction(email: string, password: string) {
  const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

  const secretHash = generateSecretHash(
    email,
    process.env.COGNITO_CLIENT_ID!,
    process.env.COGNITO_CLIENT_SECRET!
  );

  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_CLIENT_ID ?? "",
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  });

  try {
    const response = await client.send(command);
    return {
      id: response.AuthenticationResult?.AccessToken,
      email: email,
      idToken: response.AuthenticationResult?.IdToken,
      accessToken: response.AuthenticationResult?.AccessToken,
      refreshToken: response.AuthenticationResult?.RefreshToken,
    };
  } catch (error) {
    console.error("Falha na autenticação Cognito:", error);
    throw new Error("Credenciais inválidas");
  }
}

function generateSecretHash(
  username: string,
  clientId: string,
  clientSecret: string
) {
  return crypto
    .createHmac("SHA256", clientSecret)
    .update(username + clientId)
    .digest("base64");
}
