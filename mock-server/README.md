# Mock Log Server for Development

## Introduction

This project aims to provide a mock log server that simulates the structure and frequency of real logs expected by client applications. It's intended for development and testing purposes, especially when the actual log server is unavailable or facing issues. This solution helps developers ensure their applications can handle log data effectively, without risking being perceived as a DOS attacker to external services.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the server, ensure you have the following installed:
- Node.js (v14.x or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository to your local machine:
```bash
git clone https://github.com/radiusxyz/portico-mock-server.git
```

2. Navigate to the project directory:
```bash
cd portico-mock-server
```

3. Install the required npm packages:
```bash
npm install
```

## Running the Server

To start the mock log server in development mode, run the following command:

```bash
npm run dev
```

This command starts the server and simulates the delivery of mock log data, preserving the structure and frequency of the expected real logs.
