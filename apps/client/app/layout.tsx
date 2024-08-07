import './global.css';
import { StyledJsxRegistry } from './registry';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <StyledJsxRegistry>
          <div className='h-screen'>
          <Wrapper>
          {children}
          </Wrapper>

          </div>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}

const Wrapper = ({ children } : { children: React.ReactNode }) => {
  return <div className='h-full flex justify-center bg-white'>
    {children}
  </div> 
}