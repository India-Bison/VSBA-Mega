import { configure_apis } from "../config/configure-apis";
import { run_tests } from "../config/run-tests";
import { app } from "../config/hono";

// Run Tests
await run_tests()

// Configure Apis
await configure_apis()

// export default app

export default {
    fetch: app.fetch,
};