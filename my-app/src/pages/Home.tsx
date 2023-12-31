import { Web3Storage } from "web3.storage";
import { useEffect, useState, createContext } from "react";
import { useSearchParams } from "react-router-dom";
import ChatHome from "../components/ChatHome";

export const UserContext = createContext({ users: [], currentUser: null });

function Home() {
  function makeStorageClient() {
    return new Web3Storage({
      token: process.env.REACT_APP_WEB3STORAGE_TOKEN as string,
    });
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

    const theTable: any = {
      male: {
        heterosexual: ["female"],
        homosexual: ["male"],
        bisexual: ["male", "female"],
        pansexual: ["male", "female", "non-binary"],
        asexual: [],
      },
      female: {
        heterosexual: ["male"],
        homosexual: ["female"],
        bisexual: ["male", "female"],
        pansexual: ["male", "female", "non-binary"],
        asexual: [],
      },
      "non-binary": {
        heterosexual: ["male", "female", "non-binary"],
        homosexual: ["non-binary"],
        bisexual: ["male", "female", "non-binary"],
        pansexual: ["male", "female", "non-binary"],
        asexual: [],
      },
    };
    if (
      !theTable[user1.info.sexualOrientation][
        user1.info.genderIdentity
      ].includes(user2.info.sexualOrientation) ||
      !theTable[user2.info.sexualOrientation][
        user2.info.genderIdentity
      ].includes(user1.info.sexualOrientation)
    ) {
      return false;
    }

    let [u1Age, u1LowerAge, u1UpperAge] = [
      new Date().getFullYear() - parseInt(user1.info.birthYear),
      parseInt(user1.info.lowerAge),
      parseInt(user1.info.upperAge),
    ];
    let [u2Age, u2LowerAge, u2UpperAge] = [
      new Date().getFullYear() - parseInt(user2.info.birthYear),
      parseInt(user2.info.lowerAge),
      parseInt(user2.info.upperAge),
    ];

    if (
      u1Age < u2LowerAge ||
      u1Age > u2UpperAge ||
      u2Age < u1LowerAge ||
      u2Age > u1UpperAge
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
      halfLife = 1000 * 1 * 1 * 1; // one second
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
    <div style={{ height: "100vh", backgroundColor: "#FCF9ED" }}>
      <UserContext.Provider value={{ users, currentUser }}>
        <ChatHome />
      </UserContext.Provider>
    </div>
  );
}

export default Home;
