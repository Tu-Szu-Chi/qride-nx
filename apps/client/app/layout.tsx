'use client';

import { PopupProvider } from '$/hooks/PopupProvider';
import './global.css';
import { StyledJsxRegistry } from './registry';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <PopupProvider>
          <StyledJsxRegistry>
            <Theme>
              <div className="h-screen">
                <Wrapper>{children}</Wrapper>
              </div>
            </Theme>
          </StyledJsxRegistry>
        </PopupProvider>
      </body>
    </html>
  );
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full flex justify-center bg-white">{children}</div>;
};
