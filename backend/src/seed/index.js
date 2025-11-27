import { DatabaseSeeder } from "./DatabaseSeeder.js";

const seeder = new DatabaseSeeder();

seeder
    .seed()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error("Seeding failed", error);
        process.exit(1);
    });

