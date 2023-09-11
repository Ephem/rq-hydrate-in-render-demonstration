import { Hydrate, useQuery } from "@tanstack/react-query";

function Product() {
  const { data: currentPrice } = useQuery({
    queryKey: ["currentPrice"],
    queryFn: () => null,
    staleTime: Infinity
  });
  const { data: minPriceEver } = useQuery({
    queryKey: ["minPriceEver"],
    queryFn: () => null,
    staleTime: Infinity
  });

  return (
    <>
      <h3>A pair of nice sneakers</h3>
      <div>Current price: ${currentPrice}</div>
      <div>Min price ever: ${minPriceEver}</div>
    </>
  );
}

export function ProductOverview({ initialData }) {
  return (
    <Hydrate state={initialData}>
      <Product />
    </Hydrate>
  );
}
