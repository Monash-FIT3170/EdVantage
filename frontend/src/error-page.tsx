import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>

      {isRouteErrorResponse(error) ? (
        <p>
          {error.status}
          {error.statusText}
        </p>
      ) : (
        ''
      )}
    </div>
  );
}
