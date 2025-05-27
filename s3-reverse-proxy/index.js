const express = require('express');
const httpProxy = require('http-proxy');
const { PrismaClient } = require('@prisma/client');
const { Kafka } = require('kafkajs');

const app = express();
const PORT = 8000;
const prisma = new PrismaClient();
const proxy = httpProxy.createProxy();
const BASE_PATH = '';

// Configure Kafka
const kafka = new Kafka({
    clientId: '',
    brokers: [''],
    ssl: { ca: [fs.readFileSync('kafka.pem', 'utf-8')] },
    sasl: {
        username: '',
        password: '',
        mechanism: 'plain'
    }
});

const producer = kafka.producer();

// Connect to Kafka on startup
(async () => {
    await producer.connect();
    console.log('Connected to Kafka');
})();

app.use(async (req, res) => {
    try {
        const hostname = req.hostname;
        let project = null;

        // Check for subdomain first
        if (hostname.endsWith('.deployflow.com')) {
            const subdomain = hostname.split('.')[0];
            project = await prisma.project.findUnique({
                where: { subDomain: subdomain },
                select: { id: true }
            });
        }

        // If no subdomain match, check custom domains
        if (!project) {
            project = await prisma.project.findFirst({
                where: { customDomain: hostname },
                select: { id: true }
            });
        }

        if (!project) {
            res.status(404).send('Project not found');
            return;
        }

        const resolvesTo = `${BASE_PATH}/${project.id}`;

        // Proxy the request
        proxy.web(req, res, { target: resolvesTo, changeOrigin: true }, (err) => {
            if (err) {
                console.error('Proxy error:', err);
                res.status(500).send('Proxy error');
            }
        });

        // Log a successful page visit to Kafka
        producer.send({
            topic: 'page-visits',
            messages: [{
                value: JSON.stringify({
                    projectId: project.id,
                    path: req.path,
                    timestamp: new Date().toISOString()
                })
            }]
        });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal server error');
    }
});

// Handle S3 directory indexes
proxy.on('proxyReq', (proxyReq, req) => {
    if (req.url === '/') {
        proxyReq.path += 'index.html';
    }
});

app.listen(PORT, () => {
    console.log(`Reverse Proxy Running on ${PORT}`);
});