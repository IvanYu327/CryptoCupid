import { Web3Storage } from "web3.storage";
import { useEffect, useState, createContext } from "react";
import { useSearchParams } from "react-router-dom";
import ChatHome from "../components/ChatHome";

export const UserContext = createContext({ users: [], currentUser: null });

function Home() {
  function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg5MDlFNzU0OUNhRkRiM2ZiQzU4RGQzOUVDZDJjQWNFMjJEOTA5OTIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc2MzIyMzEzNjQsIm5hbWUiOiJDcnlwdG9DdXBpZCJ9.KNk-wQt268jNxuppDvhIE7Cov_lyE8AKeuqdywEOR4s";
    // return process.env.REACT_APP_WEB3STORAGE_TOKEN || "";
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  async function retrieveUser(cid: string) {
    const client = makeStorageClient();
    const res = await client.get(cid);
    if (!res || !res.ok) {
      throw new Error(`failed to get ${cid}`);
    }

    const files = await res.files();

    if (files.length === 0) {
      throw new Error(`no files retrieved from ${cid}`);
    }

    const status = await client.status(cid);
    if (!status) {
      throw new Error(`failed to get status of ${cid}`);
    }

    return {
      ...JSON.parse(await files[0].text()),
      created: new Date(status.created),
    };
  }

  async function retrieveAllCids() {
    const client = makeStorageClient();
    let result = [];
    for await (const upload of client.list()) {
      result.push(upload.cid);
    }
    return result;
  }

  function compatible(user1: any, user2: any) {
    if (!user1 || !user2) {
      return false;
    }

    if (user1.cid === user2.cid) {
      return false;
    }

    if (
      user1.info.gender !== user2.preferences.gender ||
      user2.info.gender !== user1.preferences.gender
    ) {
      return false;
    }

    if (
      user1.info.age !== user2.preferences.age ||
      user2.info.age !== user1.preferences.age
    ) {
      return false;
    }

    return true;
  }

  async function matchedUsers(cid: string) {
    let result = [];
    let cids = await retrieveAllCids();
    cids.sort();
    let user = await retrieveUser(cid);
    var seedrandom = require("seedrandom");

    for (let otherCid of cids) {
      let otherUser = await retrieveUser(otherCid);
      if (!compatible({ ...user, cid }, { ...otherUser, cid: otherCid })) {
        continue;
      }

      let t1 = user.created.valueOf();
      let t2 = otherUser.created.valueOf();
      let timeSince = new Date().valueOf() - Math.max(t1, t2);
      let halfLife = 1000 * 60 * 60 * 24; // one day
      halfLife = 1000 * 60 * 1 * 1; // one hour
      let threshold = 1 - Math.pow(2, -timeSince / halfLife);
      console.log(threshold);
      let seed = cid < otherCid ? cid + otherCid : otherCid + cid;

      if (seedrandom(seed)() < threshold) {
        result.push({ ...otherUser, cid: otherCid });
      }
    }

    return result;
  }

  async function allUsers() {
    let result = [];
    let cids = await retrieveAllCids();

    for (let cid of cids) {
      result.push({ ...(await retrieveUser(cid)), cid });
    }

    return result;
  }

  const [users, setUsers]: [any, any] = useState([]);
  const [currentUser, setCurrentUser]: [any, any] = useState(null);
  const [searchParams] = useSearchParams();
  const currCid = searchParams.get("cid") || "";

  useEffect(() => {
    async function populateUsers() {
      setUsers(await matchedUsers(currCid));
      // setUsers(await allUsers());
      setCurrentUser(await retrieveUser(currCid));
    }
    populateUsers();
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ users, currentUser }}>
        <ChatHome />
      </UserContext.Provider>
    </div>
  );
}

export default Home;
