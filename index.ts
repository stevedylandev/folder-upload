const PINATA_JWT = "";
const FOLDER_NAME = "";
import { readdir } from "node:fs/promises";
import { PinataSDK } from "pinata-web3";
import { appendFile } from "node:fs/promises";

const pinata = new PinataSDK({
	pinataJwt: PINATA_JWT,
});

async function main() {
	try {
		const files = await readdir(`./${FOLDER_NAME}`);
		console.log(files);
		for (const file of files) {
			const currentFile = Bun.file(`${FOLDER_NAME}/${file}`) as unknown as File;
			const { IpfsHash } = await pinata.upload.file(currentFile);
			await appendFile("ipfs-hashes.csv", `${IpfsHash},${file}\n`);
			console.log("File %s uploaded", file);
		}
	} catch (error) {
		console.log(error);
	}
}

main();
