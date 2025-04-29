import { configure_apis } from "@config/configure-apis";
import { app } from "@config/hono";
import { run_tests } from "@config/run-tests";


// Run Tests
// await run_tests()

// Configure Apis
await configure_apis()

// export default app

export default {
    fetch: app.fetch,
};