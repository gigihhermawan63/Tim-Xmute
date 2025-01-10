import { MongoClient, ObjectId } from "mongodb";

import { del, put } from "@vercel/blob";

const uri = process.env.MONGODB_ATLAS_URI;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db("e_katalog_penyediaan_laptop");
    const collection = database.collection("laptop");

    const result = await collection.find({}).sort({ createdAt: -1 }).toArray();

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

export async function POST(req) {
  try {
    await client.connect();
    const database = client.db("e_katalog_penyediaan_laptop");
    const collection = database.collection("laptop");

    const formData = await req.formData();
    const merk = formData.get("merk");
    const nama = formData.get("nama");
    const img_file = formData.get("img_file");

    const img_file_buffer = new Uint8Array(await img_file.arrayBuffer());

    const blob = await put(
      `e-katalog-penyediaan-laptop/${img_file.name}`,
      img_file_buffer,
      {
        access: "public",
      }
    );

    const kapasitas_penyimpanan = formData.get("kapasitas_penyimpanan");
    const ram = formData.get("ram");
    const processor = formData.get("processor");
    const vga = formData.get("vga");
    const harga = formData.get("harga");

    const date = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "short",
      timeStyle: "long",
      timeZone: "Asia/Jakarta",
    }).format(new Date());

    await collection.insertOne({
      merk,
      nama,
      img_file: {
        pathname: blob.pathname,
        url: blob.url,
      },
      kapasitas_penyimpanan,
      ram,
      processor,
      vga,
      harga,
      createdAt: date,
      updatedAt: date,
    });

    return new Response(
      JSON.stringify({
        messageResponse: "Data berhasil disimpan di Database",
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

export async function PUT(req) {
  try {
    await client.connect();
    const database = client.db("e_katalog_penyediaan_laptop");
    const collection = database.collection("laptop");

    const formData = await req.formData();
    const _id = formData.get("_id");
    const merk = formData.get("merk");
    const nama = formData.get("nama");

    const kapasitas_penyimpanan = formData.get("kapasitas_penyimpanan");
    const ram = formData.get("ram");
    const processor = formData.get("processor");
    const vga = formData.get("vga");
    const harga = formData.get("harga");

    const date = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "short",
      timeStyle: "long",
      timeZone: "Asia/Jakarta",
    }).format(new Date());

    if (formData.has("img_file")) {
      const img_file = formData.get("img_file");

      const img_file_buffer = new Uint8Array(await img_file.arrayBuffer());

      const blob = await put(
        `e-katalog-penyediaan-laptop/${img_file.name}`,
        img_file_buffer,
        {
          access: "public",
        }
      );

      await collection.updateOne(
        { _id: new ObjectId(`${_id}`) },
        {
          $set: {
            merk,
            nama,
            img_file: {
              pathname: blob.pathname,
              url: blob.url,
            },
            kapasitas_penyimpanan,
            ram,
            processor,
            vga,
            harga,
            updatedAt: date,
          },
        }
      );
    } else {
      await collection.updateOne(
        { _id: new ObjectId(`${_id}`) },
        {
          $set: {
            merk,
            nama,
            kapasitas_penyimpanan,
            ram,
            processor,
            vga,
            harga,
            updatedAt: date,
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        messageResponse: "Data berhasil diubah di Database",
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

export async function DELETE(req) {
  try {
    await client.connect();
    const database = client.db("e_katalog_penyediaan_laptop");
    const collection = database.collection("laptop");

    const formData = await req.formData();
    const _id = formData.get("_id");

    const findDataById = await collection
      .find({ _id: new ObjectId(`${_id}`) })
      .toArray();

    await del(findDataById[0].img_file.url);

    await collection.deleteOne({ _id: new ObjectId(`${_id}`) });

    return new Response(
      JSON.stringify({
        messageResponse: "Data berhasil dihapus di Database",
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
