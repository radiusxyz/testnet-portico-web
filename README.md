# Liveness Animation Based on Logs from the Radius Shared Sequencing Layer

## Description

This project visualizes the operation of sequencers within the RAFT algorithm framework. The animation showcases interactions among 8 key entities:

- 1 User
- 4 Follower Sequencers
- 1 Leader Sequencer
- 2 Rollups

### Steps

1. **User Transaction**: The user sends an encrypted transaction to one of the sequencers (this could be the leader or a follower).
2. **Forwarding**: Follower sequencers forward the encrypted transaction to the leader.
3. **Ordering**: The leader orders the transaction and shares the order commitment with the followers.
4. **Confirmation**: The follower that initially received the encrypted transaction shares the order commitment with the user who sent it.
5. **Block Sharing**: The sequencer distributes the block to the respective rollup.
6. **Leader Election**: If the leader fails, one of the followers takes over as the leader, ensuring the liveness of the sequencing layer.

This template offers a minimal setup for running a React project with Vite, featuring Hot Module Replacement (HMR) and some ESLint configurations.

## Running the Project

To get started with the project:

1. Clone the repository:
    ```bash
    git clone https://github.com/gylman/svgs
    ```

2. Navigate to the project directory:
    ```bash
    cd svgs
    ```

3. Install the necessary dependencies:
    ```bash
    npm i
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Tech Stack

- **Vite**
- **React**
- **JavaScript**
