import { Web3Storage } from "web3.storage";

function Register() {
  function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg5MDlFNzU0OUNhRkRiM2ZiQzU4RGQzOUVDZDJjQWNFMjJEOTA5OTIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc2MzIyMzEzNjQsIm5hbWUiOiJDcnlwdG9DdXBpZCJ9.KNk-wQt268jNxuppDvhIE7Cov_lyE8AKeuqdywEOR4s";
    // return process.env.REACT_APP_WEB3STORAGE_TOKEN || "";
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  function makeFileObjects() {
    const obj = { hello: "world!!" };
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

    const files = [new File([blob], "hello.json")];
    return files;
  }

  async function storeFiles(files: File[]) {
    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    return cid;
  }
  return (
    <div>
      <h1>Register</h1>
    </div>
  );
}

export default Register;
