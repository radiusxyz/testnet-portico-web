# Liveness animation based on the logs emitted from the Radius shared sequencing layer

## Description

The given code displays the work of the sequencers based on the RAFT algorithm. There are 8 entities:

- user
- 4 follower sequencers
- 1 leader sequencer
- 2 rollups

### Steps

1. User send encrypted transaction to one of the sequencers (including the leader)
2. The follower sequencers redirect the encrypted transaction to the leader
3. The leader orders the transaction and shares the order commitment with the followers
4. The follower that initially received the encrypted transaction shares the order commitment with user that sent it
5. The sequencer shares the block with the corresponding the respective rollup
6. In case of the leader's death, one of the followers becomes the leader, thus ensuring the liveness of the sequencing layer

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Running

```
git clone https://github.com/gylman/svgs
```

```
cd svgs
```

```
npm i
```

```
npm run dev
```

## Stack

- Vite
- React
- JavaScript
