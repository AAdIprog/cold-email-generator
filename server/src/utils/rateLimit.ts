
export class RateLimiter {
    private timestamps: number[] = [];
    private limit: number;
    private windowMs: number;

    constructor(limit: number, windowMs: number) {
        this.limit = limit;
        this.windowMs = windowMs;
    }

    async waitForToken(): Promise<void> {
        while (true) {
            const now = Date.now();
            // Remove timestamps older than the window
            this.timestamps = this.timestamps.filter(t => now - t < this.windowMs);

            if (this.timestamps.length < this.limit) {
                this.timestamps.push(now);
                return;
            }

            // Wait for the oldest timestamp to expire
            const oldest = this.timestamps[0];
            const waitTime = this.windowMs - (now - oldest) + 100; // +100ms buffer
            if (waitTime > 0) {
                // Simple delay
                await new Promise(resolve => setTimeout(resolve, waitTime));
            }
        }
    }
}
