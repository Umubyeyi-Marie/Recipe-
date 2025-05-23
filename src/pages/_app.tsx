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
              {/* Pass just text or a span here, no button element */}
              <SignInButton mode="modal"  >
                <span className="signInButton">Sign In</span>
              </SignInButton>

              <SignUpButton mode="modal" >
                <span className="signUpButton">Sign Up</span>
              </SignUpButton>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="signedInWrapper">
            <UserButton  />
          </div>
          <Component {...pageProps} />
        </SignedIn>

        <style jsx>{`
          .container {
            min-height: 100vh;
            background-image:
              linear-gradient(135deg, rgba(233, 213, 255, 0.7), rgba(196, 181, 253, 0.7)),
              url('/food-background.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            color: #4b0082;
          }
          .signedOutWrapper {
            max-width: 28rem;
            width: 100%;
            text-align: center;
            background: rgba(255 255 255 / 0.85);
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          }
          .title {
            font-size: 2.5rem;
            font-weight: 800;
            color: #5b21b6;
            margin-bottom: 2rem;
          }
          .subtitle {
            margin-bottom: 3rem;
            color: #6b46c1;
            font-size: 1.125rem;
          }
          .buttonGroup {
            display: flex;
            justify-content: center;
            gap: 2rem;
          }
          /* Style the spans to look like buttons */
          .signInButton {
            display: inline-block;
            background-color: #5b21b6;
            color: white;
            font-weight: 600;
            font-size: 1.125rem;
            padding: 0.75rem 2rem;
            border-radius: 0.75rem;
            box-shadow:
              0 10px 15px -3px rgba(124, 58, 237, 0.3),
              0 4px 6px -2px rgba(124, 58, 237, 0.15);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            user-select: none;
          }
          .signInButton:hover {
            background-color: #4c1d95;
            transform: translateY(-4px);
            outline: none;
          }
          .signInButton:focus {
            outline: 4px solid #c4b5fd;
            outline-offset: 2px;
          }
          .signUpButton {
            display: inline-block;
            background-color: white;
            color: #6b46c1;
            font-weight: 600;
            font-size: 1.125rem;
            padding: 0.75rem 2rem;
            border-radius: 0.75rem;
            border: 2px solid #6b46c1;
            box-shadow: 0 4px 6px rgba(107, 70, 193, 0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            user-select: none;
          }
          .signUpButton:hover {
            background-color: #ede9fe;
            transform: translateY(-4px);
            outline: none;
          }
          .signUpButton:focus {
            outline: 4px solid #c4b5fd;
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
