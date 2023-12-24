'use client';

export default async function Index() {
  return (
    <div>
      <style jsx>{`
        .page {
        }
      `}</style>

      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome Heroku/client v2.0 👋
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
