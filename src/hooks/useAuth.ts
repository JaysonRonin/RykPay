import { useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function authenticate() {
    // To-do: further enhance for checking devices enroll status and error
    // const permission = await LocalAuthentication.isEnrolledAsync();

    const result = await LocalAuthentication.authenticateAsync({
      biometricsSecurityLevel: 'strong',
      promptMessage: 'Authenticate to Proceed',
      fallbackLabel: 'Use Passcode',
    });

    setIsAuthenticated(result.success);
    return result.success;
  }

  return { isAuthenticated, authenticate };
}
