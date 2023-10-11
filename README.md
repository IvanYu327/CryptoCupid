# CryptoCupid

A decentralized anonymous human to human dating platform powered by Worldcoin and XMTP

🧞 Worldcoin — Most Creative trophy
8️⃣ FVM — Top 8 trophy
🥈 XMTP — Best Use

# Running the Project

To run CryptoCupid locally do:
```
git clone https://github.com/IvanYu327/CryptoCupid.git
cd my-app
npm install
npm start
```

## Project Description
Have you ever been catfished? Texted a bot or AI? As generative AI and language models get stronger, it gets harder to distinguish real from fake and in the realm of online love, we want to ensure that everyone gets real true love.

The goal of Crypto Cupid is to eliminate bots and catfishing in the online dating field. We want to protect users’ privacy and information and keep them assured that they are talking to who they expect.

Users must sign in with Worldcoin to verify that they are unique humans and then use the smart wallet that is generated for them. By combining a unique smart wallet with the Worldcoin sign-in and associating these IDs together, we guarantee uniqueness among all users. Our matching algorithm will pair them with other users with matching preferences. Once matched, they can use the XMTP network to securely message each other. All wallet addresses are intentionally anonymized and hidden to restrict the use of these accounts on the XMTP network to CryptoCupid

The platform is decentralized and all the profiles are stored anonymously on the chain, with no centralized database or exchange anywhere in the app. Since all the profiles are anonymous and decentralized, there is unmatched privacy and security.

Join us in building the future of verifiable true love 💕.

## How it's Made

Authentication: We used Worldcoin for authentication, leveraging proof of humanness and uniqueness. By only having “Sign in with Worldcoin” as a sign-in method, we guarantee that each user on our app is a real human being and that each human can only have one account. Using Worldcoin, the user’s authentication credentials never pass through our app, increasing security and privacy.

Registration and Backend: The messaging platform uses XMTP to communicate between MetaMask wallets. During the user registration, we generate a unique smart wallet for each user, which is guaranteed to be the only wallet that can be used by each user on CryptoCupid. Users must add this wallet to their MetaMask account and use it to sign in.

Also during registration, users must fill out some of their information such as their birth year, gender identity and sexual orientation, as well as their preferred age range. This information will help guide the matching between users on the platform. This information is stored on web3.storage, a decentralized storage solution platform powered by IPFS and Filecoin. Each user's information is encoded as a JSON file and uploaded to web3.storage. In doing so, we mitigate the risks of a centralized database, which can be hacked, corrupted or destroyed. After successfully registering, the user is directed to the app's main page.

Matching Algorithm: The matching algorithm consists of a deterministic algorithm that determines whether two parties are matched given their preferences and a particular moment in time. Users agree on this algorithm and use it to filter XMTP conversations such that only matched users show up on the dashboard. The algorithm is fixed and does not depend on any external entity to store matches, therefore, no third party can interfere with the matches, either by creating, deleting, or modifying them. The algorithm is designed in such a way that it seems like matches are created spontaneously through a Poisson process, without actually simulating a Poisson process and storing the results somewhere. By doing so, we can achieve the same behaviour while preventing tampering. More specifically, for any pair of users that have compatible preferences, the time it takes for those two to get matched follows a geometric distribution. For the sake of demonstration, the expected value of that geometric distribution is greatly reduced to allow matches to appear quickly. Furthermore, since the algorithm is deterministic, which was achieved by seeding the PRNG, whether or not two users are matched after a certain time period will always be the same regardless of who is verifying the match. For future development, one possible area of improvement is increasing the speed at which one user can retrieve all of their matches. Currently, a user has to look at every other user to determine who they are matched with when ideally the algorithm should be able to randomly select users through some deterministic means without having to look through all of them and choose a subset of those to be matched. The biggest challenge we faced when trying to implement the idea was making sure that if user A randomly selected user B, then the same B would randomly select A, since otherwise, it’s possible for a one-way match which is not ideal. Another area of improvement is the introduction of mutable user preferences. To implement this using the same deterministic algorithm approach, we could not find another way other than storing the entire preference history on the chain, which would both drastically decrease performance and increase storage costs.

Messaging: We used XMTP for the actual messaging feature, an open protocol and a network for secure web3 messaging. By cross-checking the XMTP accounts that this user can message with the accounts that they are matched with, we can guarantee that users can only message CryptoCupid matches via the app and only users verified on the XMTP network. Using XMTP, we are also able to create an elegant messaging platform that contains all the features you would expect.

The app was built with React, Typescript, Javascript, and ChakraUI with wireframes and designs made in Figma.
