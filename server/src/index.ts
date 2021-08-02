import express from "express";
import fs from "fs/promises";
import type { Stats } from "fs";
import * as R from "ramda";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from "path";
import cors from "cors";

const argv = yargs(hideBin(process.argv)).argv;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// @ts-ignore
const servePath: string = path.resolve(argv._[0] || ".");

interface FileObject {
  name: string;
  isDir?: boolean;
  statPromise?: Promise<Stats>;
}

interface FileInternalObject extends FileObject {
  statPromise: Promise<Stats>;
}

app.get("/directory", async (req, res, next) => {
  // const { subdir } = req.params;
  try {
    const contents = await fs.readdir(servePath);
    const statPromises: Promise<Stats>[] = [];
    const files: FileObject[] = R.map((file) => {
      const stat = fs.stat(path.resolve(servePath, file));
      statPromises.push(stat);
      return {
        name: file,
        statPromise: stat,
      };
    }, contents);
    await Promise.all(statPromises);
    for (const file of files) {
      const stat = await (file as FileInternalObject).statPromise;
      file.isDir = stat.isDirectory();
      delete file.statPromise;
    }
    res.send(JSON.stringify(files));
  } catch (e) {
    next(e);
  }
});

app.use("/get", express.static(servePath));

const setup = async () => {
  // @ts-ignore
  const port = argv.port || process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(
      `web-file-browser API serving ${servePath} on http://localhost${port}`
    );
  });
};
setup();
