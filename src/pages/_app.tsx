import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <div className="container">
        <SignedOut>
          <div className="signedOutWrapper">
            <h1 className="title">Welcome to Recipe Viewer 🍽️</h1>
            <p className="subtitle">
              Please sign in or sign up to explore delicious recipes.
            </p>
            <div className="buttonGroup">
              <SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
                <button className="signInButton">Sign In</button>
              </SignInButton>

              <SignUpButton mode="modal" afterSignUpUrl="/" afterSignInUrl="/">
                <button className="signUpButton">Sign Up</button>
              </SignUpButton>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="signedInWrapper">
            <UserButton afterSignOutUrl="/" />
          </div>
          <Component {...pageProps} />
        </SignedIn>

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #E9D5FF 0%, #C4B5FD 50%, #E9D5FF 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem 1rem;
        }
        .signedOutWrapper {
          max-width: 28rem;
          width: 100%;
          text-align: center;
        }
        .title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #5B21B6;
          margin-bottom: 2rem;
        }
        .subtitle {
          margin-bottom: 3rem;
          color: #6B46C1;
          font-size: 1.125rem;
        }
        .buttonGroup {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }
        .signInButton {
          background-color: #5B21B6;
          color: white;
          font-weight: 600;
          font-size: 1.125rem;
          padding: 0.75rem 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.3),
            0 4px 6px -2px rgba(124, 58, 237, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: none;
        }
        .signInButton:hover {
          background-color: #4C1D95;
          transform: translateY(-4px);
          outline: none;
        }
        .signInButton:focus {
          outline: 4px solid #C4B5FD;
          outline-offset: 2px;
        }
        .signUpButton {
          background-color: white;
          color: #6B46C1;
          font-weight: 600;
          font-size: 1.125rem;
          padding: 0.75rem 2rem;
          border-radius: 0.75rem;
          border: 2px solid #6B46C1;
          box-shadow: 0 4px 6px rgba(107, 70, 193, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .signUpButton:hover {
          background-color: #EDE9FE;
          transform: translateY(-4px);
          outline: none;
        }
        .signUpButton:focus {
          outline: 4px solid #C4B5FD;
          outline-offset: 2px;
        }
        .signedInWrapper {
          display: flex;
          justify-content: flex-end;
          padding: 1rem;
          max-width: 90rem;
          margin: 0 auto;
          width: 100%;
        }
      `}</style>
      </div>
    </ClerkProvider>
  );
}
