import cote from "cote";
import upload from "./uploadConfigure.js";
import { Jimp } from "jimp";

const responder = new cote.Responder({ name: "Thumbnail Service" });

responder.on("create-thumbnail", async (event, cb) => {
  const { original, storedIn } = event;
  const fileOGName = original.split(".")[0];
  const fileOGFormat = original.split(".")[1];

  const image = await Jimp.read(storedIn + original);

  image.resize(100, 100);

  const result = await image.write(`${fileOGName}-thumbnail.${fileOGFormat}`);

  upload.single(result);

  cb("thumbnail creado");
});
