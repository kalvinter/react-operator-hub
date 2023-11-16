import { useRouteError } from "react-router-dom";

import { links } from "../Config";

import Card from "../components/common/Card";

export const errorPageTestId = "errorPageTestId"

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex m-auto justify-center items-center h-[100vh] w-[100wh]" data-testid={errorPageTestId}>
          <Card className="min-w-[50%] min-h-[50%] flex justify-center flex-col items-center">
            <h1 className="mb-6 w-full text-center">ERROR</h1>
            <p>Sorry, an unexpected Error has occurred.</p> 
            <p>Please copy the text below and open a new issue on <a target='_blank' href={`${links.repositoryOnGithub}`}>github</a>.</p>
            <p className="my-6 bg-gray-200 text-black py-2 px-4">
                <i>Error: {error.statusText || error.message}</i>
            </p>
          </Card>
    </div>
  );
}