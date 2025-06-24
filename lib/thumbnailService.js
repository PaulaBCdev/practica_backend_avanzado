import cote from "cote";
import { Jimp } from "jimp";
import path from "node:path";

const responder = new cote.Responder({
  name: "Thumbnail Service",
  namespace: "NodeApp",
});

responder.on("create-thumbnail", async (event, cb) => {
  const { originalPath } = event;

  const image = await Jimp.read(originalPath);

  const { dir, name, ext } = path.parse(originalPath);
  const thumbnailPath = path.join(dir, `${name}-thumbnail${ext}`);

  image.resize({ w: 100, h: 100 });

  await image.write(thumbnailPath);

  cb("thumbnail creado");
});
