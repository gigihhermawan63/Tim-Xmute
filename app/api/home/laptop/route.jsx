import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_ATLAS_URI;
const client = new MongoClient(uri);

export async function GET(req) {
  try {
    await client.connect();
    const database = client.db("e_katalog_penyediaan_laptop");
    const collection = database.collection("laptop");

    const category = req?.nextUrl?.searchParams.get("category");
    const search = req?.nextUrl?.searchParams.get("search");

    let result;
    if (category === "merk") {
      result = await collection
        .find({ merk: new RegExp(search, "i") })
        .sort({ createdAt: -1 })
        .toArray();
    }
    if (category === "nama") {
      result = await collection
        .find({ nama: new RegExp(search, "i") })
        .sort({ createdAt: -1 })
        .toArray();
    }
    if (category === "kapasitas_penyimpanan") {
      result = await collection
        .find({ kapasitas_penyimpanan: new RegExp(search, "i") })
        .sort({ createdAt: -1 })
        .toArray();
    }
    if (category === "ram") {
      result = await collection
        .find({ ram: new RegExp(search, "i") })
        .sort({ createdAt: -1 })
        .toArray();
    }
    if (category === "processor") {
      result = await collection
        .find({ processor: new RegExp(search, "i") })
        .sort({ createdAt: -1 })
        .toArray();
    }

    return new Response(
      JSON.stringify({
        messageResponse: "Data berhasil diambil dari Database",
        result,
      }),
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (error) {
    return new Response(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  } finally {
    await client.close();
  }
}
