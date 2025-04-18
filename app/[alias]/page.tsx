import { redirect } from "next/navigation";
import getCollection, { ALIAS_COLLECTION } from "@/db";

export default async function RedirectToSite({params}: {params: Promise<{ alias: string }>}) {
    const { alias } = await params;

    const aliasCollection = await getCollection(ALIAS_COLLECTION);
    const data = await aliasCollection.find({title : alias}).toArray();
    if(data.length === 0) {
        return redirect("/");
    } else {
        return redirect(data[0].url);
    }
}