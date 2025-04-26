import { Hono } from "hono";
import { ValidationError, DatabaseError } from "sequelize";
import { HTTPException } from "hono/http-exception";
import { app } from "./hono";

// Global error handler
export const custom_error = ((err: any, c: any) => {
    console.error("🔥 Error:", err);

    // Handle Sequelize Validation Errors
    if (err instanceof ValidationError) {
        return c.json(
            {
                success: false,
                message: "Validation error: " + err.errors.map((e) => e.message).join(", "),
            },
            400
        );
    }

    // Handle Sequelize Database Errors (like constraint violations)
    if (err instanceof DatabaseError) {
        return c.json(
            {
                success: false,
                message: "Database error: " + err.message,
            },
            500
        );
    }

    // Handle generic HTTP errors
    if (err instanceof HTTPException) {
        return c.json(
            {
                success: false,
                message: err.message,
            },
            err.status
        );
    }

    return c.json({ success: false, message: "Internal Server Error" }, 500);
});

// 404 Not Found handler
app.notFound((c) => {
    return c.json({ success: false, message: "Route Not Found" }, 404);
});

export { app };
