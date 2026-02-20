import {
  carteleraSeries,
  carteleraCortos,
  carteleraPeliculas,
} from "@/lib/cartelera-data";
import CarteleraClient from "./CarteleraClient";

export function generateStaticParams() {
  const params: { slug?: string[] }[] = [{ slug: [] }];
  for (const item of carteleraSeries) {
    params.push({ slug: [item.type, item.slug] });
  }
  for (const item of carteleraCortos) {
    params.push({ slug: [item.type, item.slug] });
  }
  for (const item of carteleraPeliculas) {
    params.push({ slug: [item.type, item.slug] });
  }
  return params;
}

export default async function CarteleraPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return <CarteleraClient slug={slug} />;
}
