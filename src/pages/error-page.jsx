import { useRouteError } from "react-router-dom";

import { links } from "../Config";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="App container h-[100vh]">
        <div className="main-card relative flex justify-center flex-col items-center" id="error-page">
          <h1 className="mb-6 w-full text-center">ERROR</h1>
          <p>Sorry, an unexpected Error has occurred.</p> 
          <p>Please copy the text below and open a new issue on <a target='_blank' href={`${links.repositoryOnGithub}`}>github</a>.</p>
          <p className="my-6 bg-gray-200 text-black py-2 px-4">
              <i>Error: {error.statusText || error.message}</i>
          </p>

        </div>
    </div>
  );
}