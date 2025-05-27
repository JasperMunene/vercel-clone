"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    GitBranchIcon,
    GitCommitIcon,
    TimerIcon,
    RocketIcon,
    PackageIcon,
    GitPullRequestIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type LogEntry = {
    timestamp: string;
    log: string;
    deploymentId: string;
};

const socket: Socket = io("http://localhost:9002", {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
});

export default function DeployPage() {
    const [url, setUrl] = useState("");
    const [isDeploying, setIsDeploying] = useState(false);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [projectId, setProjectId] = useState<string>();
    const [deploymentId, setDeploymentId] = useState<string>();
    const [branch, setBranch] = useState<string>("-");
    const [commit, setCommit] = useState<string>("-");
    const [isDeploymentLive, setIsDeploymentLive] = useState(false);
    const [previewURL, setPreviewURL] = useState<string>();
    const logContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logs
    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    // Socket listener and log fetching
    useEffect(() => {
        if (!deploymentId) return;

        const fetchHistoricalLogs = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/logs/${deploymentId}`);
                setLogs(response.data.logs);
            } catch (error) {
                console.error("Error fetching logs:", error);
            }
        };

        const handleNewLog = (logEntry: LogEntry) => {
            setLogs(prevLogs => {
                const updatedLogs = [...prevLogs, logEntry];

                if (
                    logEntry.log.includes("Done") &&
                    !isDeploymentLive
                ) {
                    const successLog: LogEntry = {
                        timestamp: new Date().toISOString(),
                        log: "Your deployment is live 🎉",
                        deploymentId: deploymentId
                    };
                    updatedLogs.push(successLog);
                    setIsDeploymentLive(true);
                }

                return updatedLogs.sort(
                    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                );
            });
        };

        socket.emit("subscribe", deploymentId);
        socket.on("deployment-log", handleNewLog);
        fetchHistoricalLogs();

        return () => {
            socket.off("deployment-log", handleNewLog);
            socket.emit("unsubscribe", deploymentId);
        };
    }, [deploymentId]);


    const isValidURL: [boolean, string | null] = useMemo(() => {
        if (!url.trim()) return [false, null];
        const regex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)(?:\/)?$/;
        return [regex.test(url), "Enter valid Github Repository URL"];
    }, [url]);

    const handleDeploy = async () => {
        if (!isValidURL[0]) return;
        setIsDeploying(true);
        setLogs([]);
        setDeploymentId(undefined);

        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) {
            setLogs([{ timestamp: new Date().toISOString(), log: "Invalid GitHub URL", deploymentId: "" }]);
            setIsDeploying(false);
            return;
        }

        const [, owner, repo] = match;
        const projectName = repo;

        try {
            const projectRes = await axios.post(
                "http://localhost:9000/project",
                { name: projectName, gitURL: url }
            );
            const proj = projectRes.data.data.project;
            setProjectId(proj.id);
            setPreviewURL(`https://${proj.subDomain}.deployflow.com`);
            setBranch("main");
            setCommit(repo.slice(0, 7));

            const deployRes = await axios.post(
                "http://localhost:9000/deploy",
                { projectId: proj.id }
            );
            setDeploymentId(deployRes.data.data.deploymentId);
        } catch (err: any) {
            console.error(err);
            const message = err.response?.data?.error || "Error starting deployment";
            setLogs([{ timestamp: new Date().toISOString(), log: message, deploymentId: "" }]);
        } finally {
            setIsDeploying(false);
        }
    };

    return (
        <div className="container py-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Deploy Your Project</h1>

                <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
                    <div className="space-y-8">
                        {/* Repository Input */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Repository URL</h2>
                            <div className="flex gap-3">
                                <Input
                                    placeholder="https://github.com/username/repository"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="font-mono text-sm"
                                    disabled={isDeploying}
                                />
                                <Button onClick={handleDeploy} disabled={!isValidURL[0] || isDeploying}>
                                    {isDeploying ? "Deploying..." : "Deploy"}
                                </Button>
                            </div>
                            {isValidURL[1] && !isValidURL[0] && (
                                <p className="text-sm text-red-500">{isValidURL[1]}</p>
                            )}
                        </div>

                        {/* Preview URL */}
                        {previewURL && (
                            <div className="text-sm">
                                ⤷ Preview at: <a href={previewURL} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{previewURL}</a>
                            </div>
                        )}

                        {/* Deployment Logs */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Deployment Logs</h2>
                            <div className="border rounded-lg">
                                <div className="border-b px-4 py-2 bg-muted/50">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <RocketIcon className="h-4 w-4" />
                                        <span>Live Logs</span>
                                    </div>
                                </div>
                                <ScrollArea className="h-[400px] p-4" ref={logContainerRef}>
                                    <div className="font-mono text-sm space-y-2">
                                        {logs.map((entry, idx) => (
                                            <div
                                                key={`${entry.deploymentId}-${idx}`}
                                                className={cn(
                                                    "py-1 flex gap-2",
                                                    idx === logs.length - 1 && "text-primary animate-pulse"
                                                )}
                                            >
                                                <span className="text-muted-foreground text-xs">
                                                    {new Date(entry.timestamp).toLocaleTimeString()}
                                                </span>
                                                <span>$ {entry.log}</span>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                    </div>

                    {/* Deployment Info */}
                    <div className="space-y-6">
                        <div className="rounded-lg border bg-card p-4">
                            <h3 className="font-medium mb-3">Deployment Status</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <GitBranchIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>Branch</span>
                                    </div>
                                    <span className="font-medium">{branch}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <GitCommitIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>Commit</span>
                                    </div>
                                    <span className="font-mono text-xs">{commit}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TimerIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>Logs Count</span>
                                    </div>
                                    <span>{logs.length}</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-4">
                            <h3 className="font-medium mb-3">Project Settings</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <PackageIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>Framework</span>
                                    </div>
                                    <span>Vite</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <GitPullRequestIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>Auto Deploy</span>
                                    </div>
                                    <span>Enabled</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-4">
                            <h3 className="font-medium mb-3">Environment Variables</h3>
                            <div className="space-y-2 text-sm">
                                <Button variant="outline" className="w-full">
                                    Configure Variables
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
