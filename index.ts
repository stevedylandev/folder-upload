const PINATA_JWT = "";
import { PinataSDK } from "pinata-web3";
import { appendFile } from "node:fs/promises";

const pinata = new PinataSDK({
	pinataJwt: PINATA_JWT,
});

async function main() {
	try {
		for (let i = 1; i < 787; i++) {
      const fileName = `NodeifiMembership-${i}.gif`
			const currentFile = Bun.file(fileName) as unknown as File;
			const { IpfsHash } = await pinata.upload.file(currentFile).addMetadata({
        name: fileName
      }).group("832c7190-2bdb-4fb4-879d-5bb8e20f357f")
			await appendFile("ipfs-hashes.csv", `${IpfsHash},${fileName}\n`);
			console.log("File %s uploaded", fileName)
		}
	} catch (error) {
		console.log(error);
	}
}

main();
