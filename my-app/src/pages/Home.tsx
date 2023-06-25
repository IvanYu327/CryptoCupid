import { Web3Storage } from "web3.storage";
import ChatHome from "../components/ChatHome";

function Home() {
  function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg5MDlFNzU0OUNhRkRiM2ZiQzU4RGQzOUVDZDJjQWNFMjJEOTA5OTIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc2MzIyMzEzNjQsIm5hbWUiOiJDcnlwdG9DdXBpZCJ9.KNk-wQt268jNxuppDvhIE7Cov_lyE8AKeuqdywEOR4s";
    // return process.env.REACT_APP_WEB3STORAGE_TOKEN || "";
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  async function retrieve(cid: string) {
    const client = makeStorageClient();
    const res = await client.get(cid);
    if (res) {
      // console.log(`Got a response! [${res.status}] ${res.statusText}`);
      if (!res.ok) {
        throw new Error(`failed to get ${cid}`);
      }

      const files = await res.files();
      for (const file of files) {
        console.log(JSON.parse(await file.text()));
      }
    }
  }

  async function listUploads() {
    const client = makeStorageClient();
    for await (const upload of client.list()) {
      // console.log(
      //   `${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`
      // );
      await retrieve(upload.cid);
    }
  }
  return (
    <div>
      <h1>Home</h1>
      <ChatHome />
    </div>
  );
}

export default Home;
