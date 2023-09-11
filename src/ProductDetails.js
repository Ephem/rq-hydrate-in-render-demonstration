import { Hydrate, useQuery } from "@tanstack/react-query";

let delayPromise;

function ProductDetailsView() {
  const { data: currentPrice } = useQuery({
    queryKey: ["currentPrice"],
    queryFn: () => null,
    staleTime: Infinity
  });

  // This is not part of the initial data for the details,
  // it fetches on the client
  const { data: minPriceEver } = useQuery({
    queryKey: ["minPriceEver"],
    queryFn: () => 80,
    staleTime: 0,
    // RQ doesn't actually suspend this even though it's
    // stale because there is already data in the cache,
    // this is why I added the manual throw promise-trickery
    suspense: true
  });

  if (!delayPromise || !delayPromise.resolved) {
    delayPromise = new Promise((res) =>
      setTimeout(() => {
        delayPromise.resolved = true;
        res();
      }, 5000)
    );

    throw delayPromise;
  }

  return (
    <>
      Product details loaded - Price: {currentPrice} - Min: {minPriceEver}
    </>
  );
}

export function ProductDetails({ initialData }) {
  return (
    <Hydrate state={initialData}>
      <ProductDetailsView />
    </Hydrate>
  );
}
