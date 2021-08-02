import express from "express";
import fs from "fs";
import { promisify } from "util";
import * as R from "ramda";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from 'path';

const argv = yargs(hideBin(process.argv)).argv;

const readdirpromise = promisify(fs.readdir);

const app = express();
app.use(express.json());

// @ts-ignore
const servePath: string = path.resolve(argv._[0] || ".");

app.get("/directory", async (req, res, next) => {
  // const { subdir } = req.params;
  try {
    const contents = await readdirpromise(servePath);
    const files = R.map(
      (file) => ({
        name: file,
      }),
      contents
    );
    res.send(JSON.stringify(files));
  } catch (e) {
    next(e);
  }
});

app.use("/get", express.static(servePath));

const setup = async () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`web-file-browser API serving ${servePath} on http://localhost${port}`);
  });
};
setup();
