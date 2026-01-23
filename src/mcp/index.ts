#!/usr/bin/env node
import { AgentOpsServer } from './server.js';

const server = new AgentOpsServer();
server.run().catch((error) => {
    console.error('Server error:', error);
    process.exit(1);
});
