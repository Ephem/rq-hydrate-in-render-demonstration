import { startTransition, Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { firstState, secondState } from "./hydrationDataMock";
import { ProductOverview } from "./Product";
import { ProductDetails } from "./ProductDetails";

/*
  This is one demonstration of why hydrating in render is bad,
  especially when concurrent features are involved.

  It's a bit contrived, like these things often are.

  Don't take this as the only bad thing that could happen,
  there might be other edge cases too, or the same thing
  could happen in other scenarios.

  This demo makes a few shortcuts to keep it simple, mainly
  it does not set up an actual server which would usually
  be the case, instead it mocks the initialData that would
  normally come from dehydrated queries from the server.

  The proposed solution:
    Keep hydrating in render if the query does not exist 
    in the cache yet, or if there are no observers listening
    to the query, but move hydration to an effect if there
    are current listeners. This would render the initial
    transition with stale data and immediately rerender with
    the fresh data.

    Next step would be to also keep the hydrated data on a React
    context and read from that first, before the normal cache.
    This way a transition could have fresh data immediately,
    while still not triggering updates outside the transition.
    Actual hydration would still happen in an effect in this case.
*/
const explanation = (
  <div style={{ maxWidth: "600px" }}>
    <strong>Explanation:</strong> When you click load details, it simulates
    suspending <em>after</em> hydration of new data has already happened.
    Because hydration currently happens in render, and the new data is fresher,
    the sibling component updates its price immediately, even though the
    transition has not finished yet, causing tearing.
  </div>
);

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [renderDetails, setRenderDetails] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      {explanation}
      <Suspense fallback="Loading page...">
        <ProductOverview initialData={firstState} />
        <div style={{ marginTop: "24px" }}>
          {renderDetails ? (
            <Suspense
              fallback={
                <>
                  <div>Loading details...</div>
                  <button onClick={() => setRenderDetails(false)}>
                    Abort transition
                  </button>
                </>
              }
            >
              {/*
                You'll have to imagine this transition is a navigation
                that renders a server component that brings back data
                to hydrate with it.
              */}
              <ProductDetails initialData={secondState} />
            </Suspense>
          ) : (
            <button
              onClick={() => {
                startTransition(() => {
                  setRenderDetails(true);
                });
              }}
            >
              Load details
            </button>
          )}
        </div>
      </Suspense>
    </QueryClientProvider>
  );
}
