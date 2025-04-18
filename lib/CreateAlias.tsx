"use server";

import getCollection, { ALIAS_COLLECTION } from "@/db";

export default async function createAlias(alias : string, urlGiven : string) {
  const aliasCollection = await getCollection(ALIAS_COLLECTION);
  const data = await aliasCollection.find({title : alias}).toArray();

  
  try {
    const res = await fetch(urlGiven);
    if (res.status != 200) {
        return "invalid url"
    }
  } catch {
    return "invalid url"
  }

  if(data.length !== 0) {
    return "alias exists"
  } else {
    const res = await aliasCollection.insertOne({
        title: alias,
        url: urlGiven
      });
    if(!res.acknowledged) {
        return "insertion failed"
    } else {
        return "success"
    }
  }
}