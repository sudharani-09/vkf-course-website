import { getCmsData } from "@/lib/cms";
import HomePage from "@/components/HomePage";

export default async function Page() {
  const cms = await getCmsData();
  return <HomePage cms={cms} />;
}
